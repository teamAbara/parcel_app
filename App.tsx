import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import {
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

import * as Linking from "expo-linking";
import bs58 from "bs58";
import useStore from "./store";
import nacl from "tweetnacl";
import { Buffer } from "buffer";
import React, {
  Component,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import {
  clusterApiUrl,
  Connection,
  PublicKey,
  Keypair,
  sendAndConfirmTransaction,
  TransactionInstruction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";

/* scrreens */
import HomeScreen from "./src/screens/Home";
//devnet연결
const NETWORK = clusterApiUrl("devnet");
//지갑링크
const buildUrl = (path: string, params: URLSearchParams) =>
  `https://phantom.app/ul/v1/${path}?${params.toString()}`;

export default function App() {
  const [dappKeyPair] = useState(nacl.box.keyPair());

  //솔라나 키
  const [deepLink, setDeepLink] = useState<string>("");
  //솔라나 키
  const [phantomWalletPublicKey, setPhantomWalletPublicKey] =
    useState<PublicKey>();
  const [sharedSecret, setSharedSecret] = useState<Uint8Array>();
  const [session, setSession] = useState<string>();
  const store = useStore();
  /*Link */
  const onConnectRedirectLink = Linking.createURL("onConnect");
  //conntection
  const connection = new Connection(NETWORK);
  const handleDeepLink = ({ url }: Linking.EventType) => {
    setDeepLink(url);
  };
  const Tab = createBottomTabNavigator();

  //decryptPayload
  const decryptPayload = (
    data: string,
    nonce: string,
    sharedSecret?: Uint8Array
  ) => {
    if (!sharedSecret) throw new Error("missing shared secret");
    const decryptedData = nacl.box.open.after(
      bs58.decode(data),
      bs58.decode(nonce),
      sharedSecret
    );
    if (!decryptedData) {
      throw new Error("Unable to decrypt data");
    }
    return JSON.parse(Buffer.from(decryptedData).toString("utf8"));
  };

  //wallet connection

  const connect = async () => {
    const params = new URLSearchParams({
      dapp_encryption_public_key: bs58.encode(dappKeyPair.publicKey),
      cluster: "devnet",
      app_url: "https://phantom.app",
      redirect_link: onConnectRedirectLink,
    });

    const url = buildUrl("connect", params);
    Linking.openURL(url);
  };
  /*deep link 
  
  
  */
  useEffect(() => {
    if (!deepLink) return;
    const url = new URL(deepLink);
    const params = url.searchParams;
    //error
    if (params.get("errorCode")) {
      return;
    }
    //연결
    if (/onConnect/.test(url.pathname)) {
      const sharedSecretDapp = nacl.box.before(
        bs58.decode(params.get("phantom_encryption_public_key")!),
        dappKeyPair.secretKey
      );
      const connectData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecretDapp
      );
      setSharedSecret(sharedSecretDapp);
      setSession(connectData.session);
      store.setAuthUser(new PublicKey(connectData.public_key).toBase58());
      setPhantomWalletPublicKey(new PublicKey(connectData.public_key));
    } else if (/onDisconnect/.test(url.pathname)) {
    } else if (/onSignAndSendTransaction/.test(url.pathname)) {
      const signAndSendTransactionData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );
    } else if (/onSignTransaction/.test(url.pathname)) {
      const signTransactionData = decryptPayload(
        params.get("data")!,
        params.get("nonce")!,
        sharedSecret
      );
      const decodedTransaction = Transaction.from(
        bs58.decode(signTransactionData.transaction)
      );
    }
  }, [deepLink]);

  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    })();
    Linking.addEventListener("url", handleDeepLink);
  }, []);

  return (
    <NavigationContainer>
      {phantomWalletPublicKey != null ? (
        <View style={styles.container}>
          <View style={styles.rows}>
            <Image
              source={require("./assets/img/parcel_logo.png")}
              style={styles.image}
              resizeMode="contain" //react_native에서 크기 조절용
            />
          </View>
          <TouchableOpacity onPress={connect} style={styles.button}>
            <Text style={{ textAlign: "center" }}>phantom 으로 연결</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={{
            tabBarActiveTintColor: "#fb8c00",
            tabBarShowLabel: false,
          }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              title: "홈",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons size={30} name="home-work" color="black" />
              ),
            }}
          />
          <Tab.Screen
            name="Search"
            component={HomeScreen}
            options={{
              title: "스캔",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons size={30} name="photo-camera" color="black" />
              ),
            }}
          />
          <Tab.Screen
            name="Notification"
            component={HomeScreen}
            options={{
              title: "택배 리스트",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  size={30}
                  name="playlist-add-check"
                  color="black"
                />
              ),
            }}
          />
          <Tab.Screen
            name="Message"
            component={HomeScreen}
            options={{
              title: "마이페이지",
              tabBarIcon: ({ color, size }) => (
                <MaterialIcons
                  size={30}
                  name="supervised-user-circle"
                  color="black"
                />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
  },
  button: {
    flex: 1,
    width: "100%",
    borderStyle: "solid",
    borderRadius: 100,
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  rows: {
    flex: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

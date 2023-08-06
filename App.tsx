import { StatusBar } from "expo-status-bar";
import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import { Button, TouchableOpacity, StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as Linking from "expo-linking";
import bs58 from "bs58";
import nacl from "tweetnacl";

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
  /*Link */
  const onConnectRedirectLink = Linking.createURL("onConnect");
  //conntection
  const connection = new Connection(NETWORK);
  const handleDeepLink = ({ url }: Linking.EventType) => {
    setDeepLink(url);
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
  useEffect(() => {
    (async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        setDeepLink(initialUrl);
      }
    })();
    Linking.addEventListener("url", handleDeepLink);
    // return () => {
    //   Linking.removeEventListener("url", handleDeepLink);
    // };
  }, []);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        <TouchableOpacity onPress={connect}>
          <Text>연결</Text>
        </TouchableOpacity>
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

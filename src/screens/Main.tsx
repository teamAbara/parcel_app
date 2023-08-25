import React, { useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStore from "../../store";

//첫 페이지
const MainScreen = ({ navigation }: any) => {
  const page = useStore().page;
  const getStorage = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token != null || token != undefined) {
      navigation.navigate("Tab");
    }
  };
  useEffect(() => {
    getStorage();
  }, [page]);
  return (
    <View style={styles.container}>
      <ImageBackground source={require("../../assets/img/back.jpeg")} />
      <View style={styles.rows}>
        <Image
          source={require("../../assets/img/back.jpeg")}
          style={styles.image}
          resizeMode="contain" //react_native에서 크기 조절용
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={{ textAlign: "center", fontWeight: "bold" }}>SignUp</Text>
      </TouchableOpacity>
      <View style={styles.rows2} />
    </View>
  );
};

export default MainScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: "#091140",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 400,
  },
  button: {
    flex: 1,
    width: "80%",
    borderRadius: 100,
    flexDirection: "row",
    backgroundColor: "#FFCD4A",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.84,
  },
  button2: {
    flex: 1,
    width: "80%",
    borderStyle: "solid",
    borderRadius: 100,
    flexDirection: "row",
    backgroundColor: "white",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.84,
  },
  rows: {
    flex: 8,
    flexDirection: "row",
    backgroundColor: "#091140",
    alignItems: "center",
    justifyContent: "center",
  },
  rows2: {
    flex: 2,
    flexDirection: "row",
    backgroundColor: "#091140",
    alignItems: "center",
    justifyContent: "center",
  },
});

import React, { useEffect, useState } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStore from "../../store";
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
      <View style={styles.rows}>
        <Image
          source={require("../../assets/img/parcel_logo.png")}
          style={styles.image}
          resizeMode="contain" //react_native에서 크기 조절용
        />
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.button}
      >
        <Text style={{ textAlign: "center" }}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button2}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text style={{ textAlign: "center" }}>SignUp</Text>
      </TouchableOpacity>
      <View style={styles.rows2} />
    </View>
  );
};

export default MainScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
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
    // borderStyle: "solid",
    borderRadius: 100,
    flexDirection: "row",
    backgroundColor: "#ff506e",
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
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
    width: "100%",
    borderStyle: "solid",
    borderRadius: 100,
    flexDirection: "row",
    // backgroundColor: "#ff506e",
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
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  rows2: {
    flex: 5,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

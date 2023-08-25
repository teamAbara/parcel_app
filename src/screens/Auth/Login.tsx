import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import { server } from "../../../util/const";
import axios from "axios";
import { setStorage } from "../../../store/storage";
//로그인
const LoginScreen = ({ navigation }: any) => {
  const [worker_id, setWorkerID] = useState("");
  const [worker_pw, setWorkerPW] = useState("");
  const login = async () => {
    await axios
      .post(`${server}/auth/login`, {
        worker_id: worker_id,
        worker_pw: worker_pw,
      })
      .then(res => {
        if (res.data.result == true) {
          setStorage("token", res.data.access_token);
          setStorage("refreshToken", res.data.refresh_token);
          setStorage("worker_id", res.data.worker_id);
          setStorage("autoLogin", true);
          navigation.navigate("Tab");
        }
      });
  };
  return (
    <View style={styles.container}>
      <View style={{ marginTop: 50, flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginRight: 120 }}
          onPress={() => {
            navigation.navigate("Main");
          }}
        >
          <MaterialIcons size={30} name="arrow-back-ios" color="white" />
        </TouchableOpacity>
        <Text style={styles.head_text}>로그인</Text>
      </View>
      <TextInput
        placeholder="id"
        style={styles.input}
        onChangeText={setWorkerID}
        value={worker_id}
      />
      <TextInput
        placeholder="password"
        style={styles.input}
        onChangeText={setWorkerPW}
        value={worker_pw}
      />

      <TouchableOpacity style={styles.button}>
        <Text
          style={{ textAlign: "center", fontWeight: "bold" }}
          onPress={login}
        >
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#091140",
  },
  input: {
    textAlign: "center",
    width: "100%",
    height: 60,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 50,
    backgroundColor: "white",
  },
  button: {
    borderRadius: 50,
    textAlign: "center",
    justifyContent: "center",
    marginTop: 300,
    width: "100%",
    height: 60,
    backgroundColor: "#FFCD4A",
  },
  head_text: {
    marginBottom: 100,
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

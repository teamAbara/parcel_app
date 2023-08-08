import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  TextInput,
  TouchableOpacity,
} from "react-native";
import axios from "axios";
import { setStorage } from "../../../store/storage";

const LoginScreen = ({ navigation }: any) => {
  const [worker_id, setWorkerID] = useState("");
  const [worker_pw, setWorkerPW] = useState("");
  const login = async () => {
    await axios
      .post("http://localhost:8080/auth/login", {
        worker_id: worker_id,
        worker_pw: worker_pw,
      })
      .then(res => {
        if (res.data.result == true) {
          setStorage("token", res.data.access_token);
          setStorage("refreshToken", res.data.refresh_token);
          setStorage("autoLogin", true);
          navigation.navigate("Tab");
        }
      });
  };
  return (
    <View style={{ padding: 50 }}>
      <TextInput
        style={styles.input}
        onChangeText={setWorkerID}
        value={worker_id}
      />
      <TextInput
        style={styles.input}
        onChangeText={setWorkerPW}
        value={worker_pw}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={{ textAlign: "center" }} onPress={login}>
          Login
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
const styles = StyleSheet.create({
  input: {
    textAlign: "center",
    width: "100%",
    height: 60,
    marginBottom: 30,
    borderWidth: 1,
    borderRadius: 50,
  },
  button: {
    borderRadius: 50,
    textAlign: "center",
    justifyContent: "center",
    marginTop: 300,
    width: "100%",
    height: 60,
    borderWidth: 1,
  },
});

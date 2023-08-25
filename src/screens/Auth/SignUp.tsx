import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import { server } from "../../../util/const";
const countries = ["인천1", "인천2", "하남1", "서울1"];
//회원가입 페이지
const SignUpScreen = ({ navigation }: any) => {
  const [worker_id, setWorkerID] = useState("");
  const [worker_pw, setWorkerPW] = useState("");
  const [worker_address, setWorkerAddress] = useState("");
  const sign_up = async () => {
    await axios
      .post(`${server}/auth/sign_up`, {
        worker_id: worker_id,
        worker_pw: worker_pw,
        worker_address: worker_address,
      })
      .then(res => {
        if (res.data.result == true) {
          navigation.navigate("Main");
        } else {
          //에러처리
          alert("회원가입 Error");
        }
      });
  };
  return (
    <View style={{ padding: 50, backgroundColor: "#091140" }}>
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
      <SelectDropdown
        data={countries}
        onSelect={(selectedItem, index) => {
          setWorkerAddress(selectedItem);
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        buttonStyle={{ borderWidth: 1, width: "100%", borderRadius: 50 }}
        dropdownStyle={{ backgroundColor: "gray" }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("SignUp")}
      >
        <Text
          style={{ textAlign: "center", fontWeight: "bold" }}
          onPress={sign_up}
        >
          SignUp
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignUpScreen;
const styles = StyleSheet.create({
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
});

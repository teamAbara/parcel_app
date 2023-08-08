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
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
const countries = ["인천1", "인천2", "하남1", "서울1"];

const SignUpScreen = ({ navigation }: any) => {
  const [worker_id, setWorkerID] = useState("");
  const [worker_pw, setWorkerPW] = useState("");
  const [worker_address, setWorkerAddress] = useState("");
  const sign_up = async () => {
    await axios
      .post("http://localhost:8080/auth/sign_up", {
        worker_id: worker_id,
        worker_pw: worker_pw,
        worker_address: worker_address,
      })
      .then(res => {
        if (res.data.result == true) {
          navigation.navigate("Back");
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
        <Text style={{ textAlign: "center" }} onPress={sign_up}>
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

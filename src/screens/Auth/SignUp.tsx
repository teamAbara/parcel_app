import React, { useState, useRef, ChangeEvent } from "react";
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { server } from "../../../util/const";
//지역
const countries = [
  "서울1",
  "서울2",
  "인천1",
  "인천2",
  "하남1",
  "하남2",
  "의정부1",
  "의정부2",
  "수원1",
  "수원2",
  "부산1",
  "부산2",
  "제주1",
  "제주2",
];
//회원가입 페이지
const SignUpScreen = ({ navigation }: any) => {
  const [worker_id, setWorkerID] = useState(""); //아이디
  const [worker_pw, setWorkerPW] = useState(""); //비밀번호
  const [worker_phone, setWorkerPhone] = useState(""); //비밀번호

  const [worker_address, setWorkerAddress] = useState(""); //가입 위치

  const phoneRef = useRef();

  // 휴대폰 번호 입력 함수
  const handlePhone = (value: any) => {
    const numberLength = 11;

    let result = "";

    for (let i = 0; i < value.length && i < numberLength; i++) {
      if (i === 3 || i === 7) {
        result += "-";
      }
      result += value[i];
    }

    setWorkerPhone(result);
  };
  //서버에 회원가입 요청
  const sign_up = async () => {
    await axios
      .post(`${server}/auth/sign_up`, {
        worker_id: worker_id,
        worker_pw: worker_pw,
        worker_address: worker_address,
        worker_phone: worker_phone,
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
        <Text style={styles.head_text}>회원가입</Text>
      </View>
      <TextInput
        placeholder="아이디"
        style={styles.input}
        onChangeText={setWorkerID}
        value={worker_id}
      />
      <TextInput
        placeholder="비밀번호"
        style={styles.input}
        onChangeText={setWorkerPW}
        value={worker_pw}
      />
      <TextInput
        placeholder="전화번호"
        style={styles.input}
        onChangeText={value => handlePhone(value.replace(/\D+/g, ""))}
        value={worker_phone}
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
    marginTop: 200,
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

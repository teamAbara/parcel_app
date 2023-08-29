import React, { useState } from "react";
import useStore from "../../../store";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Clipboard,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

import AsyncStorage from "@react-native-async-storage/async-storage";
//마이페이지
const ProfileScreen = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const store = useStore();
  const fetchData = () => {
    // 데이터를 가져오는 비동기 함수를 호출하여 새로운 데이터를 가져옵니다.
    // 새로운 데이터를 기존 데이터에 추가합니다.
    // const newData = [...data, ...newDataFromApi];
    // setData(newData);
  };
  /*로그아웃 
  - 스토리지에서 삭제
  - 메인으로 이동
  */
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("autoLogin");
    navigation.navigate("Main");
  };

  const onRefresh = () => {
    setRefreshing(true);
    // 새로고침 작업을 수행한 후
    fetchData(); // 예시로 fetchData 함수를 호출하여 데이터를 갱신
    setRefreshing(false);
  };

  //주소 복사
  const handleCopyText = () => {
    Clipboard.setString(`${store.worker_public}`);
    alert("주소 복사 완료");
  };

  return (
    <ScrollView
      style={styles.container}
      bounces={true} // bounces를 true로 설정하여 아래로 당기는 동작을 허용
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View
        style={{
          marginTop: 50,
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          onPress={e => {
            navigation.navigate("Home");
          }}
        >
          <Text
            style={{
              color: "white",

              marginRight: 120,
            }}
          >
            <MaterialIcons size={30} name="arrow-back-ios" color="white" />
          </Text>
        </TouchableOpacity>
        <Text style={styles.head_text}>프로필</Text>
      </View>
      <View style={styles.rows}>
        <View style={{ flexDirection: "column", flex: 1, borderRadius: 100 }}>
          <ImageBackground
            style={{ width: 100, height: 100, borderRadius: 100 }}
            source={require("../../../assets/img/profile.png")}
          />
        </View>
        <View style={{ flexDirection: "column", flex: 20 }}>
          <View style={styles.rows2}>
            <Text style={styles.text}>아이디:{store.worker_id}</Text>
          </View>

          <View style={styles.rows2}>
            <Text style={styles.text}>전화번호:{store.worker_phone}</Text>
          </View>
        </View>
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logout_button}>
          <Text style={{ fontWeight: "bold" }}>
            지역:{store.worker_address}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout_button} onPress={handleCopyText}>
          <Text style={{ fontWeight: "bold" }}>주소 복사</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.logout_button} onPress={logout}>
          <Text style={{ fontWeight: "bold" }}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#091140",
  },
  header: {
    flex: 1,

    height: 200,
    marginTop: 0,
    flexDirection: "column",
    alignItems: "center",
    borderRadius: 40,
  },
  logout_button: {
    flex: 14,
    width: "100%",
    marginTop: 10,
    borderRadius: 10,
    height: 50,
    padding: 4,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFCD4A",
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.84,
  },
  rows: {
    marginTop: 40,
    flex: 10,
    minHeight: 100,
    height: "100%",
    flexDirection: "row",
    backgroundColor: "#FFCD4A",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.84,
    borderRadius: 20,
  },
  rows2: {
    margin: 10,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.84,
    borderRadius: 40,
    fontWeight: "bold",
  },
  head_text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
    color: "black",
    justifyContent: "center",
    alignItems: "center",
  },
});

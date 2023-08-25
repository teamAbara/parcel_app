import React, { useState, useEffect } from "react";
import useStore from "../../../store";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Button,
  Clipboard,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const ProfileScreen = ({ navigation }: any) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const store = useStore();
  const user = store.authUser;
  const fetchData = () => {
    // 데이터를 가져오는 비동기 함수를 호출하여 새로운 데이터를 가져옵니다.
    // 새로운 데이터를 기존 데이터에 추가합니다.
    // const newData = [...data, ...newDataFromApi];
    // setData(newData);
  };
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
    Clipboard.setString(`${user}`);
    alert("주소 복사 완료");
  };

  useEffect(() => {}, []);
  return (
    <ScrollView
      style={styles.container}
      bounces={true} // bounces를 true로 설정하여 아래로 당기는 동작을 허용
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.rows}>
        <View style={styles.rows2}>
          <Text>아이디</Text>
        </View>
        <View style={styles.rows2}>
          <Text>아이디</Text>
        </View>
        <View style={styles.rows2}>
          <Text>아이디</Text>
        </View>
      </View>
      <View style={styles.header}>
        <TouchableOpacity style={styles.logout_button} onPress={logout}>
          <Text>로그아웃</Text>
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
    height: 100,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
  },
  logout_button: {
    flex: 14,
    borderRadius: 10,
    height: 40,
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
    marginTop: 10,
    flex: 10,
    minHeight: 500,
    height: "100%",
    flexDirection: "column",
    backgroundColor: "#FFCD4A",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.84,
    borderRadius: 40,
  },
  rows2: {
    margin: 10,
    flex: 1,
    minHeight: 10,

    flexDirection: "row",
    backgroundColor: "red",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.84,
    borderRadius: 40,
  },
});

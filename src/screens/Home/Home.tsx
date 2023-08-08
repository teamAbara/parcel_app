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
import { MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
const HomeScreen = ({ navigation }: any) => {
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
  const logout = async () => {
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("autoLogin");
    navigation.navigate("Main");
  };
  return (
    <ScrollView
      style={styles.container}
      bounces={true} // bounces를 true로 설정하여 아래로 당기는 동작을 허용
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {data.map((item, index) => (
        <Text key={index} style={{ color: "black" }}>
          {item}
        </Text>
      ))}

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.header_address}
          onPress={handleCopyText}
        >
          <Text numberOfLines={1}>{user}</Text>
        </TouchableOpacity>
        <MaterialIcons
          style={styles.header_profile}
          size={30}
          name="supervised-user-circle"
          color="black"
        />
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View style={styles.rows2}></View>
      <View style={styles.rows2}></View>
      <View style={styles.rows}></View>
      <Text
        onPress={() => {
          logout();
        }}
      >
        로그아웃
      </Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate("Details")}
      />
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
  header: {
    flex: 1,
    height: 100,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
  },
  header_address: {
    flex: 14,
    borderRadius: 30,
    height: 30,
    padding: 4,
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ff506e",
    flexDirection: "column",
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.84,
  },
  header_profile: {
    textAlign: "center",

    flex: 2,
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
    marginTop: 20,
    flex: 10,
    height: 300,
    flexDirection: "row",
    backgroundColor: "blue",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
  rows2: {
    marginTop: 20,
    flex: 10,
    height: 200,
    flexDirection: "row",
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 40,
  },
});

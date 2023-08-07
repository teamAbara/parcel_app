import React, { useState } from "react";
import useStore from "../../../store";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Button,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

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
        <Text style={styles.header_address}>{user}</Text>
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
    textAlign: "center",

    flexDirection: "column",
  },
  header_profile: {
    flex: 2,
    flexDirection: "column",
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

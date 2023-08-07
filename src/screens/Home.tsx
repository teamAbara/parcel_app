import React, { useState } from "react";
import { Text, StyleSheet, ScrollView, RefreshControl } from "react-native";

const HomeScreen = ({ navigation }: any) => {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
      <Text style={styles.rows}>dd</Text>
      <Text style={styles.rows}>dd</Text>

      <Text style={styles.rows}>dd</Text>

      <Text style={styles.rows}>dd</Text>
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  rows: {
    flex: 10,
    height: 300,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

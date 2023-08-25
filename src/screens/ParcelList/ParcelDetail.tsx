import React, { useState, useEffect } from "react";
import useStore from "../../../store";
import { server } from "../../../util/const";
import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
} from "react-native";
import axios from "axios";

//택배리스트
const ParcelDetailScreen = ({ route, navigation }: any) => {
  const { to_address, to_name, from_name, from_address } = route.params;

  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const store = useStore();

  const user = store.authUser;

  //택배리스트 가져오기
  const fetchData = async () => {
    await axios.post(`${server}/parcel/worker_parcel_list`).then(res => {
      console.log(res.data.arr);
      setData(res.data.arr);
    });
  };
  const onRefresh = () => {
    setRefreshing(true);
    // 새로고침 작업을 수행한 후
    fetchData(); // 예시로 fetchData 함수를 호출하여 데이터를 갱신
    setRefreshing(false);
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <ScrollView
      style={styles.container}
      bounces={true} // bounces를 true로 설정하여 아래로 당기는 동작을 허용
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.rows}>
        <View style={styles.column}>
          <Text style={styles.text}>보낸 분 : {to_name}</Text>
          <Text style={styles.text}>보낸 분 주소 : {from_address}</Text>
          <Text style={styles.text}>받는 분 : {to_name}</Text>
          <Text style={styles.text}>받는 분 주소 : {to_address}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default ParcelDetailScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#091140",
  },

  rows: {
    marginTop: 10,
    flex: 10,
    height: 500,
    flexDirection: "row",
    backgroundColor: "#FFCD4A",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
  column: {
    flex: 1,
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
  },
  text: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 20,

    fontWeight: "bold",
  },
});

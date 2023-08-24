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
  const { itemId } = route.params;

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
  console.log(data);
  const onRefresh = () => {
    setRefreshing(true);
    // 새로고침 작업을 수행한 후
    fetchData(); // 예시로 fetchData 함수를 호출하여 데이터를 갱신
    setRefreshing(false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);
  return (
    <ScrollView
      style={styles.container}
      bounces={true} // bounces를 true로 설정하여 아래로 당기는 동작을 허용
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <Text>{itemId}</Text>
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
    height: 100,
    flexDirection: "row",
    backgroundColor: "#FFCD4A",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 30,
  },
});

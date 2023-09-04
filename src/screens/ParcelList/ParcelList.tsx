import React, { useState, useEffect } from "react";
import useStore from "../../../store";
import { server } from "../../../util/const";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MaterialIcons } from "@expo/vector-icons";

import {
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";
import axios from "axios";

//택배리스트
const ParcelListScreen = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);

  const store = useStore();

  //택배리스트 가져오기
  const fetchData = async () => {
    const worker_id = await AsyncStorage.getItem("worker_id");

    await axios
      .post(`${server}/parcel/worker_parcel_list`, { worker_id: worker_id })
      .then(res => {
        const data = res.data.arr; // Assuming the response already contains JSON data
        store.setParcelList(data);
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
  console.log(store.parcel_list);
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

              marginRight: 90,
            }}
          >
            <MaterialIcons size={30} name="arrow-back-ios" color="white" />
          </Text>
        </TouchableOpacity>
        <Text style={styles.head_text}>택배 리스트</Text>
      </View>
      <View>
        {store.parcel_list.map((item: any) => (
          <TouchableOpacity
            style={styles.rows}
            onPress={e => {
              navigation.navigate("ParcelDetail", {
                id: 86,
                from_name: item.from_name,
                from_address: item.from_address,
                to_name: item.to_name,
                to_address: item.to_address,
              });
            }}
          >
            <View style={{ marginTop: 20, marginLeft: 20 }}>
              <Text style={{ fontSize: 15 }}>배송지: {item.from_address}</Text>
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "white",
                flexDirection: "row",
                width: "20%",
                marginLeft: 20,
                alignItems: "center",
                justifyContent: "center",
                alignContent: "center",
                height: 30,
                marginTop: 20,
                borderRadius: 8,
              }}
            >
              <Text
                style={{
                  padding: 8,
                }}
              >
                {item.progress == "1"
                  ? "집화처리"
                  : item.progress == "2"
                  ? "간성 상차"
                  : item.progress == "3"
                  ? "간선 하차"
                  : item.progress == "4"
                  ? "배송 출고"
                  : "배송 완료"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

export default ParcelListScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#091140",
  },

  rows: {
    flexDirection: "column",
    marginTop: 10,
    flex: 1,
    height: 100,
    backgroundColor: "#FFCD4A",
    borderRadius: 20,
  },

  head_text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

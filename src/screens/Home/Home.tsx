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
          <Text style={{ color: "black" }}>{store.worker_public}</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View>
        <Text style={styles.parcel_list_text}>배송내용</Text>
      </View>
      <View>
        <TouchableOpacity
          style={styles.rows}
          onPress={e => {
            navigation.navigate("ParcelList");
          }}
        >
          <View style={{ flex: 1, padding: 10, flexDirection: "column" }}>
            <View style={styles.parcel_list_row}>
              <View style={styles.parcel_list_column}>
                <Text style={styles.parcel_list_text2}>미 완료</Text>
              </View>
              <View style={styles.parcel_list_column}>
                <Text style={styles.parcel_list_text2}>배송 완료</Text>
              </View>
            </View>
            <View style={styles.parcel_list_row}>
              <View style={styles.parcel_list_column}>
                <Text style={styles.parcel_list_text2}>0</Text>
              </View>
              <View style={styles.parcel_list_column}>
                <Text style={styles.parcel_list_text2}>0</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.rows}></View>
    </ScrollView>
  );
};

export default HomeScreen;
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
  },
  header_address: {
    flex: 14,
    borderRadius: 10,
    height: 30,
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
    minHeight: 300,
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
  parcel_list_header: {
    flex: 1,
    marginTop: 20,
    minHeight: 10,
    flexDirection: "column",
  },
  parcel_list_row: {
    flex: 1,
    flexDirection: "row",
  },
  parcel_list_column: {
    margin: 10,
    flex: 1,
    flexDirection: "column",
  },
  parcel_list_text: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  parcel_list_text2: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
});

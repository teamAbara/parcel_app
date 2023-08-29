import React from "react";
import useStore from "../../../store";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  Clipboard,
  TouchableOpacity,
} from "react-native";
//홈
import { MaterialIcons } from "@expo/vector-icons";
//홈 스크린
const HomeScreen = ({ navigation }: any) => {
  const store = useStore();

  return (
    <ScrollView
      style={styles.container}
      bounces={true} // bounces를 true로 설정하여 아래로 당기는 동작을 허용
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.header_address}
          onPress={() => {
            //프로필 페이지로 이동
            navigation.navigate("Profile");
          }}
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
      <View style={{ flexDirection: "row", marginTop: 20 }}>
        <TouchableOpacity
          style={styles.icon_button}
          onPress={e => {
            navigation.navigate("Scan");
          }}
        >
          <MaterialIcons size={50} name="qr-code-scanner" color="black" />
        </TouchableOpacity>
        <View style={{ flexDirection: "column", width: 20 }} />
        <TouchableOpacity
          style={styles.icon_button}
          onPress={e => {
            navigation.navigate("ParcelList");
          }}
        >
          <MaterialIcons size={50} name="format-list-bulleted" color="black" />
        </TouchableOpacity>
      </View>
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
  icon_button: {
    flex: 1,
    padding: 10,
    height: 160,
    borderRadius: 10,
    textAlign: "center",
    flexDirection: "column",
    backgroundColor: "#FFCD4A",
    justifyContent: "center",
    alignItems: "center",
  },
  rows: {
    marginTop: 20,
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
    borderRadius: 10,
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
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
});

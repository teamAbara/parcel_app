import React from "react";
import useStore from "../../../store";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Image,
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
          style={{ flexDirection: "row", flex: 1 }}
          onPress={() => {
            //프로필 페이지로 이동
            navigation.navigate("Profile");
          }}
        >
          <ImageBackground
            style={{ width: 70, height: 70, borderRadius: 100, marginTop: 50 }}
            source={require("../../../assets/img/profile.png")}
          ></ImageBackground>
          <View
            style={{
              flexDirection: "column",
              flex: 4,
              marginTop: 50,
              marginLeft: 20,
            }}
          >
            <Text
              style={{
                flexDirection: "row",
                flex: 1,
                color: "white",
                fontSize: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {store.worker_address}
            </Text>
            <Text
              style={{
                flexDirection: "row",
                flex: 1,
                color: "white",
                fontSize: 20,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {store.worker_phone}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <Text style={styles.lineStyle}> ───────────────────────</Text>
      <View
        style={{
          marginTop: 10,
          borderBottomColor: "black",
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      />
      <View>
        <TouchableOpacity
          style={styles.rows}
          onPress={e => {
            navigation.navigate("ParcelList");
          }}
        >
          <View style={{ flex: 1, padding: 10, flexDirection: "column" }}>
            <Text style={{ color: "white", fontSize: 25, marginLeft: 10 }}>
              현황
            </Text>

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
          <Text style={{ color: "white", fontSize: 25, marginLeft: 10 }}>
            스캔
          </Text>
          <Text style={{ fontSize: 15, marginLeft: 10 }}>바로가기</Text>
          <MaterialIcons
            style={{ marginLeft: "50%" }}
            size={50}
            name="qr-code-scanner"
            color="black"
          />
        </TouchableOpacity>
        <View style={{ flexDirection: "column", width: 20 }} />
        <TouchableOpacity
          style={styles.icon_button}
          onPress={e => {
            navigation.navigate("ParcelList");
          }}
        >
          <Text style={{ color: "white", fontSize: 25, marginLeft: 10 }}>
            배송 목록
          </Text>
          <Text style={{ fontSize: 15, marginLeft: 10 }}>바로가기</Text>
          <MaterialIcons
            style={{ marginLeft: "50%" }}
            size={50}
            name="format-list-bulleted"
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.rows}>
          <View style={{ flex: 1, padding: 10, flexDirection: "column" }}>
            <Text style={{ color: "white", fontSize: 25, marginLeft: 10 }}>
              공지사항
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: "#FFCD4A",
            marginTop: 20,
            flex: 10,
            shadowOpacity: 0.6,
            shadowRadius: 4.84,
            borderRadius: 10,
          }}
        >
          <Image
            style={{
              width: "90%",
              padding: 40,
              height: 30,
              margin: 10,
              borderRadius: 10,
            }}
            source={require("../../../assets/img/footer.jpeg")}
          ></Image>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: "#091140",
  },
  header: {
    flex: 1,
    height: 100,
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  icon_button: {
    flex: 1,
    padding: 10,
    height: 160,
    borderRadius: 10,

    backgroundColor: "#FFCD4A",
    justifyContent: "center",
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
  lineStyle: {
    margin: 10,
    color: "white",
  },
});

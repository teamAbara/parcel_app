import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";

//택배디테일 페이지
const ParcelDetailScreen = ({ route, navigation }: any) => {
  const {
    to_address,
    to_name,
    to_phone_number,
    from_name,
    from_address,
    from_phone_number,
    requst,
    item_name,
    box_size,
    item_type,
    box_num,
    parcel_price,
  } = route.params;
  return (
    <ScrollView
      style={styles.container}
      bounces={true} // bounces를 true로 설정하여 아래로 당기는 동작을 허용
    >
      <View style={{ marginTop: 50, flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginRight: 90 }}
          onPress={() => {
            navigation.navigate("ParcelList");
          }}
        >
          <MaterialIcons size={30} name="arrow-back-ios" color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.rows}>
        <Text style={styles.textHeadre}>보낸 분</Text>
        <Text style={styles.text}>성함: {from_name}</Text>
        <Text style={styles.text}>주소 : {from_address}</Text>
        <Text style={styles.text}>연락처 :{from_phone_number} </Text>

        <Text style={styles.textHeadre}>받는 분</Text>
        <Text style={styles.text}>성함 : {to_name}</Text>
        <Text style={styles.text}>주소 : {to_address}</Text>
        <Text style={styles.text}>연락처 : {to_phone_number}</Text>

        <Text style={styles.textHeadre}>물품</Text>
        <Text style={styles.text}>물품 명 :{item_name} </Text>
        <Text style={styles.text}>박스 사이즈 : {box_size}</Text>
        <Text style={styles.text}>수량 : {box_num}</Text>
        <Text style={styles.text}>요청사항 : {requst}</Text>
        <Text style={styles.text}>운임구분 : {item_type}</Text>
        <Text style={styles.text}>결제 : {parcel_price}SUI</Text>
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
    height: 700,
    flexDirection: "column",
    backgroundColor: "#FFCD4A",
    borderRadius: 30,
  },

  text: {
    marginTop: 20,
    marginLeft: 20,
    fontSize: 15,
    fontWeight: "bold",
  },

  textHeadre: {
    fontSize: 40,
    marginTop: 20,
    marginLeft: 20,
  },
});

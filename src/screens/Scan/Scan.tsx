import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button, TouchableOpacity } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import useStore from "../../../store";
import axios from "axios";
import { server } from "../../../util/const";
import BarcodeMask from "react-native-barcode-mask";
import { MaterialIcons } from "@expo/vector-icons";

//택배 스캔
export default function ScannerScreen({ navigation }: any) {
  const store = useStore();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<string | null>(null);
  useEffect(() => {
    const getBarCodeScannerPermissions = async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    };
    getBarCodeScannerPermissions();
  }, []);
  //스캔 데이터 저장
  const handleBarCodeScanned = ({ type, data }: BarCodeScannerResult) => {
    setScanned(true);
    setScannedData(data); // 스캔된 데이터 저장
  };
  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  //스캔에서 리스트 가져오기
  const parcel_list = store?.all_parcel_list[Number(scannedData) - 1];
  //
  const update_parcel_progress = async () => {
    if (!store.worker_id) return;
    await axios
      .post(`${server}/parcel/update_parcel_progress`, {
        worker_id: store.worker_id,
        id: scannedData,
      })
      .then(res => {
        if (res.data.result == true) {
          alert("sucess");
        }
      });
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <BarcodeMask edgeColor="red" showAnimatedLine />

        <View style={styles.row}>
          <TouchableOpacity
            onPress={e => {
              navigation.navigate("Home");
            }}
          >
            <Text
              style={{
                color: "white",
                paddingTop: 40,
                paddingLeft: 80,
                marginRight: 20,
              }}
            >
              <MaterialIcons size={30} name="arrow-back-ios" color="white" />
            </Text>
          </TouchableOpacity>
          <View style={styles.text_row}>
            <View
              style={{
                backgroundColor: "#FFCD4A",
                width: 100,
                borderRadius: 10,
                height: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "black",
                  textAlign: "center",
                }}
              >
                보내는분
              </Text>
            </View>
            <Text style={styles.text}>성함: {parcel_list?.from_name}</Text>
            <Text style={styles.text}>
              연락처: {parcel_list?.from_phone_number}
            </Text>
            <Text style={styles.text}>주소: {parcel_list?.from_address}</Text>
            <View
              style={{
                height: 30,
                backgroundColor: "#FFCD4A",
                width: 100,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "black",
                  textAlign: "center",
                }}
              >
                받는 분
              </Text>
            </View>
            <Text style={styles.text}>성함: {parcel_list?.to_name}</Text>
            <Text style={styles.text}>
              연락처: {parcel_list?.to_phone_number}
            </Text>
            <Text style={styles.text}>주소: {parcel_list?.to_address}</Text>
            <View
              style={{
                height: 30,
                backgroundColor: "#FFCD4A",
                width: 260,
                borderRadius: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 22,
                  color: "black",
                  textAlign: "center",
                }}
              >
                {parcel_list?.requst == null ? "요청사항" : parcel_list?.requst}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.row}>
          <Text style={{ color: "white", fontSize: 20 }}>
            QrCode를 스캔하세요
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.button}>
            <Button
              color={"black"}
              title={"Scan"}
              onPress={() => setScanned(false)}
            />
          </View>
          <View style={styles.button}>
            <Button
              color={"black"}
              title={"처리"}
              onPress={() => update_parcel_progress()}
            />
          </View>
        </View>
      </BarCodeScanner>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: "rgba(0, 0, 0, 0.8)",
    // backgroundColor: "blue",
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    // backgroundColor: "blue",
    marginTop: 20,
    flex: 1,
    justifyContent: "center",
    height: 20,
    flexDirection: "row",
    textAlign: "center",
  },
  text_row: {
    marginTop: 30,
    height: 150,
    width: "100%",
    backgroundColor: "rgba(1, 1, 1, 0.6)",
  },
  text: {
    width: "100%",
    fontWeight: "bold",
    color: "white",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#FFCD4A",
    width: 80,
    borderRadius: 10,
    margin: 60,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
    zIndex: 21,
  },

  outerRectangle: {
    flex: 1,
    justifyContent: "center", // Center the inner content vertically
    backgroundColor: "rgba(1, 1, 1, 0.6)", // Opaque background color
  },
  centerTransparent: {
    width: "70%",
    aspectRatio: 1, // To maintain a square shape
    alignItems: "center", // Center the inner rectangle horizontally
    justifyContent: "center", // Center the inner rectangle vertically
    backgroundColor: "transparent", // Transparent center
  },
  innerRectangle: {
    width: "80%",
    aspectRatio: 1, // To maintain a square shape
    borderWidth: 1,
    borderColor: "white", // Color of the inner rectangle's border
    borderRadius: 10,
    backgroundColor: "transparent", // Transparent inner rectangle
  },

  maskCenter: { flexDirection: "row" },
});

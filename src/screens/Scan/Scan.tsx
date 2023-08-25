import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import useStore from "../../../store";
import axios from "axios";
import { server } from "../../../util/const";
//택배 스캔
export default function ScannerScreen() {
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
  const parcel_list = store.all_parcel_list[Number(scannedData) - 1];

  const update_parcel_progress = async () => {
    await axios
      .post(`${server}/parcel/update_parcel_progress`, {
        worker_id: store.worker_id,
      })
      .then(res => {
        console.log(res);
        console.log(res.data);
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
      />
      <View style={styles.row}>
        {scanned && (
          <View style={styles.text_row}>
            <Text style={styles.text}>id: {scannedData}</Text>
            <Text style={styles.text}>보내는분: {parcel_list?.from_name}</Text>
            <Text style={styles.text}>
              보내는분 주소: {parcel_list?.from_address}
            </Text>
            <Text style={styles.text}>받는 분: {parcel_list?.to_name}</Text>
            <Text style={styles.text}>
              받는 분 주소: {parcel_list?.to_address}
            </Text>
            <Text style={styles.text}>진행현황: {parcel_list?.progress}</Text>
          </View>
        )}
      </View>
      <View style={styles.row}></View>
      <View style={styles.row}></View>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  row: {
    flex: 1,
    justifyContent: "center",
    height: 20,
    flexDirection: "row",
    textAlign: "center",
  },
  text_row: { height: 100, width: "100%", backgroundColor: "#FFCD4A" },
  text: { width: "100%", textAlign: "center", fontWeight: "bold" },
  button: {
    backgroundColor: "#FFCD4A",
    width: 80,
    borderRadius: 10,
    margin: 60,
    height: 50,
    textAlign: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },
});

import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner, BarCodeScannerResult } from "expo-barcode-scanner";
import useStore from "../../../store";
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
  const test = store.all_parcel_list[Number(scannedData) - 1];
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
            <Text style={styles.text}>보내는분: {test?.from_name}</Text>
            <Text style={styles.text}>
              보내는분 주소 Data: {test?.from_address}
            </Text>
            <Text style={styles.text}>받는 분: {test?.to_name}</Text>
            <Text style={styles.text}>받는 분 주소: {test?.to_address}</Text>
            <Text style={styles.text}>진행현황: {test?.progress}</Text>
          </View>
        )}
      </View>
      <View style={styles.row}></View>
      <View style={styles.row}></View>
      <View style={styles.row}>
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
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
  text_row: { height: 100, width: "100%", backgroundColor: "white" },
  text: { width: "100%", backgroundColor: "white" },
});

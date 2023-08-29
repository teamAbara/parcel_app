import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { server } from "../../util/const";
import useStore from "../../store";
import { useEffect } from "react";
import ScannerScreen from "../screens/Scan/Scan";
import ParcelListStack from "./ParcelList";
import ProfileScreen from "../screens/Profile/Profile";
function HomeStack({ navigation }: any) {
  const store = useStore();
  const Stack = createStackNavigator();
  const page = useStore().page;

  //스토리지에 저장
  const getStorage = async () => {
    const token = await AsyncStorage.getItem("token");
    const worker_id = await AsyncStorage.getItem("worker_id");
    await axios
      .post(`${server}/auth/get_user`, { worker_id: worker_id?.toString() })
      .then(res => {
        console.log(res.data);
        store.setWorkerPublic(res?.data?.worker?.worker_public);
        store.setWorkerID(res?.data?.worker?.worker_id);
        store.setWorkerAddress(res?.data?.worker?.worker_address);
        store.setWorkerPhone(res?.data?.worker?.worker_phone);
      })
      .catch(() => {
        console.log("ERROR:유저 목록불러오기");
      });
    if (token == null || token == undefined) {
      navigation.navigate("Main");
    }
  };
  //할당 배송목록
  //접속 아이디 서버로 보내기

  const fetchData = async () => {
    const worker_id = await AsyncStorage.getItem("worker_id");
    if (!worker_id) return;
    await axios
      .post(`${server}/parcel/worker_parcel_list`, { worker_id: worker_id })
      .then(res => {
        const data = res.data.arr;
        store.setParcelList(data);
        store.setParcelListCount(data.length);
      })
      .catch(() => {
        console.log("ERROR:할당된 배송 목록");
      });
  };
  //스캔 데이터
  const all_parcel_list_metadata = async () => {
    await axios.post(`${server}/parcel/all_parcel_list_metadata`).then(res => {
      const data = res.data.arr;
      store.setAllParcelList(data);
    });
  };
  useEffect(() => {
    fetchData();
    all_parcel_list_metadata();
    getStorage();
  }, [page]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Scan"
        component={ScannerScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="ParcelList"
        component={ParcelListStack}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;

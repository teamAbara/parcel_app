import React, { useEffect } from "react";
import ProfileScreen from "./Profile/Profile";
import ParcelListStack from "../stack/ParcelList";
import ScannerScreen from "./Scan/Scan";
import { MaterialIcons } from "@expo/vector-icons";
import HomeStack from "../stack/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStore from "../../store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import axios from "axios";
import { server } from "../../util/const";
//로그인후 페이지
const TabScreen = ({ navigation }: any) => {
  const store = useStore();
  const page = useStore().page;
  const Tab = createBottomTabNavigator();

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
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "#fb8c00",
          tabBarShowLabel: false,
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{
            headerShown: false,
            tabBarShowLabel: false,

            tabBarIcon: ({ color, size }) => (
              <MaterialIcons size={30} name="home-work" color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Scr"
          component={ScannerScreen}
          options={{
            tabBarLabel: "",
            headerShown: false,

            tabBarIcon: ({ color, size }) => (
              <MaterialIcons size={30} name="photo-camera" color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="ParcelList"
          component={ParcelListStack}
          options={{
            title: "택배 리스트",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                size={30}
                name="playlist-add-check"
                color="black"
              />
            ),
          }}
        />
        <Tab.Screen
          name="Message"
          component={ProfileScreen}
          options={{
            title: "마이페이지",
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons
                size={30}
                name="supervised-user-circle"
                color="black"
              />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};

export default TabScreen;

import React, { useEffect } from "react";
import HomeScreen from "./Home/Home";
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
const TabScreen = ({ navigation }: any) => {
  const store = useStore();
  const page = useStore().page;
  const Tab = createBottomTabNavigator();
  const getStorage = async () => {
    const token = await AsyncStorage.getItem("token");
    const worker_id = await AsyncStorage.getItem("worker_id");
    await axios
      .post(`${server}/auth/get_user`, { worker_id: worker_id?.toString() })
      .then(res => {
        console.log(res.data);
        store.setWorkerPublic(res?.data?.worker?.worker_public);
      });
    if (token == null || token == undefined) {
      navigation.navigate("Main");
    }
  };
  //할당 배송목록
  const fetchData = async () => {
    await axios.post(`${server}/parcel/worker_parcel_list`).then(res => {
      const data = res.data.arr; // Assuming the response already contains JSON data
      store.setParcelList(data);
      store.setParcelListCount(data.length);
    });
  };

  const fetchData2 = async () => {
    await axios.post(`${server}/parcel/all_parcel_list_metadata`).then(res => {
      const data = res.data.arr; // Assuming the response already contains JSON data
      store.setAllParcelList(data);
    });
  };
  useEffect(() => {
    fetchData2();
    getStorage();
  }, [page]);
  return (
    <>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarActiveTintColor: "#fb8c00",
          tabBarShowLabel: true,
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

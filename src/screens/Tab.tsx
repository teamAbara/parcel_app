import React, { useEffect } from "react";

import HomeScreen from "./Home/Home";
import { MaterialIcons } from "@expo/vector-icons";
import HomeStack from "../stack/Home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useStore from "../../store";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const TabScreen = ({ navigation }: any) => {
  const page = useStore().page;
  const Tab = createBottomTabNavigator();
  const getStorage = async () => {
    const token = await AsyncStorage.getItem("token");
    if (token == null || token == undefined) {
      navigation.navigate("Main");
    }
  };
  useEffect(() => {
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
          name="Search"
          component={HomeScreen}
          options={{
            tabBarLabel: "",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons size={30} name="photo-camera" color="black" />
            ),
          }}
        />
        <Tab.Screen
          name="Notification"
          component={HomeScreen}
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
          component={HomeScreen}
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

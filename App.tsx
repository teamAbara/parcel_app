import "react-native-get-random-values";
import "react-native-url-polyfill/auto";
import {
  Button,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Image,
  Clipboard,
} from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

import useStore from "./store";

import React, { useState } from "react";

import MainStack from "./src/stack/Main";
import HomeStack from "./src/stack/Home";

/* scrreens */
import HomeScreen from "./src/screens/Home/Home";

//devnet연결

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState();
  const test = async () => {
    await axios
      .post("http://localhost:8080/auth/sign_up", {
        worker_id: "28",
        worker_pw: "dd",
        worker_address: "인천1",
      })
      .then(res => {
        console.log(res.data);
      });
  };
  return (
    <NavigationContainer>
      {user == null ? (
        <MainStack />
      ) : (
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
      )}
    </NavigationContainer>
  );
}

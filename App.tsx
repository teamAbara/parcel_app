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
import { NavigationContainer } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";
import axios from "axios";

import useStore from "./store";

import React, { useState } from "react";

import HomeStack from "./src/stack/Home";
/* scrreens */
import HomeScreen from "./src/screens/Home/Home";
//devnet연결

export default function App() {
  const Tab = createBottomTabNavigator();
  const [user, setUser] = useState();
  const test = async () => {
    await axios.post("http://localhost:8080/sign_up").then(res => {
      console.log(res);
    });
  };
  return (
    <NavigationContainer>
      {user == null ? (
        <View style={styles.container}>
          <View style={styles.rows}>
            <Image
              source={require("./assets/img/parcel_logo.png")}
              style={styles.image}
              resizeMode="contain" //react_native에서 크기 조절용
            />
          </View>
          <TouchableOpacity style={styles.button}>
            <Text style={{ textAlign: "center" }}>phantom 으로 연결</Text>
          </TouchableOpacity>
        </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 300,
  },
  button: {
    flex: 1,
    width: "100%",
    // borderStyle: "solid",
    borderRadius: 100,
    flexDirection: "row",
    backgroundColor: "#ff506e",
    marginBottom: 50,
    alignItems: "center",
    justifyContent: "center",
    // borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 3,
    },
    shadowOpacity: 0.6,
    shadowRadius: 4.84,
  },
  rows: {
    flex: 10,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

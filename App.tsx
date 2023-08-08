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

import useStore from "./store";
import MainScreen from "./src/screens/Main";
import HomeScreen from "./src/screens/Home/Home";
import React, { useState, useEffect } from "react";

import HomeStack from "./src/stack/Home";
import LoginScreen from "./src/screens/Auth/Login";
import SignUpScreen from "./src/screens/Auth/SignUp";
import TabScreen from "./src/screens/Tab";
/* scrreens */
import AsyncStorage from "@react-native-async-storage/async-storage";
//devnet연결

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Main"
          component={MainScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Tab"
          component={TabScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MainScreen from "../screens/Main";
import useStore from "../../store";
import LoginScreen from "../screens/Auth/Login";
import SignUpScreen from "../screens/Auth/SignUp";

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";

function MainStack() {
  const store = useStore();
  const user = store.authUser;

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Back"
        component={MainScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  );
}

export default MainStack;

import "react-native-get-random-values";
import "react-native-url-polyfill/auto";

import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import MainScreen from "./src/screens/Main";
import React from "react";
import LoginScreen from "./src/screens/Auth/Login";
import SignUpScreen from "./src/screens/Auth/SignUp";
import TabScreen from "./src/screens/Tab";

export default function App() {
  //stack
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
        <Stack.Screen
          name="Login"
          options={{
            headerShown: false,
          }}
          component={LoginScreen}
        />
        <Stack.Screen
          name="SignUp"
          options={{
            headerShown: false,
          }}
          component={SignUpScreen}
        />
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

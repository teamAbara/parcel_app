import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home/Home";
import useStore from "../../store";
import CreateParcelScreen from "../screens/Home/CreateParcel";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";

function HomeStack() {
  const store = useStore();
  const user = store.authUser;

  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Details" component={CreateParcelScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;

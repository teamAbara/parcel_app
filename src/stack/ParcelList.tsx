import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home/Home";
import ParcelDetailScreen from "../screens/ParcelList/ParcelDetail";
import ParcelListScreen from "../screens/ParcelList/ParcelList";

function ParcelListStack() {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ParcelList"
        component={ParcelListScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="ParcelDetail" component={ParcelDetailScreen} />
    </Stack.Navigator>
  );
}

export default ParcelListStack;

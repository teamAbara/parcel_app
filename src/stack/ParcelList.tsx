import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
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
      <Stack.Screen
        name="ParcelDetail"
        component={ParcelDetailScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default ParcelListStack;

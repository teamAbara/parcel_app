import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../screens/Home/Home";
import CreateParcelScreen from "../screens/Home/CreateParcel";

function HomeStack() {
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

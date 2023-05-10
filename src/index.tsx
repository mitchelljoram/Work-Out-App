import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { DrawerNavigator } from "./navigation/drawer";

export default function Index() {
  return (
    <NavigationContainer>
        <DrawerNavigator/>
    </NavigationContainer>
  );
};
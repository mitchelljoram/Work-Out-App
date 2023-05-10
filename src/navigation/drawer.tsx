import React from "react";
import { View, Text, Image } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackNavigator } from "./stack";

const Drawer = createDrawerNavigator();

export const DrawerNavigator = () => {
    return (
        <Drawer.Navigator screenOptions={{drawerStyle: {backgroundColor: "#313639",width: 250,}, swipeEnabled: false}}>
            <Drawer.Screen key={0} name={"Drawer1"} component={StackNavigator} options={{/*drawerIcon:,*/ drawerLabel: "Drawer1"}}/>
            <Drawer.Screen key={0} name={"Drawer2"} component={StackNavigator} options={{/*drawerIcon:,*/ drawerLabel: "Drawer2"}}/>
        </Drawer.Navigator>
    )
};
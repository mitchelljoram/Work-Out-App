import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { TabNavigator } from "./tabs";

const Stack = createStackNavigator();

export const StackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={ {headerShown: false} }>
            <Stack.Screen key={0} name="Home-Screen" component={TabNavigator} options={{}}/>
        </Stack.Navigator>
    )
};
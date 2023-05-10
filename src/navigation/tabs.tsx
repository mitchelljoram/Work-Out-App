import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

/* Tabs */
import { Tab0 } from "../tabs/tab0";
import { Tab1 } from "../tabs/tab1";

const Tab = createMaterialTopTabNavigator();

export const TabNavigator = ( { navigation }  : any ) => {
    return (
      <Tab.Navigator>
        <Tab.Screen key={0} name="Tab0" component={Tab0} />
        <Tab.Screen key={1} name="Tab1" component={Tab1} />
      </Tab.Navigator>
    );
};
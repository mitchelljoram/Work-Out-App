import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/* Tab Pages */
import { DashboardScreen } from "../screens/dashboard";
import { HistoryScreen } from "../screens/history";
import { WorkoutScreen } from "../screens/workout-stack";
import { RoutineScreen } from "../screens/routine-stack";
import { MealScreen } from "../screens/meal";

const Tab = createMaterialTopTabNavigator();

export const TabNavigator = () => {
    return (
      <Tab.Navigator tabBarPosition="bottom" screenOptions={{ tabBarStyle: { backgroundColor: "#272727" }, tabBarAndroidRipple: { borderless: false }, tabBarIndicatorStyle: { backgroundColor: "white", }}}>
        <Tab.Screen key={0} name="DashboardScreen" component={DashboardScreen} options={{ tabBarShowLabel: false, tabBarIcon: () => <Icon name="view-dashboard" size={20} color="white"/>, }}/>
        <Tab.Screen key={1} name="HistoryScreen" component={HistoryScreen} options={{ tabBarShowLabel: false, tabBarIcon: () => <Icon name="history" size={20} color="white"/>, }}/>
        <Tab.Screen key={2} name="WorkoutScreen" component={WorkoutScreen} options={{ tabBarShowLabel: false, tabBarIcon: () => <Icon name="weight-lifter" size={20} color="white"/>, }}/>
        <Tab.Screen key={3} name="RoutineScreen" component={RoutineScreen} options={{ tabBarShowLabel: false, tabBarIcon: () => <Icon name="whistle" size={20} color="white"/>, }}/>
        <Tab.Screen key={4} name="MealScreen" component={MealScreen} options={{ tabBarShowLabel: false, tabBarIcon: () => <Icon name="food-apple" size={20} color="white"/>, }}/>
      </Tab.Navigator>
    );
};
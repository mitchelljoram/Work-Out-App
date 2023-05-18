import { StatusBar } from "expo-status-bar";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

/* Screens */
import { TabNavigator } from "./navigation/tabs";
import { AddExerciseSetScreen } from "./screens/workout-stack";
import { EditRoutineScreen } from "./screens/routine-stack";

const Stack = createStackNavigator();

export default function Index() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen key={0} name="Tab-Screen" component={TabNavigator} options={{headerShown: false}}/>
          <Stack.Screen key={1} name="Add-ExerciseSet-Screen" component={AddExerciseSetScreen} options={{headerShown: false}}/>
          <Stack.Screen key={2} name="Edit-Routine-Screen" component={EditRoutineScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
};
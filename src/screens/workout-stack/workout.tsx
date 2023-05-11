import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";

import { useNavigation } from '@react-navigation/native';

export const WorkoutScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <View className="items-center py-4">
                <Text>Workout Screen</Text>
                <Button title="Edit" onPress={() => navigation.navigate("Edit-Workout-Screen" as never, {} as never)}/>
            </View>
        </SafeAreaView>
    );
};
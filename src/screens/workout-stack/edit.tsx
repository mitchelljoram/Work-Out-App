import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button, TextInput } from "react-native";
import { useNavigation } from '@react-navigation/native';

/* Libs */
import { useWorkoutStore } from "../../libs/stores/workout";

export const EditScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="bg-[#141414] flex-1 items-center justify-center">
            <View className="items-center justify-center py-4">
                <Text className="text-white">Edit Workout Screen</Text>
                <Button title="Save" onPress={() => navigation.navigate("Tab-Screen" as never, {} as never)}/>
            </View>
        </SafeAreaView>
    );
};
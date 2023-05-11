import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";

import { useNavigation } from '@react-navigation/native';

export const EditRoutineScreen = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView className="flex-1 items-center justify-center bg-white">
            <View className="items-center justify-center py-4">
                <Text>Edit Routine Screen</Text>
                <Button title="Save" onPress={() => navigation.navigate("Tab-Screen" as never, {} as never)}/>
            </View>
        </SafeAreaView>
    );
};
import React from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";

type SetIconProps = {
    index: number;
};

export const SetIcon = ({index}: SetIconProps) => {
    return (
        <View className="flex border-2 rounded-full border-[#858587] w-10 h-10 justify-center items-center">
            <Text className="text-white font-bold">{index}</Text>
        </View>
    );
};
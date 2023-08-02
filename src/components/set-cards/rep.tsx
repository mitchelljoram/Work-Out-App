import React from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";

/* Components */
import { SetIcon } from "./icon";

/* Libs */
import { RepSet } from "../../libs/types-interfaces-classes";

export const RepSetCard = (set: RepSet) => {
    const index: number = set.id+1;

    return (
        <View className="flex-row items-center mt-3">
            <SetIcon index={index}/>
            <Text className="text-white font-bold ml-5">{`${set.minReps}  -  ${set.maxReps}`}</Text>
        </View>
    );
};
import React from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";

/* Components */
import { SetIcon } from "./icon";

/* Libs */
import { TimeSet } from "../../libs/types-interfaces-classes";

export const TimeSetCard = (set: TimeSet) => {
    const index: number = set.id;

    return (
        <View className="flex-row items-center mt-3">
            <SetIcon index={index}/>
            <Text className="text-white font-bold ml-6">{set.time}</Text>
            <Pressable className="bg-[#333333] h-[35px] w-[130px] rounded-[4px] items-center justify-center left-[77px]" onPress={() => {}}>
                <Text className="text-white">Performance</Text>
            </Pressable>
        </View>
    );
};
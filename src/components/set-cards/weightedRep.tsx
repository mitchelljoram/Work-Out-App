import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, TextInput, Pressable, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/* Components */
import { SetIcon } from "./icon";

/* Libs */
import { RepSet } from "../../libs/types-interfaces-classes";

export const WeightedRepSetCard = (set: RepSet) => {
    const index: number = set.id;
    const [weight, setWeight] = useState<string>("lb");

    return (
        <View className="flex-row items-center mt-2">
            <View className="basis-[10%] mr-5">
                <SetIcon index={index+1}/>
            </View>
            <View className="bg-white basis-[40%] w-[151px] h-[30px] rounded-[4px] items-center mr-3">
                <TextInput placeholder="Enter Weight" keyboardType="numeric" multiline={true} onChangeText={(text: String)=> set.setWeight(Number(text))}/>
            </View>
            <Pressable className="basis-[20%]" onPress={() => {if (weight === "lb") {setWeight("kg")} else{setWeight("lb")}}}>
                <Icon name={weight === "lb" ? "weight-pound" : "weight-kilogram"} size={30} color="#fff"/>
            </Pressable>
        </View>
    );
};
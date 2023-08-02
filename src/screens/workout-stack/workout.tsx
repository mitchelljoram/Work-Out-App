import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";
import { StackNavigationProp } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/* Components */
import { ExerciseSetCard, WeightedExerciseSetCard } from "../../components/exerciseset-cards";

/* Libs */
import { ExerciseSet } from "../../libs/types-interfaces-classes";
import { useWorkoutStore } from "../../libs/stores";

export type AddExerciseSetScreenParams = {
    AddExerciseSetScreen: { newExerciseId: number };
};

export const WorkoutScreen = () => {
    const navigation = useNavigation<StackNavigationProp<AddExerciseSetScreenParams>>();
    const { workout } = useWorkoutStore((state) => state);

    return (
        <SafeAreaView className="bg-[#141414] flex-1 items-center">
            <View className="bg-[#1F1F1F] w-screen h-[75px] sticky top-0">
                <View className="mt-10 items-center justify-center">
                    <Text className="text-white">{workout.name}</Text>
                </View>
            </View>
            <ScrollView className="py-2">
                {workout.exerciseSets.map((exerciseSet: ExerciseSet, index: number) => {
                    if (exerciseSet.usingWeights) { return (<WeightedExerciseSetCard key={index} {...exerciseSet}/>); }
                    else { return (<ExerciseSetCard key={index} {...exerciseSet}/>); }
                })}
                <Pressable className="flex flex-row bg-[#2295f3] h-[40px] w-[90vw] rounded-[4px] mt-3 mb-6 items-center justify-center sticky" onPress={() => navigation.navigate("Add-ExerciseSet-Screen", {newExerciseId: workout.exerciseSets.length === 0 ? 1 : workout.exerciseSets[workout.exerciseSets.length-1].id+1})}>
                    <Icon name="plus" size={20} color="#fff"/>
                    <Text className="text-white ml-2">Add Exercise</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};
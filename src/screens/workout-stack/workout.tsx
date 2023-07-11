import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

/* Components */
import { ExerciseSetCard, RepExerciseSetCard } from "../../components/exerciseset-cards";

/* Libs */
import { ExerciseSet, RepExerciseSet } from "../../libs/types-interfaces-classes";
import { useWorkoutStore } from "../../libs/stores";

export const WorkoutScreen = () => {
    const navigation = useNavigation();
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
                    if (exerciseSet instanceof RepExerciseSet) { return (<RepExerciseSetCard key={index} {...exerciseSet}/>); }
                    if (exerciseSet instanceof ExerciseSet) { return (<ExerciseSetCard key={index} {...exerciseSet}/>); }
                    return null;
                })}
                <Pressable className="bg-[#2295f3] h-[40px] w-[45vw] rounded-[4px] items-center justify-center sticky" onPress={() => navigation.navigate("Add-ExerciseSet-Screen" as never)}>
                    <Text className="text-white">+ Add Exercise</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
};
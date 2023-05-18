import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

/* Components */
import { ExerciseSetCard, RepExerciseSetCard } from "../../components/exerciseset-cards";

/* Libs */
import { ExerciseSet, RepExerciseSet } from "../../libs/interfaces";
import { useWorkoutStore } from "../../libs/stores";

export const WorkoutScreen = () => {
    const navigation = useNavigation();
    const { workout } = useWorkoutStore((state) => state);

    return (
        <SafeAreaView className="bg-[#141414] flex-1 items-center">
            <View className="bg-[#1F1F1F] w-screen h-[75px] sticky top-0 items-center justify-center">
                <Text className="text-white mt-5">{workout.name}</Text>
            </View>
            <ScrollView className="mt-2">
                {workout.exerciseSets.map((exerciseSet: ExerciseSet, index: number) => {
                    if (exerciseSet instanceof RepExerciseSet) { return (<RepExerciseSetCard key={index} {...exerciseSet}/>); }
                    if (exerciseSet instanceof ExerciseSet) { return (<ExerciseSetCard key={index} {...exerciseSet}/>); }
                    return null;
                })}
                <Button title="+ Add Exercise" onPress={() => navigation.navigate("Add-ExerciseSet-Screen" as never, {} as never)}/>
            </ScrollView>
        </SafeAreaView>
    );
};
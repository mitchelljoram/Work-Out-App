import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

/* Components */
import { ExerciseCard } from "../../components/exerciseCard";

/* Libs */
import { Exercise } from "../../libs/types";
import { useWorkoutStore } from "../../libs/store/workout-store";

export const WorkoutScreen = () => {
    const navigation = useNavigation();
    const { name, exercises } = useWorkoutStore((state) => state.workout);

    return (
        <SafeAreaView className="bg-[#141414] flex-1">
            <View className="items-center py-4">
                <Text className="text-white">Workout Screen</Text>
                <Text className="text-white">{name}</Text>
                {exercises.map((exercise: Exercise, index) => {
                    return (
                        <ExerciseCard key={index} {...exercise}/>
                    );
                })}
                <Button title="Add Exercise" onPress={() => navigation.navigate("Edit-Workout-Screen" as never, {} as never)}/>
            </View>
        </SafeAreaView>
    );
};
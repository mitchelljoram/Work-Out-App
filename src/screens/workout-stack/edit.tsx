import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';

/* Libs */
import { Exercise, RepSet, TimeSet } from "../../libs/types";
import { useWorkoutStore } from "../../libs/store/workout-store";

export const EditScreen = () => {
    const navigation = useNavigation();
    const [workout, addExercise] = useWorkoutStore((state) => [state.workout, state.addExercise]);

    let newExerciseId: number;
    workout.exercises.length === 0 ? (newExerciseId = 1) : (newExerciseId = Math.max(...workout.exercises.map(e => e.id)) + 1);

    return (
        <SafeAreaView className="bg-[#141414] flex-1 items-center">
            <View className="items-center justify-center py-4">
                <Text className="text-white">Edit Workout Screen</Text>
                <Button title="Bench Press" onPress={() => {
                    let newExcersize: Exercise = {id: newExerciseId, lift: {id: 1, name: "Bench Press", type: "Chest"}, type: "rep", sets: new Array<RepSet>() };
                    addExercise(newExcersize);
                    navigation.navigate("Tab-Screen" as never, {} as never);
                }}/>
                <Button title="Running" onPress={() => {
                    let newExcersize: Exercise = {id: newExerciseId, lift: {id: 2, name: "Running", type: "Cardio"}, type: "time", sets: new Array<TimeSet>() };
                    addExercise(newExcersize);
                    navigation.navigate("Tab-Screen" as never, {} as never);
                }}/>
                <Button title="Cancel" onPress={() => {
                    navigation.navigate("Tab-Screen" as never, {} as never);
                }}/>
            </View>
        </SafeAreaView>
    );
};
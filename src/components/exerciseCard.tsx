import React from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";


/* Libs */
import { useWorkoutStore } from "../libs/stores/workout";

export const ExerciseCard = () => {
    /*
    const [removeExercise] = useWorkoutStore((state) => [state.removeExercise]);

    let hr = 0;
    let min = 0;
    let sec = 0;
    if (exercise.type === "time" && exercise.sets[0].time) {
        hr = Math.floor(exercise.sets[0].time / 3600);
        min = Math.floor((exercise.sets[0].time - (hr * 3600)) / 60);
        sec = exercise.sets[0].time - (hr * 3600) - (min * 60);
    }

    return (
        <View key={exercise.id} className="bg-[#1F1F1F] w-[360px] px-4 py-2 my-1 rounded-md">
            <View className="flex flex-row justify-between">
                <Text className="text-white">{exercise.lift.name}</Text>
                <Button title="X" onPress={() => {removeExercise(exercise)}}/>
            </View>
            {exercise.type === "rep" ? (
                <View className="flex flex-row">
                    <Text className="text-white">{exercise.sets.length}</Text>
                    <Text className="text-[#858587]"> sets</Text>
                    <Text className="text-[#858587]">   x   </Text>
                    <Text className="text-white">{exercise.sets[0].minReps === exercise.sets[0].maxReps ? exercise.sets[0].minReps : `${exercise.sets[0].minReps} - ${exercise.sets[0].maxReps}`}</Text>
                    <Text className="text-[#858587]"> reps</Text>
                </View>
            ) : (
                <View className="flex flex-row">
                    <Text className="text-white">{exercise.sets.length}</Text>
                    <Text className="text-[#858587]">sets</Text>
                </View>
            )}
            {exercise.sets.map((set, index) => {
                if (exercise.type === "rep") {
                    return (
                        <View key={index} className="flex flex-row justify-between">
                            <Text className="text-white">{index+1}</Text>
                            <Text className="text-white">{`${set.weight}${set.unit}`}</Text>
                        </View>
                    );
                }
                return (
                    <View key={index} className="flex flex-row justify-between">
                        <Text className="text-white">{index+1}</Text>
                        <Text className="text-white">{`${hr >= 1 ? (`${hr}:`): ("")}${min < 10 ? (`0${min}`) : (min)}:${sec < 10 ? (`0${sec}`) : (sec)}`}</Text>
                    </View>
                );
            })}
        </View>
    );
    */
};
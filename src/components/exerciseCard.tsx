import React from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";


/* Libs */
import { Exercise } from "../libs/types";
import { useWorkoutStore } from "../libs/store/workout-store";

export const ExerciseCard = (exercise: Exercise) => {
    const [removeExercise] = useWorkoutStore((state) => [state.removeExercise]);

    return (
        <View key={exercise.id} className="bg-[#1F1F1F] w-[360px] px-4 py-2 my-1 rounded-md">
            <View className="flex flex-row justify-between">
                <Text className="text-white">{`${exercise.lift.name} - ${exercise.lift.type}`}</Text>
                <Button title="X" onPress={() => {removeExercise(exercise)}}/>
            </View>
            {/*exercise.sets.map((set, index) => {
                if (set.type === "rep") 
                    return (
                        <View key={index} className="flex flex-row justify-between">
                            <Text className="text-white">{index+1}</Text>
                            <Text className="text-white">{set.minReps === set.maxReps ? (`${set.minReps}`) : (`${set.minReps} - ${set.maxReps}`)}</Text>
                            <Text className="text-white">{`${set.weight} ${set.unit}`}</Text>
                        </View>
                    );

                let hr = Math.floor(set.time / 3600);
                let min = Math.floor((set.time - (hr * 3600)) / 60);
                let sec = set.time - (hr * 3600) - (min * 60);
                return (
                    <View key={index} className="flex flex-row justify-between">
                        <Text className="text-white">{`${hr >= 1 ? (`${hr}:`): ("")}${min < 10 ? (`0${min}`) : (min)}:${sec < 10 ? (`0${sec}`) : (sec)}`}</Text>
                    </View>
                );
            })*/}
        </View>
    );
};
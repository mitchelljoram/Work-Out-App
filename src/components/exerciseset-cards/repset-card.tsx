import React from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/* Components */
import { WeightedSetCard, TimedSetCard } from "../set-cards";

/* Libs */
import { RepExerciseSet, Set, WeightedSet, TimedSet } from "../../libs/interfaces";
import { useWorkoutStore } from "../../libs/stores/workout-store";

export const RepExerciseSetCard = (exerciseSet: RepExerciseSet) => {
    const [removeExercise, addSet] = useWorkoutStore((state) => [state.removeExerciseSet, state.addSet]);

    return (
        <View key={exerciseSet.id} className="bg-[#1F1F1F] w-[360px] px-4 py-2 my-1 rounded-md">
            <View>
                <View className="flex-row justify-between items-center">
                    <Text className="text-white text-base font-bold">{exerciseSet.exercise.name}</Text>
                    <View className="flex-row justify-between w-12">
                        <Icon name="information-outline" size={20} color="#858587"/>
                        <Pressable onPress={() => {removeExercise(exerciseSet)}}>
                            <Icon name="close-circle-outline" size={20} color="#858587"/>
                        </Pressable>
                    </View>
                </View>
                <View className="flex flex-row">
                    <Text className="text-white">{exerciseSet.sets.length}</Text>
                    <Text className="text-[#858587]"> sets   x   </Text>
                    <Text className="text-white">{exerciseSet.minReps === exerciseSet.maxReps ? exerciseSet.maxReps : `${exerciseSet.minReps} - ${exerciseSet.maxReps}`}</Text>
                    <Text className="text-[#858587]"> reps</Text>
                </View>
            </View>
            {exerciseSet.sets.map((set: Set, index: number) => {
                if (set instanceof WeightedSet) { return (<WeightedSetCard key={index} {...set}/>);}
                if (set instanceof TimedSet) {return (<TimedSetCard key={index} {...set}/>);}
                return null;
            })}
        </View>
    );
};
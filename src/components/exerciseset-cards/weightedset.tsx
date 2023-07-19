import React from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/* Components */
import { RepSetCard, TimeSetCard } from "../set-cards";

/* Libs */
import { ExerciseSet, Set, RepSet, TimeSet, CustomSet } from "../../libs/types-interfaces-classes";
import { useWorkoutStore } from "../../libs/stores/workout";

interface SetCard {
    minReps?: number,
    maxReps?: number,
    time?: string,
    custom?: string,
    numSets: number,
    setCards: Set[],
}

export const WeightedExerciseSetCard = (exerciseSet: ExerciseSet) => {
    const [removeExercise, addSet] = useWorkoutStore((state) => [state.removeExerciseSet, state.addSet]);

    let minReps: number = 0;
    let maxReps: number = 0;
    let time: string = "";
    let custom: string = "";
    let numSets: number = 0;
    let sets: SetCard[] = [];
    let setCards: Set[] = [];

    exerciseSet.sets.forEach((set: Set, index: number) => {
        if (index === exerciseSet.sets.length - 1) {
            sets.push({minReps: minReps, maxReps: maxReps, numSets: numSets, setCards: setCards});
            return;
        }

        if (set instanceof RepSet) {
            if (minReps !== set.minReps || maxReps !== set.maxReps) {
                sets.push({minReps: minReps, maxReps: maxReps, numSets: numSets, setCards: setCards});

                minReps = set.minReps;
                maxReps = set.maxReps;
                numSets = 1;
                setCards = [set];
            }
            else {
                numSets++;
                setCards.push(set);
            }
        }
        else if (set instanceof TimeSet) {
            if (time !== set.time) {
                sets.push({time: time, numSets: numSets, setCards: setCards});

                time = set.time;
                numSets = 1;
                setCards = [set];
            }
            else {  
                numSets++;
                setCards.push(set);
            }
        }
        else if (set instanceof CustomSet) {
            if (custom !== set.custom) {
                sets.push({custom: custom, numSets: numSets, setCards: setCards});

                custom = set.custom;
                numSets = 1;
                setCards = [set];
            }
            else {
                numSets++;
                setCards.push(set);
            }
        }
    });

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
                    <Text className="text-[#858587]"> sets</Text>
                </View>
            </View>
            {sets.map((set: any, index: number) => {
                return (
                    <View key={index} className="flex flex-row">
                        <View className="flex flex-row">
                            {set.minReps && set.maxReps && <Text className="text-white">{`${set.minReps}-${set.maxReps}`}</Text>}
                            {set.time && <Text className="text-white">{set.time}</Text>}
                            {set.custom && <Text className="text-white">{set.custom}</Text>}
                            <Text className="text-[#858587]"> x {set.numSets}</Text>
                        </View>
                        <View>
                            {set.setCards.map((setcard: Set, index: number) => {
                                if (setcard instanceof RepSet) { return ( <RepSetCard key={index} {...set}/>); }
                                else if (set instanceof TimeSet) { return (<TimeSetCard key={index} {...set}/>); }
                                else if (set instanceof CustomSet) { return (null); }
                                return null;
                            })}
                        </View>
                    </View>
                );
            })}
        </View>
    );
};
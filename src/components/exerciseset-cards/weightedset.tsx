import React from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/* Components */
import { RepSetCard, TimeSetCard, WeightedRepSetCard } from "../set-cards";

/* Libs */
import { ExerciseSet, Set, RepSet, TimeSet, CustomSet } from "../../libs/types-interfaces-classes";
import { useWorkoutStore } from "../../libs/stores/workout";

interface SetCardProps {
    minReps?: number;
    maxReps?: number;
    time?: string;
    custom?: string;
    sets: Set[];
    numSets: number;
}

export const WeightedExerciseSetCard = (exerciseSet: ExerciseSet) => {
    const [removeExercise, addSet] = useWorkoutStore((state) => [state.removeExerciseSet, state.addSet]);

    let minReps: number = exerciseSet.sets[0] instanceof RepSet ? exerciseSet.sets[0].minReps : 0;
    let maxReps: number = exerciseSet.sets[0] instanceof RepSet ? exerciseSet.sets[0].maxReps : 0;
    let time: string = exerciseSet.sets[0] instanceof TimeSet ? exerciseSet.sets[0].time : "";
    let custom: string = exerciseSet.sets[0] instanceof CustomSet ? exerciseSet.sets[0].custom : "";
    let sets: Set[] = [exerciseSet.sets[0]];
    let setCards: SetCardProps[] = [];

    exerciseSet.sets.forEach((set: Set, index: number) => {
        if (index === 0) { return; }

        if (set instanceof RepSet) {
            if (set.minReps === minReps && set.maxReps === maxReps) {
                sets.push(set);
            }
            else {
                setCards.push({minReps: minReps, maxReps: maxReps, sets: sets, numSets: sets.length});
                minReps = set.minReps;
                maxReps = set.maxReps;
                sets = [set];
            }

            if (index+1 === exerciseSet.sets.length) {
                setCards.push({minReps: minReps, maxReps: maxReps, sets: sets, numSets: sets.length});
            }
            return;
        }
        else if (set instanceof TimeSet) {
            if (set.time === time) {
                sets.push(set);
            }
            else {
                setCards.push({time: time, sets: sets, numSets: sets.length});
                time = set.time;
                sets = [set];
            }

            if (index+1 === exerciseSet.sets.length) {
                setCards.push({time: time, sets: sets, numSets: sets.length});
            }
            return;
        }
        else if (set instanceof CustomSet) {
            if (set.custom === custom) {
                sets.push(set);
            }
            else {
                setCards.push({custom: custom, sets: sets, numSets: sets.length});
                custom = set.custom;
                sets = [set];
            }

            if (index+1 === exerciseSet.sets.length) {
                setCards.push({custom: custom, sets: sets, numSets: sets.length});
            }
            return;
        }
    });

    return (
        <View key={exerciseSet.id} className="bg-[#1F1F1F] w-[360px] px-4 py-2 my-1 rounded-md">
            <View className="mb-2">
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
            {setCards.map((setCardProps: SetCardProps, index: number) => {
                return (
                <View key={index} className="mb-2">
                    {setCardProps.sets[0] instanceof RepSet ? (
                    <Text className="text-white">{` ${setCardProps.minReps === setCardProps.maxReps ? setCardProps.minReps : `${setCardProps.minReps} - ${setCardProps.maxReps}`}  x  ${setCardProps.numSets}`}</Text>
                    ) : null}
                    {setCardProps.sets.map((set: Set, index: number) => {return (<WeightedRepSetCard key={index} {...set}/>)})}
                </View>
                )
            })}
        </View>
    );
};
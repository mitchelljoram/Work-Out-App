import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button, TextInput, StyleSheet } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/* Libs */
import { Exercise, Set, WeightedSet, TimedSet, ExerciseSet, RepExerciseSet } from "../../libs/interfaces";
import { useExerciseStore, useWorkoutStore } from "../../libs/stores";

export const AddExerciseSetScreen = () => {
    const navigation = useNavigation();
    const [workout, addExerciseSet] = useWorkoutStore((state) => [state.workout, state.addExerciseSet]);
    const [exercises] = useExerciseStore((state) => [state.exercises]);

    const [exercise, setExercise] = useState<Exercise>(exercises[0]);

    const [type, setType] = useState<string>("None");
    const types = ["None", "Reps", "Range"];

    const [quantity, setQuantity] = useState<string>("");
    const [unit, setUnit] = useState<string>("None");
    const units = ["None", "lbs", "kgs", "time"];

    const [minReps, setMinReps] = useState<number>(0);
    const [maxReps, setMaxReps] = useState<number>(0);

    let newExerciseSetId: number = workout.exerciseSets.length === 0 ? (1) : (Math.max(...workout.exerciseSets.map(e => e.id)) + 1);

    return (
        <SafeAreaView className="bg-[#141414] flex-1 items-center">
            <View className="items-center py-4">
                <Text className="text-white">Add Exercise Screen</Text>
                <View className="mt-4">
                    <Text className="text-white mb-1">Exercise:</Text>
                    <SelectDropdown 
                        search={true}
                        searchPlaceHolder="Search Exercise..."
                        defaultButtonText="Select Exercise"
                        data={exercises}
                        onSelect={(selectedItem, index) => { setExercise(selectedItem); }}
                        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem.name; }}
                        rowTextForSelection={(item, index) => { return item.name; }}
                        buttonStyle={styles.exercise_button}
                        buttonTextStyle={styles.button_text}
                        renderDropdownIcon={isOpened => {
                            return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={20} color="white"/>;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown}
                    />
                </View>
                <View className="mt-4">
                    <View>
                        <Text className="text-white mb-1">Reps:</Text>
                    </View>
                    <View className="flex-row justify-between">
                        <View className="bg-white w-44 rounded-[8px] justify-center items-center">
                            {type === "Reps" ? (
                                <View className="bg-white">
                                    <TextInput className="bg-white" placeholder="Reps" keyboardType="numeric" onChangeText={(text)=> setMinReps(Number(text))}/>
                                </View>
                            ) : (type == "Range" ? (
                                <View className="flex-row justify-between">
                                    <TextInput className="bg-white" placeholder="Min Reps" keyboardType="numeric" onChangeText={(text)=> setMinReps(Number(text))}/>
                                    <Text>   _   </Text>
                                    <TextInput className="bg-white" placeholder="Max Reps" keyboardType="numeric" onChangeText={(text)=> setMaxReps(Number(text))}/>
                                </View>
                            ) : (null))}
                        </View>
                        <SelectDropdown 
                            defaultValueByIndex={0}
                            data={types}
                            onSelect={(selectedItem, index) => { setType(selectedItem); }}
                            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
                            rowTextForSelection={(item, index) => { return item; }}
                            buttonStyle={styles.type_button}
                            buttonTextStyle={styles.button_text}
                            renderDropdownIcon={isOpened => {
                                return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={20} color="white"/>;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown}
                        />
                    </View>
                </View>
                <View className="mt-4">
                    <Text className="text-white mb-1">Quantity:</Text>
                    <View className="flex flex-row justify-between">
                        <View className="bg-white w-44 rounded-[8px] justify-center items-center">
                            {unit !== "None" ? (
                                <View className="bg-white">
                                    <TextInput className="bg-white" placeholder="Quantity" onChangeText={(text)=> setQuantity(text)}/>
                                </View>
                            ) : (null)}
                        </View>
                        <SelectDropdown 
                            defaultValueByIndex={0}
                            data={units}
                            onSelect={(selectedItem, index) => { setUnit(selectedItem); }}
                            buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
                            rowTextForSelection={(item, index) => { return item; }}
                            buttonStyle={styles.unit_button}
                            buttonTextStyle={styles.button_text}
                            renderDropdownIcon={isOpened => {
                                return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={20} color="white"/>;
                            }}
                            dropdownIconPosition={'right'}
                            dropdownStyle={styles.dropdown}
                        />
                    </View>
                </View>
                <Pressable className="bg-[#757575] h-[50px] w-[80vw] rounded-[8px] items-center justify-center mt-4" onPress={() => {
                    let newExcersizeSet: ExerciseSet;
                    let newSet: Set | WeightedSet | TimedSet;

                    if (unit === "None") {
                        newSet = new Set(1);
                    }
                    else {
                        if (unit === "lbs" || unit === "kgs") {
                            newSet = new WeightedSet(1, Number(quantity), unit);
                        }
                        else {
                            newSet = new TimedSet(1, quantity);
                        }
                    }

                    if (type === "Reps" || type === "Range") {
                        newExcersizeSet = new RepExerciseSet(newExerciseSetId, exercise, [newSet], minReps, (maxReps > 0 ? maxReps : minReps));
                    }
                    else {
                        newExcersizeSet = new ExerciseSet(newExerciseSetId, exercise, [newSet]);
                    }

                    addExerciseSet(newExcersizeSet);
                    navigation.navigate("Tab-Screen" as never, {} as never);
                }}>
                    <Text className="text-white">Save</Text>
                </Pressable>
                <Pressable className="bg-[#757575] h-[50px] w-[80vw] rounded-[8px] items-center justify-center mt-4" onPress={() => {
                    navigation.navigate("Tab-Screen" as never, {} as never);
                }}>
                    <Text className="text-white">Cancel</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    exercise_button: {
        width: "80%",
        height: 50,
        backgroundColor: "#757575",
        borderRadius: 8,
    },
    type_button: {
        width: "35%",
        backgroundColor: "#757575",
        borderRadius: 8,
    },
    unit_button: {
        width: "35%",
        backgroundColor: "#757575",
        borderRadius: 8,
    },
    button_text: {
        color: "#FFFFFF",
        textAlign: 'center',
        fontWeight: 'bold',
    },
    dropdown: {
        borderRadius: 8,
        transform: [{ translateY: -76 }],
    },
});
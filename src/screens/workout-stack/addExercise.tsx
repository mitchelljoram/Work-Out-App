import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button, TextInput, StyleSheet } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/* Components */
import { SetIcon } from "../../components/set-cards/icon";

/* Libs */
import { Exercise, Set, WeightedSet, TimedSet, CustomSet, ExerciseSet, RepExerciseSet } from "../../libs/types-interfaces-classes";
import { useExerciseStore, useWorkoutStore } from "../../libs/stores";

export const AddExerciseSetScreen = () => {
    const navigation = useNavigation();
    const [workout, addExerciseSet] = useWorkoutStore((state) => [state.workout, state.addExerciseSet]);
    const [exercises] = useExerciseStore((state) => [state.exercises]);

    const [exercise, setExercise] = useState<Exercise>(exercises[0]);

    const [style, setStyle] = useState<string>("Standard");
    const setStyles = ["Standard", "Combo Set"];

    const [type, setType] = useState<string>("reps");
    const types = ["reps", "time", "custom"];
    
    const [weight, setWeight] = useState<number>(0);
    const [unit, setUnit] = useState<string>("lbs");
    const units = ["lbs", "kg", "no weight"];

    const [minReps, setMinReps] = useState<number>(0);
    const [maxReps, setMaxReps] = useState<number>(0);

    let newExerciseSetId: number = workout.exerciseSets.length === 0 ? (1) : (Math.max(...workout.exerciseSets.map(e => e.id)) + 1);

    return (
        <SafeAreaView className="bg-[#141414] flex-1 items-center">
            <View className="bg-[#1F1F1F] w-screen h-[75px] sticky top-0">
                <View className="flex flex-row mt-10 items-center justify-between">
                    <Pressable className="ml-5" onPress={() => { navigation.navigate("Tab-Screen" as never, {} as never); }}>
                        <Icon name="close" size={20} color="#858587"/>
                    </Pressable>
                    <Text className="text-white">Add Exercise Screen</Text>
                    <Pressable className="mr-5" onPress={() => { }}>
                        <Icon name="help-circle-outline" size={20} color="#858587"/>
                    </Pressable>
                </View>
            </View>
            <View className="items-center py-2">
                <View>
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
                        rowStyle={styles.row}
                        rowTextStyle={styles.row_text}
                    />
                </View>
                <View className="mt-2">
                    <Text className="text-white mb-1">Set Style:</Text>
                    <SelectDropdown 
                        defaultButtonText="Select Style"
                        data={setStyles}
                        onSelect={(selectedItem, index) => { setStyle(selectedItem); }}
                        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
                        rowTextForSelection={(item, index) => { return item; }}
                        buttonStyle={styles.exercise_button}
                        buttonTextStyle={styles.button_text}
                        renderDropdownIcon={isOpened => {
                            return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={20} color="white"/>;
                        }}
                        dropdownIconPosition={'right'}
                        dropdownStyle={styles.dropdown}
                        rowStyle={styles.row}
                        rowTextStyle={styles.row_text}
                    />
                </View>
                <View className="mt-4">
                    <Text className="text-white mb-1">Sets:</Text>
                    <View className="flex flex-row items-center">
                        <View className="basis-2/12 mr-3">
                            <SetIcon index={1}/>
                        </View>
                        <View>
                            <View className="row-start-1 flex flex-row gap-x-2">
                                {type === "reps" ? (
                                <View className="bg-white basis-4/12 rounded-[4px] justify-center items-center flex-row">
                                    <TextInput placeholder="min" keyboardType="numeric" onChangeText={(text)=> setMinReps(Number(text))}/>
                                    <Text>       -       </Text>
                                    <TextInput placeholder="max" keyboardType="numeric" onChangeText={(text)=> setMaxReps(Number(text))}/>
                                </View>
                                ) : (
                                <View className="bg-white basis-4/12 rounded-[4px] justify-center items-center flex-row">
                                    <TextInput placeholder={type === "time" ? ("00:00:00") : ("e.g. 1 - 2 laps")} onChangeText={(text)=> setMinReps(Number(text))}/>
                                </View>
                                )}
                                <View className="basis-1/4">
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
                                        rowStyle={styles.row}
                                        rowTextStyle={styles.row_text}
                                    />
                                </View>
                            </View>
                            {type === "reps" ? (
                            <View className="mt-2 flex flex-row gap-x-2">
                                {unit !== "no weight" ? (
                                <View className="bg-white basis-4/12 rounded-[4px] justify-center items-center">
                                    <TextInput placeholder="weight" keyboardType="numeric" onChangeText={(text)=> setWeight(Number(text))}/>
                                </View>
                                ) : (null)
                                }
                                <View className={unit !== "no weight" ? "basis-1/4" : "basis-60"}>
                                    <SelectDropdown 
                                        defaultValueByIndex={0}
                                        data={units}
                                        onSelect={(selectedItem, index) => { setUnit(selectedItem); }}
                                        buttonTextAfterSelection={(selectedItem, index) => { return selectedItem; }}
                                        rowTextForSelection={(item, index) => { return item; }}
                                        buttonStyle={unit === "no weight" ? (styles.unit_button_noweight) : (styles.unit_button)}
                                        buttonTextStyle={styles.button_text}
                                        renderDropdownIcon={isOpened => {
                                            return <Icon name={isOpened ? 'chevron-up' : 'chevron-down'} size={20} color="white"/>;
                                        }}
                                        dropdownIconPosition={'right'}
                                        dropdownStyle={styles.dropdown}
                                        rowStyle={styles.row}
                                        rowTextStyle={styles.row_text}
                                    />
                                </View>
                            </View>
                            ) : (null)
                            }
                        </View>
                    </View>
                </View>

                <Pressable className="bg-[#757575] h-[50px] w-[90vw] rounded-[4px] items-center justify-center mt-4" onPress={() => { }}>
                    <Text className="text-white">+ Add Set</Text>
                </Pressable>

                <Pressable className="bg-[#757575] h-[50px] w-[90vw] rounded-[4px] items-center justify-center mt-4" onPress={() => {
                    /*
                    let newExcersizeSet: ExerciseSet;
                    let newSet: Set | WeightedSet | TimedSet;

                    if (unit === "no weight") {
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
                    */
                    navigation.navigate("Tab-Screen" as never, {} as never);
                }}>
                    <Text className="text-white">Save</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    exercise_button: {
        width: "90%",
        height: 30,
        backgroundColor: "#757575",
        borderRadius: 4,
    },
    type_button: {
        width: "auto",
        height: 30,
        backgroundColor: "#757575",
        borderRadius: 4,
    },
    unit_button: {
        width: "auto",
        height: 30,
        backgroundColor: "#757575",
        borderRadius: 4,
    },
    unit_button_noweight: {
        width: "auto",
        height: 30,
        backgroundColor: "#757575",
        borderRadius: 4,
    },
    button_text: {
        color: "#FFFFFF",
        fontSize: 14,
        textAlign: 'center',
    },
    dropdown: {
        borderRadius: 4,
        transform: [{ translateY: -25 }],
    },
    row: {
        height: 30,
    },
    row_text: {
        fontSize: 14,
        textAlign: 'center',
    },
});
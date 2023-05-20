import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button, TextInput, StyleSheet } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import AndriodCheckBox from 'expo-checkbox';
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

    const [type, setType] = useState<string>("Standard");
    const types = ["Standard", "Combo Set"];

    const [notes, setNotes] = useState<string>("");

    const [unit, setUnit] = useState<string>("reps");
    const units = ["reps", "time", "custom"];
    
    const [weight, setWeight] = useState<boolean>(false);

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
            
            <ScrollView className="w-screen py-2">
                <View className="items-center">
                    <View>
                        <Text className="text-white mb-1">Exercise</Text>
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
                        <Text className="text-white mb-1">Set Type</Text>
                        <SelectDropdown 
                            defaultValue={type}
                            data={types}
                            onSelect={(selectedItem, index) => { setType(selectedItem); }}
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
                    <View className="mt-2">
                        <Text className="text-white">Notes</Text>
                        <View className="bg-white w-[90vw] h-[10vh] rounded-[4px] mt-1 px-2">
                            <TextInput placeholder="For any notes you need" maxLength={250} multiline={true} onChangeText={(text)=> setNotes(text)}/>
                        </View>
                    </View>
                    <View className="mt-5">
                        <View className="flex flex-row items-center gap-x-5">
                            <Text className="text-white mb-1">Sets</Text>
                            <View className="flex flex-row gap-x-2">
                                <AndriodCheckBox
                                    disabled={false}
                                    value={weight}
                                    onValueChange={(newValue) =>  {setWeight(newValue)}}
                                />
                                <Text className="text-white">Using weights?</Text>
                            </View>
                        </View>
                        <View className="flex flex-row items-center">
                            <View className="basis-[10%]">
                                <SetIcon index={1}/>
                            </View>
                            <View className="basis-[5%]"/>
                            <View className="basis-[70%]">
                                <View className="flex flex-row">
                                    {unit === "reps" ? (
                                    <View className="bg-white basis-[55%] rounded-[4px] justify-center items-center flex-row">
                                        <TextInput placeholder="min" keyboardType="numeric" onChangeText={(text)=> setMinReps(Number(text))}/>
                                        <Text>       -       </Text>
                                        <TextInput placeholder="max" keyboardType="numeric" onChangeText={(text)=> setMaxReps(Number(text))}/>
                                    </View>
                                    ) : (
                                    <View className="bg-white basis-[55%] rounded-[4px] justify-center items-center flex-row">
                                        <TextInput placeholder={unit === "time" ? ("00:00:00") : ("e.g. 1 - 2 laps")} onChangeText={(text)=> setMinReps(Number(text))}/>
                                    </View>
                                    )}
                                    <View className="basis-[5%]"/>
                                    <View className="basis-[40%]">
                                        <SelectDropdown 
                                            defaultValue={unit}
                                            data={units}
                                            onSelect={(selectedItem, index) => { setUnit(selectedItem); }}
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
                            </View>
                        </View>
                    </View>
                    <Pressable className="bg-[#757575] h-[40px] w-[90vw] rounded-[4px] items-center justify-center mt-2" onPress={() => { }}>
                        <Text className="text-white">+ Add Set</Text>
                    </Pressable>
                </View>
            </ScrollView>

            <Pressable className="bg-[#757575] h-[40px] w-[90vw] rounded-[4px] items-center justify-center sticky bottom-5" onPress={() => {
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
    },
    dropdown: {
        borderRadius: 4,
        transform: [{ translateY: -15 }],
    },
    row: {
        height: 30,
    },
    row_text: {
        fontSize: 14,
        textAlign: 'left',
    },
});
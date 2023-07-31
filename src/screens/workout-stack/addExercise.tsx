import React, { useState } from "react";
import { SafeAreaView, View, ScrollView , Text, Pressable, Button, TextInput, StyleSheet } from "react-native";
import SelectDropdown from 'react-native-select-dropdown';
import AndriodCheckBox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

/* Components */
import { SetIcon } from "../../components/set-cards/icon";

/* Libs */
import { Exercise, Set, RepSet, TimeSet, CustomSet, ExerciseSet } from "../../libs/types-interfaces-classes";
import { useExerciseStore, useWorkoutStore } from "../../libs/stores";

export const AddExerciseSetScreen = (newExerciseId: number) => {
    const navigation = useNavigation();
    const [workout, addExerciseSet] = useWorkoutStore((state) => [state.workout, state.addExerciseSet]);
    const [exercises] = useExerciseStore((state) => [state.exercises]);

    const [exercise, setExercise] = useState<Exercise>(exercises[0]);

    const [type, setType] = useState<string>("Standard");
    const types = ["Standard", "Combo Set"];

    const [notes, setNotes] = useState<string>("");

    const [metric, setMetric] = useState<string>("reps");
    const metrics = ["reps", "time", "custom"];

    const [usingWeights, setUsingWeights] = useState<boolean>(false);

    const [sets, setSets] = useState<any[]>([{id: 1, minReps: 0, maxReps: 0, time: "", custom: ""}]);
    

    let newExerciseSetId: number = workout.exerciseSets.length === 0 ? (1) : (Math.max(...workout.exerciseSets.map(e => e.id)) + 1);

    return (
        <SafeAreaView className="bg-[#141414] flex-1 items-center">
            <View className="bg-[#1F1F1F] w-screen h-[75px] sticky top-0">
                <View className="flex flex-row mt-10 items-center justify-between">
                    <Pressable className="ml-5" onPress={() => { navigation.navigate("Tab-Screen" as never); }}>
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
                    <View className="flex flex-row items-end mt-2 gap-5">
                        <View className="basis-[40%]">
                            <Text className="text-white mb-1">Set Type</Text>
                            <SelectDropdown 
                                defaultValue={type}
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
                        <View className="basis-[40%] flex flex-row items-center gap-x-2">
                            <Pressable onPress={() => { setUsingWeights(!usingWeights); }}>
                                <Icon name="weight" size={30} color={usingWeights ? "white" : "#757575"}/>
                            </Pressable>
                            <Text className="text-white">{usingWeights ? "Using Weights" : "No Weights"}</Text>
                        </View>
                    </View>
                    <View className="mt-2">
                        <Text className="text-white">Notes</Text>
                        <View className="bg-white w-[90vw] h-[10vh] rounded-[4px] mt-1 px-2">
                            <TextInput placeholder="For any notes you need" maxLength={250} multiline={true} onChangeText={(text)=> setNotes(text)}/>
                        </View>
                    </View>

                    <View className="mt-8">
                        <View className="flex flex-row items-center gap-x-5">
                            <Text className="text-white mb-1">Sets</Text>
                        </View>
                        <View className="flex flex-row items-center mt-3">
                            <View className="basis-[10%]">
                                <SetIcon index={1}/>
                            </View>
                            <View className="basis-[5%]"/>
                            <View className="basis-[70%]">
                                <View className="flex flex-row">
                                    {metric === "reps" ? (
                                    <View>
                                        <View className="bg-white basis-[55%] w-[151px] h-[30px] rounded-[4px] justify-center items-center flex-row">
                                            <TextInput placeholder="min" keyboardType="numeric" onChangeText={(text)=> setSets([...sets].map(set => {
                                                if(set.id === 1) return ({...set, minReps: Number(text)})
                                                return set;
                                            }))}/>
                                            <Text>       -       </Text>
                                            <TextInput placeholder="max" keyboardType="numeric" onChangeText={(text)=> setSets([...sets].map(set => {
                                                if(set.id === 1) return ({...set, maxReps: Number(text)})
                                                return set;
                                            }))}/>
                                        </View>
                                    </View>
                                    ) : (
                                    metric === "time" ? (
                                    <View className="bg-white basis-[55%] h-[30px] rounded-[4px] justify-center items-center flex-row">
                                        <TextInput placeholder="00:00:00" onChangeText={(text)=> setSets([...sets].map(set => {
                                            if(set.id === 1) {
                                                return {...set, time: text}
                                            }
                                            return set;
                                        }))}/>
                                    </View>
                                    ) : (
                                    <View className="bg-white basis-[55%] h-[30px] rounded-[4px] justify-center items-center flex-row">
                                        <TextInput placeholder="e.g. 1 - 2 laps" onChangeText={(text)=> setSets([...sets].map(set => {
                                            if(set.id === 1) {
                                                return {...set, custom: text};
                                            }
                                            return set;
                                        }))}/>
                                    </View>
                                    ))}
                                    <View className="basis-[5%]"/>
                                    <View className="basis-[40%]">
                                        <SelectDropdown 
                                            defaultValue={metric}
                                            data={metrics}
                                            onSelect={(selectedItem, index) => { setMetric(selectedItem); }}
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
                    {sets.map((_, index) => {
                        if(sets.length === 1 || index == 0) return null;

                        return (
                            <View key={index} className="flex flex-row items-center mt-2">
                                <View className="basis-[10%]">
                                    <SetIcon index={index+1}/>
                                </View>
                                <View className="basis-[5%]"/>
                                <View className="basis-[70%]">
                                    <View className="flex flex-row">
                                        {metric === "reps" ? (
                                        <View>
                                            <View className="bg-white basis-[55%] w-[151px] h-[30px] rounded-[4px] justify-center items-center flex-row">
                                                <TextInput placeholder="min" keyboardType="numeric" onChangeText={(text)=> setSets([...sets].map(set => {
                                                    if(set.id === index) return ({...set, minReps: Number(text)})
                                                    return set;
                                                }))}/>
                                                <Text>       -       </Text>
                                                <TextInput placeholder="max" keyboardType="numeric" onChangeText={(text)=> setSets([...sets].map(set => {
                                                    if(set.id === index) return ({...set, maxReps: Number(text)})
                                                    return set;
                                                }))}/>
                                            </View>
                                        </View>
                                        ) : (
                                        metric === "time" ? (
                                        <View className="bg-white basis-[55%] h-[30px] rounded-[4px] justify-center items-center flex-row">
                                            <TextInput placeholder="00:00:00" onChangeText={(text)=> setSets([...sets].map(set => {
                                                if(set.id === index) {
                                                    return {...set, time: text}
                                                }
                                                return set;
                                            }))}/>
                                        </View>
                                        ) : (
                                        <View className="bg-white basis-[55%] h-[30px] rounded-[4px] justify-center items-center flex-row">
                                            <TextInput placeholder="e.g. 1 - 2 laps" onChangeText={(text)=> setSets([...sets].map(set => {
                                                if(set.id === index) {
                                                    return {...set, custom: text};
                                                }
                                                return set;
                                            }))}/>
                                        </View>
                                        ))}
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
            
            <View className="flex flex-row items-center justify-center gap-x-2">
                <Pressable className="bg-[#757575] h-[40px] w-[45vw] rounded-[4px] items-center justify-center sticky bottom-5" onPress={() => {setSets(prevSets => [...prevSets, {id: prevSets.length+1, minReps: 0, maxReps: 0}])}}>
                    <Text className="text-white">+ Add Set</Text>
                </Pressable>
                <Pressable className="bg-[#2295f3] h-[40px] w-[45vw] rounded-[4px] items-center justify-center sticky bottom-5" onPress={() => {

                    let newExcersizeSet: ExerciseSet = new ExerciseSet(newExerciseId,exercise,usingWeights,[]);

                    let newSet: Set;

                    sets.forEach(set => {
                        if (metric === "reps") {
                            newSet = new RepSet(set.id, set.minReps, set.maxReps);
                        }
                        else if (metric === "time") {
                            newSet = new TimeSet(set.id, set.time);
                        }
                        else {
                            newSet = new CustomSet(set.id, set.custom);
                        }

                        newExcersizeSet.addSet(newSet);
                    });

                    addExerciseSet(newExcersizeSet);

                    navigation.navigate("Tab-Screen" as never);
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
    button_text: {
        color: "#FFFFFF",
        fontSize: 14,
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
        textAlign: 'left',
    },
});
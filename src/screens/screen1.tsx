import React from "react";
import {  SafeAreaView, View, ScrollView , Text, Pressable } from "react-native";
import { useNavigation } from '@react-navigation/native';
  
export const Screen1 = () => {
    const navigation = useNavigation();
    
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <View className="flex flex-row items-center py-4">
          <Text>Screen1</Text>
        </View>
      </SafeAreaView>
    );
};
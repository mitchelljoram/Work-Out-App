import React from "react";
import {  SafeAreaView, View, ScrollView , Text, Pressable, Button } from "react-native";
import { useNavigation } from '@react-navigation/native';
  
export const HistoryScreen = () => {
    const navigation = useNavigation();
    
    return (
      <SafeAreaView className="flex-1 items-center justify-center bg-white">
        <View className="items-center py-4">
          <Text>History Screen</Text>
        </View>
      </SafeAreaView>
    );
};
import React from "react";
import {ActivityIndicator } from 'react-native'
import { Routes } from "./src/Routes";
import { StatusBar } from 'expo-status-bar'
import {  useFonts, Inter_900Black, Inter_500Medium} from '@expo-google-fonts/inter';
import {Alegreya_400Regular, Alegreya_700Bold} from '@expo-google-fonts/alegreya'
export default function App(){
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_900Black,
    Alegreya_400Regular,
    Alegreya_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <ActivityIndicator  size={"large"}/>
    )
  }
  else{
    return(
      <Routes>
          <StatusBar style='dark'/>
      </Routes>
    )
  }
}

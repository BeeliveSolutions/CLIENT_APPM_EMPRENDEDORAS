import { Alegreya_400Regular, Alegreya_700Bold } from "@expo-google-fonts/alegreya";
import { Inter_500Medium, Inter_900Black, useFonts } from "@expo-google-fonts/inter";
import React from "react";
import { ActivityIndicator, StatusBar } from "react-native";

import Routes from "./src/routes";

export default function App() {
  let [fontsLoaded] = useFonts({
    Inter_500Medium,
    Inter_900Black,
    Alegreya_400Regular,
    Alegreya_700Bold,
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size={"large"} />;
  } else {
    return (
      <Routes>
        <StatusBar style="dark" />
      </Routes>
    );
  }
}

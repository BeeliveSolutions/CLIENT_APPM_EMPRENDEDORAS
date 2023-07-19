import React from "react";
import { StatusBar } from "react-native";
import { StyleSheet, View } from "react-native";

import { Home } from "./src/pages/Home";

export function App() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"light-content"} />
      <Home />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

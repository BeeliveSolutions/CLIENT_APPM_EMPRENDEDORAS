import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React, { useEffect } from "react";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import OnboardingBackground from "../../Images/OnboardingBackground.png";

export function Onboarding() {
  const ScreenWidth = Dimensions.get("window").width;
  const ScreenHeight = Dimensions.get("window").height.toFixed(0);

  const isHighEnd = ScreenHeight > 759 ? true : false;

  const navigation = useNavigation();
  return (
    <View style={styles.wrapper}>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>MULHERES EMPREENDEDORAS</Text>
      </View>
      <View style={styles.imageWrapper}>
        <Image
          source={OnboardingBackground}
          style={isHighEnd ? styles.highEndImage : styles.lowEndImage}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <View style={styles.LeftButtonWrapper}>
          <TouchableOpacity
            style={styles.buttonIAmEntrepreneur}
            onPress={() => navigation.navigate("IAmEntrepreneur")}
          >
            <Text style={styles.textButtonIAmEntrepreneur}>Sou empreendedora</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.RightButtonWrapper}>
          <TouchableOpacity style={styles.ButtonWantMeet} onPress={() => navigation.navigate("Home")}>
            <Text style={styles.textButtonWantMeet}>Quero conhecer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 20,
  },
  titleWrapper: {
    paddingHorizontal: 10,
    alignItems: "center",
    marginBottom: 30,
  },
  title: {
    fontSize: 35,
    color: "#DC0E7B",
    fontFamily: "Alegreya_700Bold",
    textAlign: "center",
  },
  highEndImage: {
    marginBottom: 60,
  },
  lowEndImage: {
    marginBottom: 30,
  },
  imageWrapper: {
    width: "90%",
    maxWidth: 476,
  },
  buttonWrapper: {
    paddingHorizontal: 20,
    width: "100%",
    gap: 20,
  },
  LeftButtonWrapper: {
    alignItems: "flex-start",

  },
  RightButtonWrapper: {
    alignItems: "flex-end",
  },
  buttonIAmEntrepreneur: {
    backgroundColor: "#DC0E7B",
    width: 170,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonIAmEntrepreneur: {
    fontFamily: "Inter_500Medium",
    fontSize: 15,
    color: "#fff",
  },
  ButtonWantMeet: {
    backgroundColor: "#DC0E7B",
    width: 170,
    height: 38,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textButtonWantMeet: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Inter_500Medium",
  },
});

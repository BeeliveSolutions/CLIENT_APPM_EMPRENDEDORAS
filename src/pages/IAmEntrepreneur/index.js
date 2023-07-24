import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import React from "react";
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import BackgroundIAmEntrepreneur from "../../Images/BackgroundIAmEntrepreneur.png";

export function IAmEntrepreneur() {
  const navigation = useNavigation();
  return (
    <View styles={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <AntDesign
          name="arrowleft"
          size={34}
          color="#DC0E7B"
          style={{ marginTop: 20, marginLeft: 15 }}
        />
      </TouchableOpacity>
      <View style={styles.viewBts}>
        <Image source={BackgroundIAmEntrepreneur} style={styles.image} />
        <Text style={styles.text}>
          "Acreditamos que quando uma mulher empreende, todas ao redor dela se
          empoderam"
        </Text>
        <View style={styles.buttonWrapper}>
          <View style={styles.LeftButtonWrapper}>
            <TouchableOpacity
              style={styles.buttonIAmEntrepreneur}
              onPress={() => navigation.navigate("IAmEntrepreneur")}
            >
              <Text style={styles.textButtonIAmEntrepreneur}>Quero me cadastrar</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.RightButtonWrapper}>
            <TouchableOpacity style={styles.ButtonWantMeet} onPress={() => navigation.navigate("Home")}>
              <Text style={styles.textButtonWantMeet}>Empreendimentos</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,

  },
  image: {
    width: 164,
    height: 185,
    marginLeft: 50,
    marginTop: 50,
  },
  viewBts: {
    paddingHorizontal: 10,

  },

  text: {
    color: "#DC0E7B",
    marginHorizontal: 25,
    fontSize: 35,
    marginBottom: 80,
    marginTop: 20,
    textAlign: "left",
    fontFamily: "Alegreya_700Bold",
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
    width: 160,
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

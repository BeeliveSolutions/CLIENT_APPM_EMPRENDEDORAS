import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

import api from "../../services/api";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);

  const navigation = useNavigation();

  async function signIn(email, password) {
    try {
      const { data } = await api.post("/login", { email, password });
      data ? navigation.navigate("Home") : null;
      return data;
    } catch (error) {
      throw error;
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.wrapper}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Fazer Login</Text>
      <View style={styles.inputWrapper}>
        <TextInput
          value={email}
          onChangeText={setEmail}
          style={styles.emailInput}
          placeholderTextColor="#BDBDBD"
          placeholder="E-mail"
          returnKeyType="next"
        ></TextInput>
        <View style={styles.passwordWrapper}>
          <TextInput
            value={password}
            onChangeText={setPassword}
            style={styles.passwordInput}
            placeholderTextColor="#BDBDBD"
            placeholder="Senha"
            returnKeyType="go"
            autoCorrect={false}
            secureTextEntry={hidePassword}
          ></TextInput>
          <TouchableOpacity
            onPress={() => setHidePassword(!hidePassword)}
            activeOpacity={0.6}
            style={styles.passwordShow}
          >
            {hidePassword ? (
              <Text style={styles.togglePasswordVisibility}>Mostrar</Text>
            ) : (
              <Text style={styles.togglePasswordVisibility}>Ocultar</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => signIn(email, password)}
        style={styles.loginButton}
      >
        <Text style={styles.loginTextButton}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgetButton}>
        <Text style={styles.forgetTextButton}>Esqueceu sua senha?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    // paddingVertical: 200,
    backgroundColor: "#fff",
  },
  title: {
    fontFamily: "Inter_500Medium",
    fontSize: 25,
    color: "#DC0E7B",
    fontWeight: "bold",
  },
  inputWrapper: {
    width: "100%",
    gap: 16,
    marginVertical: 50,
  },
  emailInput: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    paddingVertical: 16,
    paddingLeft: 16,
    color: "#DC0E7B",
  },
  passwordWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  passwordInput: {
    height: 50,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderBottomRightRadius: 0,
    borderTopRightRadius: 0,
    paddingVertical: 16,
    paddingLeft: 16,
    color: "#DC0E7B",
    width: "80%",
  },
  passwordShow: {
    backgroundColor: "#F6F6F6",
    width: "20%",
    height: 50,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  togglePasswordVisibility: {
    fontFamily: "Inter_500Medium",
    fontSize: 12,
    color: "#DC0E7B",
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#DC0E7B",
    height: 50,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  loginTextButton: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  forgetButton: {},
  forgetTextButton: {
    fontFamily: "Inter_500Medium",
    fontSize: 16,
    color: "#DC0E7B",
    fontWeight: "600",
  },
});

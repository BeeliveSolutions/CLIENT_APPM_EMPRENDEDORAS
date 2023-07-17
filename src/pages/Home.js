import React, { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

import api from "../services/api/index";

export function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  async function callGetUsers() {
    api
      .get("/companies")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        if (error.response) {
          console.error(error.response.data);
          console.error(error.response.status);
          console.error(error.response.headers);
        } else if (error.request) {
          console.error(error.request);
        } else {
          console.error("Error", error.message);
        }
        console.error(error.config);
      });
  }
  useEffect(() => {
    callGetUsers();
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.buttonUser}>
          <Icon name="user" size={16} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Empresas</Text>
        <TouchableOpacity>
          <Text style={styles.filterButton}>Filtrar</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Buscar Empresa"
        placeholderTextColor="#DC0E7B"
      />
      <Text style={styles.highlight}>Destaque</Text>
      <FlatList
        style={{ marginTop: 30, height: 600 }}
        data={users}
        keyExtractor={(item) => item.company_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.wrapperCompany}>
            <Image
              style={styles.companyLogo}
              source={{
                uri: "https://www.gostodetinta.com.br/home/wp-content/uploads/2017/09/g3.jpg",
              }}
            ></Image>
            <View>
              <Text style={styles.companyName}>{item.name}</Text>
              <Text style={styles.companyDescription}>{item.name}</Text>
            </View>
            <TouchableOpacity style={styles.companyDetailsButton}>
              <Text style={styles.companyDetailsButtonText}>ver</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.highlight}>Novas empresas</Text>
      <FlatList
        style={{ marginTop: 30 }}
        data={users}
        keyExtractor={(item) => item.company_id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.wrapperCompany}>
            <Image
              style={styles.companyLogo}
              source={{
                uri: "https://www.gostodetinta.com.br/home/wp-content/uploads/2017/09/g3.jpg",
              }}
            ></Image>
            <View>
              <Text style={styles.companyName}>{item.name}</Text>
              <Text style={styles.companyDescription}>{item.name}</Text>
            </View>
            <TouchableOpacity style={styles.companyDetailsButton}>
              <Text style={styles.companyDetailsButtonText}>ver</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  buttonUser: {
    width: 35,
    height: 35,
    backgroundColor: "#DC0E7B",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 17.5,
  },
  headerTitle: {
    fontSize: 25,
    color: "#DC0E7B",
    fontWeight: "700",
  },
  filterButton: {
    fontSize: 16,
    color: "#DC0E7B",
    fontWeight: "400",
  },
  textInput: {
    width: "100%",
    borderColor: "#DC0E7B",
    height: 50,
    marginTop: 16,
    borderRadius: 100,
    paddingLeft: 16,
    borderWidth: 1.5,
  },
  highlight: {
    fontSize: 12,
    color: "#DC0E7B",
    fontWeight: "700",
    marginTop: 16,
  },
  wrapperCompany: {
    width: "100%",
    backgroundColor: "#DC0E7B",
    borderRadius: 15,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    alignItems: "center",
  },
  companyLogo: {
    width: 56,
    height: 56,
    borderRadius: 50,
  },
  companyDetailsButton: {
    width: 70,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  companyDetailsButtonText: {
    fontSize: 14,
    color: "#DC0E7B",
    fontWeight: "400",
  },
  companyName: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "500",
  },
  companyDescription: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "400",
    textAlign: "left",
  },
});

import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Image,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { AntDesign } from '@expo/vector-icons';
import api from '../../services/api';
import { useNavigation, useRoute } from "@react-navigation/native";

export default function Home() {
  const route = useRoute();

  // Acessar a propriedade filterQuery
  const filterQuery = route.params?.filterQuery || '';
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation()
  async function callGetCompanies() {
    api
      .get("/companies")
      .then((response) => {
        setCompanies(response.data);
        setLoading(false)
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
  async function callGetFilterCompanies() {
    api
      .get(`/companies/filter/for/?${filterQuery}`)
      .then((response) => {
        if (typeof response.data === "string") {
          // Se a resposta for uma string, não há empresas disponíveis
          setCompanies([]);
        } else {
          setCompanies(response.data);
        }

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
    if (filterQuery) {
      console.log(filterQuery)
      callGetFilterCompanies()
    }
    else {

      callGetCompanies();
    }


  }, [filterQuery]);

  return (
    <View style={styles.wrapper}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.buttonUser}>
          <Icon name="user" size={16} color="#FFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Empresas</Text>
        <TouchableOpacity onPress={() => {
          navigation.navigate("Filter")
        }}>
          <Text style={styles.filterButton}>Filtrar</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.textInput}
        placeholder="Buscar Empresas"
        placeholderTextColor="#DC0E7B"
      />
      <ScrollView>

        <Text style={styles.highlight}>{filterQuery ? "Empresas Filtradas" : ("Destaque")}</Text>
        {companies.length === 0 ? (<Text style={styles.noCompaniesText}>Nenhuma empresa encontrada.</Text>) : (<FlatList
          style={{ marginTop: 15 }}
          data={companies}
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
              <View style={styles.textCompanyView}>
                <Text style={styles.companyName}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.companyDescription}>{item.description}</Text>
              </View>

              <TouchableOpacity style={styles.buttonArrow}>
                <AntDesign name="arrowright" size={25} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />)
        }


        <Text style={styles.highlight}>{filterQuery ? "" : ("Destaque")}</Text>
        {companies.length === 0 ? (<Text style={styles.noCompaniesText}>Nenhuma empresa encontrada.</Text>) : (<FlatList
          style={{ marginTop: 15 }}
          data={companies}
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
              <View style={styles.textCompanyView}>
                <Text style={styles.companyName}>{item.name}</Text>
                <Text numberOfLines={1} style={styles.companyDescription}>{item.description}</Text>
              </View>

              <TouchableOpacity style={styles.buttonArrow}>
                <AntDesign name="arrowright" size={25} color="black" />
              </TouchableOpacity>
            </View>
          )}
        />)
        }


      </ScrollView>



    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
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
    fontSize: 20,
    color: "#DC0E7B",
    fontWeight: "700",
    marginTop: 10
  },
  wrapperCompany: {
    width: "100%",
    backgroundColor: "#DC0E7B",
    borderRadius: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 10,
    alignItems: "center",
  },
  textCompanyView: {
    width: "70%",
  },
  companyLogo: {
    width: 56,
    height: 56,
    borderRadius: 50,
  },
  buttonArrow: {
    padding: 5,
    backgroundColor: '#fff',
    borderRadius: 50
  },
  companyDetailsButtonText: {
    fontSize: 14,
    color: "#DC0E7B",
    fontWeight: "400",
  },
  companyName: {
    fontSize: 23,
    color: "#fff",
    fontWeight: "500",
  },
  companyDescription: {
    fontSize: 14,
    color: "#fff",
    fontWeight: "400",
    textAlign: "left",

  },

  noCompaniesText: {
    fontSize: 18,
    color: "#DC0E7B",
    textAlign: "center",
    marginTop: 20,
  },

});
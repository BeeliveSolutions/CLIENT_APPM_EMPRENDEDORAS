import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native'
import { StatusBar } from "expo-status-bar";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function UserProfile() {
  const [user, setUser] = useState([]);

  async function getUser() {
    const response = await fetch("https://serverappmemprendedoras-production.up.railway.app/api/users/2");
    const data = await response.json();
    setUser(data)
  }

  useEffect(() => {
    getUser()
  }, [])

  return(
    <View style={styles.container}>
      <StatusBar style="light"/>

      <View style={styles.viewUp}></View>
        <View style={styles.profilePhotoView}>
          <View style={styles.circle}>
            <Image style={styles.profilePhoto} source={{uri:'http://ahduvido.com.br/wp-content/uploads/2017/01/5-kendal-jenner.jpg'}}/>
          </View>
            <TouchableOpacity style={styles.editPhotoButton}>
              <MaterialIcons name="mode-edit" size={45} color="white" /> 
            </TouchableOpacity>
        </View>
      <View style={styles.viewDown}>
        <View style={styles.userNameView}>
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userDescription}>Empresária no ramo de:</Text>
        </View>
        <View style={styles.companies}>
          <View style={styles.textCompanyView}>
            <Text style={styles.companyArea}>Minhas Empresas:</Text>
          </View>
          <View style={styles.companiesView}>
            <View style={styles.companyField}>
            <TouchableOpacity style={styles.companiesButton}></TouchableOpacity>
              <Text style={styles.companyTextField}>Empresa1</Text>
            </View>

            <View style={styles.companyField}>
            <TouchableOpacity style={styles.companiesButton}></TouchableOpacity>
              <Text style={styles.companyTextField}>Empresa2</Text>
            </View>

              <TouchableOpacity style={styles.companiesButton}>
                <FontAwesome5 name="long-arrow-alt-right" size={24} color="black" />
              </TouchableOpacity>
          </View>
        </View>
        <View style={styles.aboutView}>
          <Text style={styles.companyArea}>Sobre mim:</Text>
        </View>
        <Text style={styles.aboutDescription}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra rutrum elementum nunc velit dui dui, penatibus.</Text>
        <Text style={styles.personalContactsText}>Contatos Pessoais:</Text>
        <View style={styles.contactsView}>
          <View style={styles.contactArea}>
            <Text style={styles.goText}>Whatsapp</Text>
            <TouchableOpacity style={styles.goButton}><Text style={styles.textGoButton}>IR</Text></TouchableOpacity>
          </View>

          <View style={styles.contactArea}>
            <Text style={styles.goText}>Instagram</Text>
            <TouchableOpacity style={styles.goButton}><Text style={styles.textGoButton}>IR</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    viewUp: {
      flex: 0.3,
      backgroundColor: '#DC0E7B',
    },

    profilePhotoView: {
      flexDirection: 'row',
      width: 300,
      height: 160,
      position: 'absolute',
      zIndex: 1,
      top: '15%',
      alignSelf: 'center',
    },

    circle: {
      width: 160,
      height: 160,
      borderRadius: 200,
      backgroundColor: '#fff',
      alignSelf: 'center',
      borderWidth: 4,
      borderColor: '#fff',
      elevation: 10,
      marginLeft: '23.5%'
    },

    profilePhoto: {
      width: '100%',
      height: '100%',
      borderRadius: 200
    },

    editPhotoButton: {
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center'
    },

    viewDown: {
      flex: 0.7,
      backgroundColor: '#fff'
    },

    userNameView: {
      alignItems: 'center', 
      marginTop: '15%'
    },

    userName: {
      fontSize: 30,
      fontWeight: 600,
      color: '#DC0E7B'
    },

    userDescription: {
      fontSize: 16,
      fontWeight: 600,
      color: '#DC0E7B'
    },

    companies: {
      marginHorizontal: '5%',
      marginTop: '9%'
    },

    textCompanyView: {
      backgroundColor: '#DC0E7B33',
      alignItems: 'center',
      justifyContent: 'center',
      width: 160,
      borderRadius: 15,
    },

    companyArea: {
      fontSize: 14,
      color:'#DC0E7B',
      fontWeight: 600
    },

    companiesView: {
      flexDirection: "row",
      marginVertical: 10,
    },

    companyField: {
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },

    companyPhoto: {
      width: 70,
      height: 70,
      borderRadius: 35,
    },

    companyTextField: {
      fontSize: 10,
      fontWeight: 600,
      color: '#DC0E7B',
      textAlign: 'center'
    },

    companiesButton: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#C4C4C4',
      width: 65,
      height: 65,
      borderRadius: 50,
      marginBottom: 5
    },

    aboutView: {
      backgroundColor: '#DC0E7B33',
      alignItems: 'center',
      justifyContent: 'center',
      width: 120,
      borderRadius: 15,
      marginTop: '9%',
      marginLeft: '5%'
    },

    aboutDescription: {
      color: '#DC0E7B',
      textAlign: 'justify',
      paddingHorizontal: 20,
      marginTop: 5
    },

    personalContactsText: {
      color: '#DC0E7B', 
      fontWeight: '600', 
      alignSelf: 'center', 
      marginTop: '10%'
    },

    contactsView: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 10
    },

    contactArea: {
      flexDirection: 'row', 
      justifyContent: "space-around", 
      width: 160
    },

    goText: {
      fontSize: 15,
      fontWeight: '500',
      textAlignVertical: 'center'
    },

    goButton: {
      width: 70,
      height: 35,
      borderRadius: 50,
      backgroundColor: '#DC0E7B',
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#0043CE'
    },

    textGoButton: {
      color: '#fff'
    }
  })
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text ,View, TextInput, TouchableOpacity } from 'react-native';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  return (
    <View style={styles.container}>
    <StatusBar style='black'/>

      <Text style={styles.Text}>Fazer login </Text>

      <TextInput   style={styles.TextInput} value={email} onChangeText={(text) =>setEmail(text)} placeholder='Email'/>
      <View style={styles.pass}>
        <TextInput  style={styles.TextInput}value={password} onChangeText={(text) =>setPassword(text)} placeholder='Senha'/>
        <TouchableOpacity><Text style={styles.textPass}>Show</Text></TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.btn}><Text style={styles.btntxt}>Entrar</Text></TouchableOpacity> 
      <TouchableOpacity><Text style={styles.link}>Esqueceu sua senha ?</Text></TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display:'flex',
    flex: 1,
    alignItems:'center',
    marginTop:50,
  },
  Text:{
  fontSize:20,
  color:'#DC0E7B',
   fontWeight: 'bold',
  },
  TextInput:{
    backgroundColor:'#E8E8E8',
    width:'90%',
    height:50,
    padding:10,
    marginTop:15,
    borderRadius:10,
  },
  pass:{
    flexDirection:'row',
    alignItems:'center',
  },
  textPass:{
    color:'#DC0E7B',
  },
  btn:{
    width:'90%',
    backgroundColor:'#DC0E7B',
    alignItems:'center',
    justifyContent:'center',
    marginTop:35,
    marginBottom:15,
    height:50,
    borderRadius:100,
  },
  btntxt:{
    color:'#FFFFFF',
    fontSize:16,
  },
  link:{
    color:'#DC0E7B',
    fontWeight: 'bold',
  },

});

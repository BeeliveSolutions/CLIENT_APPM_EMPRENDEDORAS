import React from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import LottieView from 'lottie-react-native';
import image from '../Images/Imagem4.png'
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from '@expo/vector-icons';

export function SouEmpreendedora(){
    const navigation = useNavigation()
    return(
        <ScrollView>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
                <AntDesign name="arrowleft" size={34} color="#DC0E7B" style={{marginTop:20, marginLeft:15}}/>
            </TouchableOpacity>
            <View style={styles.container}>
                <Image source={image} style={styles.image} />
                <Text style={styles.text}>"Acreditamos que quando uma mulher empreende, todas ao redor dela se empoderam"</Text>
                <View style={styles.viewBts}> 
                    <TouchableOpacity style={styles.botao1}>
                        <Text style={styles.textBotao1}>Quero me cadastrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao2}>
                        <Text style={styles.textBotao2}>Ver meus empreendimentos</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:50
    },
    image:{
        width:164, 
        height:185, 
        marginLeft:50,
        marginTop:50,
    },
    viewBts:{
        paddingHorizontal:15
    },
    botao1:{
        backgroundColor:'#DC0E7B',
        width:160,
        height:45,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        elevation:10
    },
    textBotao1:{
        color:'#fff',
        fontFamily:'Inter_500Medium'
    },
    botao2:{
        marginLeft:180,
        backgroundColor:'#DC0E7B',
        width:160,
        height:45,
        marginVertical:10,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        elevation:10,
        marginBottom:50
    },
    textBotao2:{
        color:'#fff',
        fontFamily:'Inter_500Medium'
    },
    text:{
        color:'#DC0E7B',
        marginHorizontal:25,
        fontSize:35,
        marginBottom:80,
        marginTop:20,
        textAlign:'left',
        fontFamily:'Alegreya_700Bold'
    },
})
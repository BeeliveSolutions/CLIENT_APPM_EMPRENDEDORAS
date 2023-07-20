import React from "react";
import {View, Text, Image, TouchableOpacity, StyleSheet, ScrollView} from 'react-native'
import LottieView from 'lottie-react-native';
import image1 from '../Images/ImagemIntro1.png'
import image2 from '../Images/ImagemIntro12.png'
import { useNavigation } from "@react-navigation/native";


export function Intro(){
    const navigation = useNavigation()
    return(
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.titleView}>
                    <Text style={styles.title}>MULHERES EMPREENDEDORAS</Text>
                </View> 
                <View style={styles.images}>
                    <Image source={image2} style={styles.image1} />
                    <Image source={image1} style={styles.image} />

                </View>
                <View style={styles.viewBts}> 
                    <TouchableOpacity style={styles.botao1} onPress={()=>navigation.navigate('SouEmpreendora')}>
                        <Text style={styles.textBotao1}>Sou empreendedora</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botao2}>
                        <Text style={styles.textBotao2}>Quero conhecer</Text>
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
    titleView:{
        paddingHorizontal:10,
        alignItems:'center'
    },
    title:{
        fontSize:35,
        color:'#DC0E7B',
        fontFamily:'Alegreya_700Bold'
    },
    images:{
        resizeMode:'cover',
        marginTop:50,
        marginBottom:100
    },
    image:{
        width:375, 
        height:383, 
    },
    image1:{
        resizeMode:'contain',
        marginTop:50,
        left:-80,
        width:395, 
        height:383,
        position:'absolute',
         
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
        fontSize:15,
        fontFamily:'Inter_500Medium'
    },
    botao2:{
        marginLeft:180,
        backgroundColor:'#FE9A1E',
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
        fontSize:15,
        fontFamily:'Inter_500Medium'
    },
})
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import ImageCreateAccount from "../../Images/ImageCreateAccountSucessful.png";
import { useNavigation } from '@react-navigation/native';

const CreationSucessful = () => {
    const navigate = useNavigation()
    return (
        <View style={styles.wrapper}>
            <View style={styles.wrapper}>
                <Text style={styles.mainText}>Conta Criada!</Text>
                <Text style={styles.secondaryText}>
                    Vamos ser referência no desenvolvimento do empreendedorismo feminino!
                </Text>
                <Image
                    source={ImageCreateAccount} // Substitua pelo caminho correto da imagem
                    style={styles.image}
                    resizeMode="contain"
                />
                <TouchableOpacity style={styles.button} onPress={() => {
                    navigate.navigate('Home')
                }}>
                    <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 15
    },

    mainText: {
        fontSize: 48,
        marginBottom: 10,
        color: '#DC0E7B',
        fontFamily: "Alegreya_700Bold",
    },
    secondaryText: {
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 20,
        color: '#DC0E7B',
        fontFamily: "Alegreya_700Bold",
    },
    image: {
        width: 300,
        height: 200,
        marginBottom: 20,
    },
    button: {

        paddingVertical: 10,
        paddingHorizontal: 40,
        borderRadius: 8,
        backgroundColor: '#DC0E7B'

    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default CreationSucessful;

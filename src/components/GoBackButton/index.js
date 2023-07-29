import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

export const GoBackButton = () => {
    const navigation = useNavigation()
    return <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign
                name="arrowleft"
                size={35}
                color="#DC0E7B"

            />

        </TouchableOpacity>
    </View>;
}







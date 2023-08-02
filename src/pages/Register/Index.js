import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, BackHandler } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { Platform } from 'react-native';
import api from '../../services/api'
import ToastManager, { Toast } from 'toastify-react-native'
import { useNavigation } from '@react-navigation/core';


const Register = () => {
    const navigate = useNavigation()



    // State variables for registration fields
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [ddd, setDdd] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [dob, setDOB] = useState('');
    const [address, setAddress] = useState('');
    const [isEntrepreneur, setIsEntrepreneur] = useState(false);
    const [selectedUf, setSelectedUf] = useState('');
    const [selectedCity, setSelectedCity] = useState('');
    const [date, setDate] = useState(new Date());
    const [ufs, setUfs] = useState([]);
    const [city, setCity] = useState([]);

    const fetchUfs = async () => {
        try {
            const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const data = await response.json();
            setUfs(data);
        } catch (error) {
            console.error("Error fetching data from IBGE API:", error);
            throw error;
        }
    };

    const fetchCitiesForUf = async (uf) => {
        try {
            const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`);
            if (!response.ok) {
                throw new Error("Network response was not ok.");
            }
            const data = await response.json();
            setCity(data);
        } catch (error) {
            console.error("Error fetching data from IBGE API:", error);
            throw error;
        }
    };
    const handleEntrepreneurSelection = (value) => {
        setIsEntrepreneur(value);
    };

    const handleCreateAccount = async () => {
        if (!name || !password || !email || !phoneNumber || !ddd) {
            return Toast.error('Campos Obrigatórios!', 'top');
        }

        const formatedDate = (date) => {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        };

        const handleValidation = () => {
            const errors = [];

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                errors.push('Email não é válido!');
            }

            if (password.length < 8) {
                errors.push('Senha deve ter pelo menos 8 caracteres!');
            }



            const phoneRegex = /^\d{7,}$/;
            const phoneNumberAll = ddd + phoneNumber;
            const isValidPhone = phoneRegex.test(phoneNumberAll);

            if (!isValidPhone) {
                errors.push('Telefone inválido! Insira um número válido com pelo menos 7 dígitos, incluindo o DDD.');
            }


            return errors;
        };

        const validationErrors = handleValidation();
        if (validationErrors.length > 0) {
            validationErrors.forEach((error) => {
                Toast.error(error, 'top');
            });
            return;
        }

        try {
            const response = await api.post('/users', {
                "name": name,
                "email": email,
                "password": password,
                "phone_number": `${ddd}${phoneNumber}`,
                "address": address,
                "birth_date": formatedDate(date),
                "address": address,
                "is_entrepreneur": isEntrepreneur,
                "uf": selectedUf,
                "city": selectedCity.nome,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            //GUARDAR TOKEN NO ASYNC STORAGE
            const token = response.data.token;
            if (token) {
                navigate.navigate('CreateSucessful')
            }
            // console.log('Token do usuário:', token);
            // console.log("user: ", user)

        } catch (error) {
            if (error.response) {
                Toast.error(error.response.data.msg); // => a resposta da API quando há erro
            }
        }
    };


    useEffect(() => {

        fetchUfs();
    }, []);

    useEffect(() => {
        if (selectedUf) {
            fetchCitiesForUf(selectedUf);
        }
    }, [selectedUf]);


    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;

        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        DateTimePickerAndroid.open({
            value: date,
            onChange,
            mode: currentMode,
            is24Hour: true,
            style: styles.datePickerStyle,
        });

    };

    const showDatepicker = () => {
        showMode('date');
    };
    const buttonStyle = (isSelected) => ({
        backgroundColor: isSelected ? "#DC0E7B" : "#FFFFFF",
        borderColor: "#DC0E7B",
        borderWidth: 2,
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 15,
        marginHorizontal: 10,
    });

    const labelStyle = (isSelected) => ({
        color: isSelected ? "#FFFFFF" : "#DC0E7B",
        fontWeight: 'bold',
    });

    return (
        <ScrollView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.wrapper}>
            <ToastManager />
            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Nome*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Maria de Lurdes"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Email*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="maria@exemplo.com"
                    value={email}
                    keyboardType='email-address'
                    onChangeText={setEmail}
                />
            </View>


            <View style={[styles.inputWrapperRow, styles.wrapperSpace]}>
                <View style={[styles.inputWrapper, styles.passwordWrapper]}>
                    <Text style={styles.label}>Senha*</Text>
                    <TextInput
                        style={[styles.input, styles.passwordInput]}
                        placeholder="*******"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={setPassword}
                    />
                </View>
                <View style={[styles.inputWrapper]}>
                    <Text style={styles.label}>Data de Nascimento</Text>
                    <View style={styles.dobInput}>
                        <TouchableOpacity onPress={showDatepicker}
                            style={styles.input}
                            value={dob}
                            onChangeText={setDOB}
                        >

                            <Text style={''}>
                                {date.toLocaleDateString()}
                            </Text>
                        </TouchableOpacity>
                        <AntDesign name="calendar" size={24} color="#0f0f0f" style={styles.iconWrapper} />
                    </View>

                </View>
            </View>


            <View style={styles.inputWrapperRow}>
                <View style={[styles.inputWrapper, styles.ddiWrapper]}>
                    <Text style={styles.label}>DDD*</Text>
                    <TextInput
                        style={[styles.input]}
                        placeholder="00"
                        value={ddd}
                        onChangeText={setDdd}
                        keyboardType="phone-pad"
                        maxLength={2}
                    />
                </View>
                <View style={styles.inputWrapper}>
                    <Text style={styles.label}>Telefone*</Text>
                    <TextInput
                        style={[styles.input, styles.cellInput]}
                        placeholder="Seu Numero"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        maxLength={9}
                    />
                </View>
            </View>




            <View style={styles.checkboxWrapper}>
                <Text style={styles.labelWrong}>Sou empreendedora?</Text>
                <View style={styles.checkboxRow}>
                    <TouchableOpacity
                        style={buttonStyle(isEntrepreneur === true)}
                        onPress={() => handleEntrepreneurSelection(true)}
                    >
                        <Text style={labelStyle(isEntrepreneur === true)}>Sim</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={buttonStyle(isEntrepreneur === false)}
                        onPress={() => handleEntrepreneurSelection(false)}
                    >
                        <Text style={labelStyle(isEntrepreneur === false)}>Não</Text>
                    </TouchableOpacity>
                </View>
            </View>






            <View style={styles.inputWrapper}>
                <Text style={styles.label}>Endereço</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Ex: Rua 14, Parque união."
                    value={address}
                    onChangeText={setAddress}
                />
            </View>
            <View style={styles.dropDownWrapper}>

                <View style={styles.dropDownBox}>
                    <Text style={[styles.label]}>Uf</Text>

                    <Picker
                        style={[styles.input, styles.inputDropDown]}
                        selectedValue={selectedUf}
                        onValueChange={(itemValue, itemIndex) => setSelectedUf(itemValue)}
                    >
                        <Picker.Item label="SELECIONAR" value="" style={styles.labelCheckBox} />
                        {ufs.map((uf) => (
                            <Picker.Item label={uf.sigla} value={uf.sigla} key={uf} style={styles.inputItem} />
                        ))}
                    </Picker>
                </View>




                {selectedUf !== '' && (
                    <View style={styles.dropDownBox}>
                        <Text style={styles.label}>Cidade</Text>

                        <Picker
                            style={[styles.input, styles.inputDropDown]}
                            selectedValue={selectedCity}
                            onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}
                        >
                            <Picker.Item label="SELECIONAR" value="" style={styles.labelCheckBox} />
                            {city.map((city) => (
                                <Picker.Item label={city.nome} value={city} key={city} style={styles.inputItem} />
                            ))}
                        </Picker>

                    </View>
                )}
            </View>
            <View style={styles.btnFinishWrapper}>

                <TouchableOpacity style={styles.btnFinish} onPress={() => {
                    handleCreateAccount()
                }}>
                    <Text style={styles.textBtnFinish}>Criar Conta</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        padding: 20,
        backgroundColor: '#ffffffff',


    },
    inputWrapper: {

        marginBottom: 10,

    },
    inputItem: {
        marginBottom: 15,
        height: 40,



    },
    inputWrapperRow: {
        display: "flex",
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "#f9f9f9"

    },

    wrapperSpace: {
        display: 'flex',
        justifyContent: 'space-between',

    },

    ddiWrapper: {

        marginRight: 3,
    },
    label: {
        color: '#DC0E7B',
        fontSize: 15,
        marginBottom: 5,
        fontFamily: "Inter_900Black",

    },


    labelWrong: {
        color: '#DC0E7B',
        fontSize: 20,
        marginBottom: 8,
        fontFamily: "Alegreya_700Bold",

    },
    input: {
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 7,
        padding: 10,

        fontFamily: "Inter_500Medium",
    },

    cellInput: {
        width: 120

    }
    ,
    dropDownWrapper: {
        display: 'flex',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 70,


    },
    dropDownBox: {
        marginVertical: 10,

        display: 'flex',
        alignItems: "center",

    },

    inputDropDown: {
        width: 150,
        height: 20,
        backgroundColor: 'rgba(220, 14, 123, 0.2)',



    },

    passwordWrapper: {
        width: 150,


    },

    dobInput: {
        width: 150,
        position: 'relative',


    },

    iconWrapper: {
        position: 'absolute',
        top: '50%',
        transform: [{ translateY: -12 }],
        right: 10
    },

    checkboxWrapper: {
        flexDirection: 'column',
        alignItems: 'center',
        marginVertical: 10,
        paddingVertical: 20,
        borderRadius: 20,
        backgroundColor: 'rgba(220, 14, 123, 0.2)',

    },
    checkboxRow: {
        display: 'flex',
        justifyContent: 'center',
        gap: 100,
        flexDirection: 'row',

    },
    checkboxText: {
        color: '#DC0E7B',


    },
    btnFinishWrapper: {
        width: "100%",

        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 29,
    },
    btnFinish: {
        display: 'flex',
        width: 240,
        height: 40,
        backgroundColor: '#DC0E7B',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    textBtnFinish: {
        color: "#ffff",
        fontSize: 16,
        fontFamily: "Alegreya_700Bold",
    }

});

export default Register;
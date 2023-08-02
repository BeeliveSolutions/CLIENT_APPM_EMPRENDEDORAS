import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { api } from '../../services/api';

export function Filter() {
    const navigation = useNavigation();
    const [categories, setCategories] = useState([]);
    const [myUf, setMyUf] = useState();
    const [myCity, setMyCity] = useState();
    const [selectedModLocal, setSelectedModLocal] = useState('');
    const [showAllFilters, setShowAllFilters] = useState(false);
    const [filteredList, setFilteredList] = useState([]);
    const [idsCategory, setIdsCategory] = useState([]);
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedOptionStyle, setSelectedOptionStyle] = useState('');
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedDateStyle, setSelectedDateStyle] = useState('');

    const handleToggleFilters = () => {
        setShowAllFilters(!showAllFilters);
        setFilteredList(showAllFilters ? categories.slice(0, 3) : categories);
    };

    // Função para carregar as categorias a partir da API
    async function callGetCategories() {
        try {
            const response = await api.get("/categories");
            setCategories(response.data);
            setFilteredList(response.data.slice(0, 3));
        } catch (error) {
            console.error("Erro ao carregar categorias:", error);
        }
    }

    // Função para obter o endereço do usuário a partir da API
    const getMyAddress = async () => {
        // NO "2" colocar o id referente ao usuário logado
        api
            .get("/users/2")
            .then((response) => {
                setMyUf(response.data.uf)
                setMyCity(response.data.city)
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

    // Função para adicionar ou remover uma categoria da lista de IDs de categorias selecionadas
    const pushCategoryId = (id_Category) => {
        const isCategorySelected = idsCategory.includes(id_Category);

        if (isCategorySelected) {
            // Se o id_Category já estiver na lista, remova-o
            setIdsCategory(idsCategory.filter((id) => id !== id_Category));
        } else {
            // Caso contrário, adicione-o à lista
            setIdsCategory([...idsCategory, id_Category]);
        }

    };

    // Função para selecionar a opção da modalidade (Virtual, Fisico ou Ambos)
    const handleOptionSelect = (option) => {
        // Verifica se a opção clicada é a mesma que já estava selecionada
        if (option === selectedOptionStyle) {
            // Se for a mesma opção, deseleciona a variável
            setSelectedOptionStyle('');
        } else {
            // Caso contrário, seleciona a nova opção
            switch (option) {
                case 'Virtual':
                    setSelectedOption('is_virtual=1&is_physical=0');
                    setSelectedOptionStyle('Virtual');
                    break;
                case 'Fisico':
                    setSelectedOption('is_physical=1&is_virtual=0');
                    setSelectedOptionStyle('Fisico');
                    break;
                case 'Ambos':
                    setSelectedOption('is_virtual=1&is_physical=1');
                    setSelectedOptionStyle('Ambos');
                    break;
                default:
                    setSelectedOption('');
            }
        }
    };


    // Função para calcular a data baseada na opção selecionada (5 anos, 2 Anos ou Recem Criadas)
    const calculateDate = (value) => {
        const currentDate = new Date();
        let calculatedDate;

        // Verifica se a opção clicada é a mesma que já estava selecionada
        if (value === selectedDateStyle) {
            // Se for a mesma opção, deseleciona a variável
            setSelectedDateStyle('');
            setSelectedDate('');
        } else {
            // Caso contrário, seleciona a nova opção e calcula a data
            setSelectedDateStyle(value);

            switch (value) {
                case '5 Anos':
                    calculatedDate = new Date(
                        currentDate.getFullYear() - 5,
                        currentDate.getMonth(),
                        currentDate.getDate()
                    );
                    break;
                case '2 Anos':
                    calculatedDate = new Date(
                        currentDate.getFullYear() - 2,
                        currentDate.getMonth(),
                        currentDate.getDate()
                    );
                    break;
                case 'Recem Criadas':
                    calculatedDate = new Date(
                        currentDate.getFullYear() - 1,
                        currentDate.getMonth(),
                        currentDate.getDate()
                    );
                    break;
                default:
                    // Caso nenhum valor seja selecionado, definimos como null
                    calculatedDate = null;
            }

            // Verifica se a data foi calculada com sucesso
            if (calculatedDate) {
                // Obtém o ano, mês e dia da data calculada
                const year = calculatedDate.getFullYear();
                const month = String(calculatedDate.getMonth() + 1).padStart(2, '0');
                const day = String(calculatedDate.getDate()).padStart(2, '0');

                // Formata a data no formato "yyyy-mm-dd"
                const formattedDate = `${year}-${month}-${day}`;

                // Atualiza o estado com a data formatada
                setSelectedDate(formattedDate);

            } else {
                // Caso nenhum valor seja selecionado, define o estado como vazio
                setSelectedDate('');
            }
        }
    };


    useEffect(() => {
        getMyAddress()
        callGetCategories();
    }, []);

    // Função para construir a string de consulta com base nos filtros selecionados
    const getFilterInQuery = () => {
        let query = '';

        if (idsCategory.length > 0) {
            query += '&category=' + idsCategory.join(',');
        }

        if (selectedOption) {
            query += '&' + selectedOption;
        }

        if (selectedDate) {
            query += '&existence=' + selectedDate;
        }

        if (selectedModLocal) {
            if (selectedModLocal === myUf) {
                query += '&uf=' + selectedModLocal;
            } else {
                query += '&city=' + selectedModLocal;
            }
        }

        return query;
    };


    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.typeFilterContainer}>
                <View style={styles.filterHeader}>
                    <Text style={styles.textTypeFilter}>
                        Categorias
                    </Text>
                    <TouchableOpacity style={styles.maxFilterBtn} onPress={handleToggleFilters}>
                        <AntDesign
                            name={showAllFilters ? "arrowup" : "arrowdown"}
                            size={25}
                            color="#DC0E7B"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.filtersContainer}>
                    {filteredList.map(({ category_id, name }) => (
                        <TouchableOpacity key={category_id} onPress={() => { pushCategoryId(category_id) }} style={idsCategory.includes(category_id) ? styles.filterBoxSelected : styles.filterBox}>
                            <Text numberOfLines={1}>{name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.typeFilterContainer}>
                <View style={styles.filterHeader}>
                    <Text style={styles.textTypeFilter}>
                        Modalidade
                    </Text>

                </View>

                <View>
                    <View style={styles.filtersContainer}>
                        <TouchableOpacity
                            onPress={() => handleOptionSelect('Virtual')}
                            style={[
                                selectedOptionStyle === "Virtual" | selectedOptionStyle === "Ambos" ? styles.filterBoxSelected : styles.filterBox
                            ]}
                        >
                            <Text>Virtual</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleOptionSelect('Fisico')}
                            style={[
                                selectedOptionStyle === "Fisico" | selectedOptionStyle === "Ambos" ? styles.filterBoxSelected : styles.filterBox
                            ]}
                        >
                            <Text>Fisico</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleOptionSelect('Ambos')}
                            style={[
                                selectedOptionStyle === "Ambos" ? styles.filterBoxSelected : styles.filterBox
                            ]}
                        >
                            <Text>Ambos</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>


            <View style={styles.typeFilterContainer}>
                <View style={styles.filterHeader}>
                    <Text style={styles.textTypeFilter}>
                        Localidade
                    </Text>

                </View>

                <View style={styles.filtersContainer}>
                    <TouchableOpacity style={selectedModLocal == myUf ? styles.filterBoxSelected : styles.filterBox} onPress={async () => {
                        setSelectedModLocal(myUf)
                    }} >
                        <Text>UF</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={selectedModLocal == myCity ? styles.filterBoxSelected : styles.filterBox} onPress={async () => {
                        setSelectedModLocal(myCity)
                    }} >
                        <Text>Sua Cidade</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.typeFilterContainer}>
                <View style={styles.filterHeader}>
                    <Text style={styles.textTypeFilter}>
                        Tempo de Existencia
                    </Text>

                </View>

                <View style={styles.filtersContainer}>
                    <TouchableOpacity
                        style={selectedDateStyle === "5 Anos" ? styles.filterBoxSelected : styles.filterBox}
                        onPress={() => calculateDate('5 Anos')}
                    >
                        <Text>5 anos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={selectedDateStyle === "2 Anos" ? styles.filterBoxSelected : styles.filterBox}
                        onPress={() => calculateDate('2 Anos')}
                    >
                        <Text>2 Anos</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={selectedDateStyle === "Recem Criadas" ? styles.filterBoxSelected : styles.filterBox}
                        onPress={() => calculateDate('Recem Criadas')}
                    >
                        <Text>Recem Criadas</Text>
                    </TouchableOpacity>
                </View>



            </View>

            <TouchableOpacity style={styles.ButtonFilter} onPress={() => {
                const query = getFilterInQuery();
                navigation.navigate('Home', { filterQuery: query });//porem, quero voltar pra home já com os filtros
            }}>
                <Text style={styles.textButtonFilter}>Filtrar</Text>
            </TouchableOpacity>
        </ScrollView >
    )
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    typeFilterContainer: {
        paddingHorizontal: 15,
        gap: 20,
        marginTop: 10,

    },
    filterHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    textTypeFilter: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    filtersContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    filterBox: {
        borderWidth: 2,
        borderColor: '#DC0E7B',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: '49%',
        alignItems: 'center',
    },

    filterBoxSelected: {
        borderWidth: 2,
        borderColor: '#DC0E7B',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        width: '49%',
        alignItems: 'center',
        backgroundColor: '#DC0E7B',

    },
    maxFilterBtn: {
        alignSelf: 'flex-end',
    }
    , ButtonFilter: {
        backgroundColor: "#DC0E7B",
        width: 180,
        height: 38,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 20,

    },

    textButtonFilter: {
        color: "#fff",
        fontSize: 15,
        fontFamily: "Inter_500Medium",
    },
});

import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import logoImg from '../../assets/logo.png';
import style from './style';
import api from '../../services/api';

export default function Incidents(){
    const [incidents, setIncidents] = useState([]);
    const [total, setTotal] = useState(0);
    const navigation = useNavigation();

    function navigationDetail(){
        navigation.navigate('Detail');
    }

    async function loadIncidents(){
        const response = await api.get('incidents');
        try{
            setIncidents(response.data);
            setTotal(response.headers['X-Total-Count']);
        }catch(err){
           
        }
    }

    useEffect(() => {
        loadIncidents();
    }, []);

    return(
        <View style={style.container}>

            <View style={style.header}>
                <Image source={logoImg} />
                <Text style={style.headerText}>
                    Total de <Text style={style.headerTextBold}> {total} casos</Text>.
                </Text>
            </View>

                <Text style={style.title}> Bem-vindo! </Text>
                <Text style={style.description}> Escolha um dos casos abaixo e salve o dia. </Text>

            <FlatList
                data={incidents} 
                style={style.incidentList}
                keyExtractor={incident => String(incident.id)} 
                showsVerticalScrollIndicator={false} 
                renderItem={({ item : incident}) => (
                    <View style={style.incidentList}>
                        <View style={style.incident}>
                            <Text style={style.incidentProperty}> ONG: </Text>
                            <Text style={style.incidentValue}> {incident.name} </Text>

                            <Text style={style.incidentProperty}> CASO </Text>
                            <Text style={style.incidentValue}> {incident.title} </Text>

                            <Text style={style.incidentProperty}> Valor:  </Text>
                            <Text style={style.incidentValue}> {Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)} </Text>

                            <TouchableOpacity style={style.detailsButton} onPress={navigationDetail}>
                                <Text style={style.detailsButtonText}> Ver mais detalhes </Text>
                                <Feather name="arrow-right" size={16} color='#E02041'/>
                            </TouchableOpacity>
                        </View>
                    </View>
                )} 
            />
        </View>
    );
}
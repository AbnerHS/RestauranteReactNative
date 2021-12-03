import React, { useEffect, useRef, useState } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../home";
import Icon from 'react-native-vector-icons/Ionicons';
import Carrinho from '../carrinho';
import { BackHandler, DrawerLayoutAndroid, FlatList, Text, TouchableOpacity, View } from 'react-native';
import styles from '../home/style';
import AsyncStorage from '@react-native-async-storage/async-storage';
import url from '../utils/url';
import Historico from '../historico';

const Tab = createBottomTabNavigator();

export default function Tabs({navigation}) {

    //Desabilitar opção de voltar
    const backAction = () => {return true;};
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    }, []);

    const [nome, setNome] = useState(null);
    const listData = [
        {
            id: '0',
            title: nome,
            icon: 'person-circle-outline',
            func: () => {
                
            }
        },
        {
            id: '1',
            title: 'Entradas',
            icon: 'pizza-outline',
            func: () => {
                // ref.scrollTo({x:0, y: 0, animated: true});
            }
        },
        {
            id: '2',
            title: 'Pratos',
            icon: 'restaurant-outline',
            func: () => {
                // ref.scrollTo({x:0, y: 100, animated: true});
            }
        },
        {
            id: '3',
            title: 'Bebidas',
            icon: 'wine-outline',
            func: () => {
                // ref.scrollToEnd({animated: true});
            }
        },
        {
            id: '4',
            title: 'Sair',
            icon: 'log-out-outline',
            func: () => {
                logout();
            }
        }
    ]

    useEffect(() => {
        async function getNome(){
            let telefone = await AsyncStorage.getItem('telefone');
            let senha = await AsyncStorage.getItem('senha');
            const response = await fetch(input=url+"login",
                init={
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value={
                        telefone: telefone,
                        senha: senha,
                    })
                }
            );
            let json = await response.json();
            if(json == 'erro'){
                await AsyncStorage.removeItem('telefone');
                await AsyncStorage.removeItem('senha');
                navigation.popToTop();
            } else 
                setNome(json.nome);
        }
        getNome();
    },[navigation]);

    async function logout(){
        try{
            await AsyncStorage.removeItem("telefone");
            await AsyncStorage.removeItem("senha");
            await AsyncStorage.removeItem("carrinho");
            await AsyncStorage.removeItem("mesa");
            navigation.popToTop();
        } catch(e) {
            console.log(e);
        }
    }

    //Menu do sidebar
    const [selectedId, setSelectedId] = useState(null);
    const Item = ({ item, onPress, backgroundColor, textColor }) => (
        <TouchableOpacity onPress={onPress} style={[styles.item, backgroundColor]}>
            <View style={{flexDirection: 'row', justifyContent:'space-between', width: '100%'}}>
                <Icon name={item.icon} style={textColor} size={30}/>
                <Text style={[styles.itemTitle, textColor]}>{item.title}</Text>
            </View>
        </TouchableOpacity>
      );
    const renderList = ({item}) => {
        const backgroundColor = item.id === selectedId ? "#808080" : "none";
        const color = item.id === selectedId ? "#cccccc" : "black";
        return (
            <Item
                item={item}
                onPress={()=>{
                    setSelectedId(item.id)
                    item.func();
                }}
                backgroundColor={{backgroundColor}}
                textColor={{color}}
            />
        )
    }

    //Criar sidebar
    const drawer = useRef(null);
    const navigationView = (props) => (
        <View style={styles.sidebar}>
            <FlatList
                style={{width:'100%',paddingTop: 80}}
                data={listData}
                renderItem={renderList}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </View>
    );
    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={150}
            drawerBackgroundColor="#666666"
            renderNavigationView={navigationView}
        >
            <Tab.Navigator
                screenOptions={{
                    headerStyle: {
                        backgroundColor: '#ff6600',
                    },
                    headerTitleAlign: 'center',
                    headerLeft: () => (
                        <TouchableOpacity
                            style={{marginLeft: 15}}
                            onPress={()=>drawer.current.openDrawer()}>
                            <Icon name="menu-outline" size={30}/>
                        </TouchableOpacity>
                    ),
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#ff6600',
                    tabBarActiveBackgroundColor: '#222',
                    tabBarInactiveBackgroundColor: '#333',
                }}>
                <Tab.Screen
                    options={{
                        headerTitle: 'Cardápio',
                        tabBarIcon: ({color, size}) => (
                            <Icon name="list-outline" color={color} size={size} />
                        )
                    }}
                    name="HomeTab" 
                    component={Home}
                />
                <Tab.Screen
                    options={{
                        headerTitle: 'Carrinho',
                        tabBarIcon: ({color, size}) => (
                            <Icon name="cart-outline" color={color} size={size} />
                        )
                    }}
                    name="CarrinhoTab"
                    component={Carrinho}
                />
                <Tab.Screen
                    options={{
                        headerTitle: 'Histórico',
                        tabBarIcon: ({color, size}) => (
                            <Icon name="reader-outline" color={color} size={size} />
                        )
                    }}
                    name="HistoricoTab"
                    component={Historico}
                />
            </Tab.Navigator>
        </DrawerLayoutAndroid>
    )
}
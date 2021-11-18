import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useRef, useState } from "react";
import { DrawerLayoutAndroid, Text, TouchableOpacity, View, BackHandler, FlatList, Image, ScrollView, SafeAreaView, LogBox} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Linha from "../utils/linha.js";
import url from '../utils/url.js';
import styles from './style.js';

export default function Home({ navigation }){
    const [ref, setRef] = useState(null);
    const [nome, setNome] = useState(null);
    const [entradas, setEntradas] = useState(null);
    const [principais, setPrincipais] = useState(null);
    const [bebidas, setBebidas] = useState(null);
    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
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

        async function getProdutos(){
            const response = await fetch(input=url+'produtos');
            let json = await response.json();
            let entradas = json.filter(({categoria}) => categoria === 'Entrada');
            setEntradas(entradas);
            let principais = json.filter(({categoria}) => categoria === 'Principal');
            setPrincipais(principais);
            let bebidas = json.filter(({categoria}) => categoria === 'Bebida');
            setBebidas(bebidas);
        }
        getProdutos();
    },[]);
    
    const listData = [
        {
            id: '0',
            title: nome,
            icon: 'person-circle-outline',
            func: () => {
                // ref.scrollTo({x:0, y: 0, animated: true});
            }
        },
        {
            id: '1',
            title: 'Entradas',
            icon: 'pizza-outline',
            func: () => {
                ref.scrollTo({x:0, y: 0, animated: true});
            }
        },
        {
            id: '2',
            title: 'Pratos',
            icon: 'restaurant-outline',
            func: () => {
                ref.scrollTo({x:0, y: 100, animated: true});
            }
        },
        {
            id: '3',
            title: 'Bebidas',
            icon: 'wine-outline',
            func: () => {
                ref.scrollToEnd({animated: true});
            }
        },
        {
            id: '4',
            title: 'Carrinho',
            icon: 'cart-outline',
            func: () => {

            }
        },
        {
            id: '5',
            title: 'Sair',
            icon: 'log-out-outline',
            func: () => {
                logout();
            }
        }
    ]
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
    const Produto = ({ item }) => (
        <View style={{flexDirection:'row',backgroundColor: '#666', justifyContent:"space-between", width:'auto', padding: 10, margin: 5}}> 
            <Image style={{flex:1, borderRadius: 50}} source={{uri: `${item.imagem}`}}/> 
            <View style={{flex:3,alignItems:'flex-start',padding:15}}>
                <Text style={{fontSize:18}}>{item.nome}</Text>
                <Text style={{fontSize:16, color:'red'}}>R${item.valor}</Text>
            </View>
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity>
                    <Icon name="cart-outline" size={30}/>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderProdutos = ({ item }) => {
        return (
            <Produto
                item={item}
                style={{width: '100%'}}
            />
        )
    }

    async function logout(){
        try{
            await AsyncStorage.removeItem("telefone");
            await AsyncStorage.removeItem("senha");
            navigation.popToTop();
        } catch(e) {
            console.log(e);
        }
    }

    //Abrir sidebar
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity
                    onPress={()=>drawer.current.openDrawer()}>
                    <Icon name="menu-outline" size={30}/>
                </TouchableOpacity>
            ),
        });
    }, [navigation]);

    //Criar sidebar
    const drawer = useRef(null);
    const navigationView = (props) => (
        <View style={styles.sidebar}>
            <FlatList
                style={{width:'100%'}}
                data={listData}
                renderItem={renderList}
                keyExtractor={(item) => item.id}
                extraData={selectedId}
            />
        </View>
    );
    //Desabilitar opção de voltar
    const backAction = () => {return true;};
    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backAction);
    }, []);
        
    return (
        <DrawerLayoutAndroid
            ref={drawer}
            drawerWidth={150}
            drawerBackgroundColor="#666666"
            renderNavigationView={navigationView}
        >
            <ScrollView
                ref={(ref) => setRef(ref)}
                >
                <View style={styles.container}>
                    <Text style={styles.tituloSessao}>Entradas</Text>
                    <Linha/>
                    <FlatList
                        style={{width:'100%'}}
                        data={entradas}
                        renderItem={renderProdutos}
                        scrollEnabled={false}
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.tituloSessao}>Pratos Principais</Text>
                    <Linha/>
                    <FlatList
                        style={{width:'100%'}}
                        data={principais}
                        renderItem={renderProdutos}
                        scrollEnabled={false}
                    />
                </View>
                <View style={styles.container}>
                    <Text style={styles.tituloSessao}>Bebidas</Text>
                    <Linha/>
                    <FlatList
                        style={{width:'100%'}}
                        data={bebidas}
                        renderItem={renderProdutos}
                        scrollEnabled={false}
                    />
                </View>
            </ScrollView>
        </DrawerLayoutAndroid>
    );
}
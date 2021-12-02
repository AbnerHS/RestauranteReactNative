import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import Dialog from 'react-native-dialog';
import Icon from "react-native-vector-icons/Ionicons";

import url from "../utils/url";
import styles from "./style";

export default function Carrinho({navigation}){
    const [carrinho, setCarrinho] = useState([]);
    const [visible, setVisible] = useState(false);
    const [total, setTotal] = useState(0);
    const [mesa, setMesa] = useState(null);
    const [items, setItems] = useState([]);

    async function getCarrinho(){
        try{
            let items = await AsyncStorage.getItem("carrinho");
            items = JSON.parse(items);
            setItems(items);
            let response = await fetch(input=url+"carrinho",
                init={
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value={
                        items: items
                    })
                }
            );
            let json = await response.json();
            setCarrinho(json);
        } catch(e) {
            console.log(e);
        }   
    }

    async function removerCarrinho(index){
        try{
            let items = await AsyncStorage.getItem("carrinho");
            items = JSON.parse(items);
            items = items.filter(function(itemId, i){ 
                return i != index; 
            });
            await AsyncStorage.setItem("carrinho", JSON.stringify(items));
            getCarrinho();
        } catch (e){
            console.log(e);
        }
    }

    async function enviarPedido(){
        try {
            let id = await AsyncStorage.getItem("id");
            let response = await fetch(input=url+"enviarPedido",
                init={
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value={
                        mesa: mesa,
                        items: items,
                        id: id,
                    })
                }
            );
            let json = await response.json();
            if(json == 'ok'){
                await AsyncStorage.removeItem("carrinho");
                setCarrinho([]);
                getCarrinho();
                setVisible(false);
            }
        } catch (e){
            console.log(e);
        }
    }

    async function getMesa(){
        let mesa = await AsyncStorage.getItem("mesa");
        setMesa(mesa);
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            getCarrinho();
            getMesa();
        });
    },[navigation]);


    const Produto = ({ item, index}) => (
        <View style={styles.viewProduto}> 
            <Image style={styles.imagemProduto} source={{uri: `${item.imagem}`}}/> 
            <View style={styles.textoProduto}>
                <Text style={styles.nomeProduto}>{item.nome}</Text>
                <Text style={styles.valorProduto}>R${item.valor},00</Text>
            </View>
            <View style={styles.iconeProduto}>
                <TouchableOpacity
                    onPress={()=>removerCarrinho(index)}
                >
                    <Icon name="close-outline" size={30} color='white'/>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderCarrinho = ({ item }) => {
        return (
            <Produto
                item={item.item}
                index={item.index}
                style={{width: '100%'}}
            />
        );
    }

    return (
        <View style={styles.container}>
            {carrinho.length == 0 &&
            <View style={{height:'100%', justifyContent: 'center'}}>
                <Text style={[styles.nomeProduto,{alignSelf: 'center'}]}>Nenhum item no carrinho!</Text>
            </View>
            }
            <FlatList
                style={{width: '100%'}}
                data={carrinho}
                renderItem={renderCarrinho}
                keyExtractor={(item) => item.index}
            />
            <View>
                {carrinho.length > 0 && 
                    <View>
                        <TouchableOpacity
                            style={styles.botaoFinalizarPedido}
                            onPress={()=>{
                                setVisible(true)
                                var valorTotal = 0;
                                carrinho.forEach((item) => {
                                    valorTotal += item.item.valor;
                                })
                                setTotal(valorTotal);
                            }}
                        >
                            <Text style={styles.textoBotaoFinalizar}>Enviar Pedido</Text>
                            <Icon name="checkmark-outline" size={20} style={{alignSelf: 'flex-end'}}/>
                        </TouchableOpacity>
                    </View>
                }
            </View>
            <Dialog.Container visible={visible}>
                <Dialog.Title>Deseja enviar o pedido?</Dialog.Title>
                <Dialog.Description>
                    Mesa: {mesa}    -   Valor Total: <Text style={{color: '#ff6600', fontWeight: 'bold'}}> R${total},00 </Text>
                </Dialog.Description>
                <Dialog.Button label="Cancelar" color="#ff6600" onPress={()=>{setVisible(false)}}></Dialog.Button>
                <Dialog.Button label="Sim" color="green" onPress={()=>{enviarPedido()}}></Dialog.Button>
            </Dialog.Container>
        </View>
    )
}
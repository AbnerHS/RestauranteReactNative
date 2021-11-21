import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, FlatList, Image, ScrollView, LogBox, Modal, TextInput} from "react-native";
import Dialog from "react-native-dialog";
import Linha from "../utils/linha";
import url from '../utils/url';
import styles from './style';

export default function Home({ navigation }){
    const [entradas, setEntradas] = useState(null);
    const [principais, setPrincipais] = useState(null);
    const [bebidas, setBebidas] = useState(null);
    const [visible, setVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [numMesa, setNumMesa] = useState(null);
    const [mesa, setMesa] = useState(null);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        
        getMesa();

        getProdutos();
    },[navigation]);

    async function getMesa(){
        let mesa = await AsyncStorage.getItem("mesa");
        if(!mesa)
            setModalVisible(true);
        else
            setNumMesa(mesa);
    }

    async function definirMesa(){
        try {
            await AsyncStorage.setItem("mesa", mesa);
            setModalVisible(false);
            setNumMesa(mesa);
        } catch (e) {
            console.log(e);
        }
    }

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

    async function adicionarCarrinho(id){
        try {
            let carrinho = await AsyncStorage.getItem("carrinho");
            if(carrinho)
                carrinho = JSON.parse(carrinho);
            else
                carrinho = []
            carrinho.push(id);
            await AsyncStorage.setItem("carrinho",JSON.stringify(carrinho));
        } catch(e){
            console.log(e);
        }
    }

    const Produto = ({ item }) => (
        <View style={styles.viewProduto}> 
            <Image style={styles.imagemProduto} source={{uri: `${item.imagem}`}}/> 
            <View style={styles.textoProduto}>
                <Text style={styles.nomeProduto}>{item.nome}</Text>
            </View>
            <View style={styles.iconeProduto}>
                <TouchableOpacity
                    style={styles.botaoValorProduto}
                    onPress={()=>{
                        adicionarCarrinho(item.id);
                        setVisible(true);
                        setTimeout(() => {
                            setVisible(false);
                        }, 800);
                    }}    
                >
                    <Text style={styles.valorProduto}>R${item.valor},00</Text>
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
        );
    }
        
    return (
        <ScrollView style={{backgroundColor: '262626'}}>
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
            <Dialog.Container visible={visible}>
                <Dialog.Title>Adicionado ao Carrinho!</Dialog.Title>
            </Dialog.Container>
            {!numMesa && 
            <View style={styles.centeredView}>
                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="fade"
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.textoModal}>Número da Mesa:</Text>
                            <TextInput
                                onChangeText={setMesa}
                                style={styles.inputMesa}
                                placeholder="Exemplo: 1"
                                keyboardType="number-pad"    
                            />
                            <TouchableOpacity style={styles.botaoModal}
                                onPress={()=>definirMesa()}
                            >
                                <Text style={styles.textoBotaoModal}>Salvar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
            }
        </ScrollView>
    );
}
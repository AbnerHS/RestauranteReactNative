import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View, FlatList, Image} from "react-native";
import url from '../utils/url';
import styles from './style';
import io from 'socket.io-client';

const socket = io(url);

export default function Historico({ navigation }){

    const [pedidos, setPedidos] = useState(null);
    const [produtos, setProdutos] = useState([]);
    const [index, setIndex] = useState(0);

    async function getPedidos(){
        try {
            let id = await AsyncStorage.getItem("id");
            let response = await fetch(input=url+"pedidos",
                init={
                    method: "POST",
                    headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(value={
                        id: id,
                    })
                }
            );
            let json = await response.json();
            setPedidos(json);
        } catch(e) {
            console.log(e);
        }
    }

    async function getProdutos(id){
        let response = await fetch(input=url+"produtosPedido",
            init={
                method: "POST",
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(value={
                    id: id,
                })
            }
        );
        let json = await response.json();
        setProdutos(json);
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            getPedidos();
        });
        socket.on('novoStatus', getPedidos);
        return () => socket.off('novoStatus');
    },[]);

    const Produto = ({ item }) => (
        item = item[0],
        <View style={styles.viewProduto}> 
            <Image style={styles.imagemProduto} source={{uri: `${item.imagem}`}}/> 
            <View style={styles.textoProduto}>
                <Text style={styles.nomeProduto}>{item.nome}</Text>
                <Text style={styles.valorProduto}>R${item.valor},00</Text>
            </View>
        </View>
    );

    const renderProdutos = ({ item }) => {
        return (
            <Produto
                item={item.item}
                style={{width: '100%'}}
            />
        );
    }
    
    function tempo (item){
        let saida, min, hora, dia, mes;
        min = parseInt(Math.abs(new Date()-new Date(item.createdAt))/(1000*60));
        saida = min+" minuto(s)";
        if(min > 59){
            hora = parseInt(min/60);
            saida = hora+" hora(s)";
        }
        if(hora > 23){
            dia = parseInt(hora/24);
            saida = dia+" dia(s)";
        }
        if(dia > 30){
            mes = parseInt(dia/30);
            saida = mes+" mês(es)";
        }
        return saida;
    }

    function status(item){
        if(item.status == 0)
            return 'Pendente';
        else if(item.status == 1)
            return 'Em preparação';
        else if(item.status == 2)
            return 'Finalizado';
    }

    let t,s;
    
    const Pedido = ({ item }) => (
        t = tempo(item),
        s = status(item),
        <View style={styles.viewPedido}>
            <TouchableOpacity
                onPress={()=>{
                    if(item.id != index){
                        setProdutos([]);
                        getProdutos(item.id);    
                        setIndex(item.id);
                    } else {
                        setIndex(0);
                    }
                }}
            > 
            <View style={styles.containerPedido}>
                <Text style={styles.textoPedido}>{t}</Text>
                <Text style={styles.textoPedido}>Mesa: {item.mesa}</Text>
                <Text style={styles.textoPedido}>{s}</Text>
            </View>
            {produtos.length > 0 && index == item.id &&
                <FlatList
                    data={produtos}
                    renderItem={renderProdutos}
                    keyExtractor={(item)=>item.index}
                />
            }
            </TouchableOpacity>
        </View>
    );
    
    const renderPedidos = ({ item }) => {
        return (
            <Pedido
                item={item}
                style={{width: '100%'}}
            />
        );
    }

    return (
        <View style={styles.container}>
            {pedidos && pedidos.length == 0 &&
            <View style={{height:'100%', justifyContent: 'center'}}>
                <Text style={[styles.nomeProduto,{alignSelf: 'center'}]}>Você ainda não fez nenhum pedido!</Text>
            </View>
            }
            <FlatList
                style={{width:'100%'}}
                data={pedidos}
                renderItem={renderPedidos}
            />
        </View>
    );
}
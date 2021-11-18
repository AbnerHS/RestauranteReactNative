import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './style.js';
import url from '../../utils/url.js';
export default function Login({ navigation }){

    const [telefone, setTelefone] = useState(null);
    const [senha, setSenha] = useState(null);
    const [mensagem, setMensagem] = useState(null);

    async function acessar(){
        if(telefone != null && senha != null){
            if(telefone.length > 0 && senha.length > 0){
                let response = await fetch(input=url+"login",
                    init = {
                        method: "POST",
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(value={
                            telefone: telefone,
                            senha: senha
                        })
                    }
                );
                let json = await response.json();
                if(json == 'erro'){
                    setMensagem('Telefone ou senha inválido(s)!');
                } else {
                    setMensagem(null);
                    try{
                        await AsyncStorage.setItem("telefone", json.telefone);
                        await AsyncStorage.setItem("senha", json.senha);
                        navigation.navigate("Home");
                    } catch(e){
                        console.log(e);
                    }
                }
            } else {
                setMensagem('Preencha o Telefone e a Senha!');    
            }
        } else {
            setMensagem('Preencha o Telefone e a Senha!');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Seja bem vindo!</Text>
            <Text style={[{display: mensagem ? 'flex':'none'},styles.mensagem]}>{mensagem}</Text>
            <Text style={styles.label}>Telefone:</Text>
            <TextInput
                style={styles.textInput}
                keyboardType='phone-pad'
                onChangeText={setTelefone}
            />
            <Text style={styles.label}>Senha:</Text>
            <TextInput
                style={styles.textInput}
                secureTextEntry={true}
                onChangeText={setSenha}
            />
            <TouchableOpacity
                style={styles.botao}
                onPress={()=>acessar()}>
                <Text style={styles.textoBotao}>Acessar</Text>    
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => navigation.navigate("Cadastro")}>
                <Text style={{color: '#ffe0cc'}}>
                    Ainda não tem conta? Cadastre-se
                </Text>
            </TouchableOpacity>
        </View>
    );
}
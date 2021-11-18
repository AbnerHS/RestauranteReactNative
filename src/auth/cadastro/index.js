import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View} from "react-native";
import url from '../../utils/url.js';
import styles from './style.js';

export default function Cadastro({ navigation }){
    const [nome, setNome] = useState(null);
    const [telefone, setTelefone] = useState(null);
    const [senha, setSenha] = useState(null);
    const [mensagem, setMensagem] = useState(null);

    async function cadastrar(){
        if(nome != null && telefone != null && senha != null){
            if(nome.length > 0 && telefone.length > 0 && senha.length > 0){
                setMensagem(null);
                let response = await fetch(input=url+"cadastro",
                    init = {
                        method: "POST",
                        headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(value={
                            nome: nome,
                            telefone: telefone,
                            senha: senha
                        })
                    }
                );
                let json = await response.json();
                if(json == 'ok'){
                    setMensagem(null);
                    try {
                        await AsyncStorage.setItem('telefone', telefone)
                        await AsyncStorage.setItem('senha', senha);
                        navigation.navigate("Home");
                    } catch(e){
                        console.log(e);
                    }
                }
            } else {
                setMensagem('Preencha todos os campos!');    
            }
        } else {
            setMensagem('Preencha todos os campos!');
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.titulo}>Seja bem vindo!</Text>
            <Text style={[{display: mensagem ? 'flex':'none'},styles.mensagem]}>{mensagem}</Text>
            <Text style={styles.label}>Nome:</Text>
            <TextInput
                style={styles.textInput}
                onChangeText={setNome}
            />
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
                onPress={()=>cadastrar()}>
                <Text style={styles.textoBotao}>Cadastrar</Text>    
            </TouchableOpacity>
        </View>
    );
}
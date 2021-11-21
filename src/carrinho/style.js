import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#262626',
      padding: 10,
    },
    viewProduto: {
      flexDirection:'row',
      backgroundColor: '#111',
      justifyContent:"space-between",
      width:'auto',
      padding: 10,
      height: 100,
      margin: 5,
    },
    textoProduto: {
      flex:2,
      alignItems:'flex-start',
      justifyContent: 'center',
      padding:15,
    },
    imagemProduto: {
      flex: 1,
      borderRadius: 50,
    },
    nomeProduto: {
      fontSize: 15, 
      color: 'white'
    },
    iconeProduto: {
      flex:1,
      alignItems:'flex-end',
      justifyContent:'center',
    },
    botaoValorProduto: {
      backgroundColor: '#ff6600',
      borderRadius: 20,
      padding: 15,
      width: '100%',
      alignItems: 'center',
    },
    valorProduto: {
      fontSize: 12,
      color: 'white',
      fontWeight: 'bold'
    },
    botaoFinalizarPedido: {
      width: '100%',
      backgroundColor: '#ff6600',
      borderRadius: 20,
      padding: 15,
      alignItems: 'center',
      flexDirection: 'row',
      
    },
    textoBotaoFinalizar: {
      color: 'black',
      fontSize: 16,
      flex: 3,
      textAlign: "center"
    }
});

export default styles;
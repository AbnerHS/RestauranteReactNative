import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#262626',
      padding: 10,
    },
    centeredView: {
      flex: 1,
      backgroundColor: '#262626',
      justifyContent: "center",
      alignItems: "center",
      marginTop: 55
    },
    modalView: {
      width:'80%',
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 50,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    textoModal: {
      fontSize: 15,
      marginBottom: 15,
    },
    inputMesa:{
      width:'100%',
      borderRadius: 20,
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
      marginBottom: 15,
      fontSize: 15,
      textAlign: 'center'
    },
    botaoModal: {
      width: '100%',
      backgroundColor: '#ff6600',
      alignItems: 'center',
      padding: 10,
      borderRadius: 20,
    },
    textoBotaoModal: {
      fontSize: 20,
      color: 'black'
    },
    header: {
      width:'100%',
      height: 80,
      backgroundColor: '#ff6600',
      padding: 10,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    sidebar: {
      flex: 1,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    item: {
      padding: 10,
      width: '100%'
    },
    itemTitle: {
      fontSize: 20,
      textAlign: "right",
    },
    tituloSessao: {
      color: '#cccccc',
      fontSize: 24,
      margin: 5,
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
      alignItems:'center',
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
});

export default styles;
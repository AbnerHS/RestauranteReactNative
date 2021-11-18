import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      backgroundColor: '#262626',
      padding: 10,
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
    }
});

export default styles;
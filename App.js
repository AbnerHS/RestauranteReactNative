import React, { useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, TouchableOpacity } from 'react-native';
import LoginAuto from './src/auth/login/auto';
import Login from './src/auth/login';
import Cadastro from './src/auth/cadastro';
import Home from './src/home';
import Icon from 'react-native-vector-icons/Ionicons';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: '#ff6600',
          },
          headerTitleAlign: 'center',
        }}
        >
        <Stack.Screen
          name="LoginAuto"
          component={LoginAuto}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="Cadastro"
          component={Cadastro}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Restaurante',
            headerBackVisible: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

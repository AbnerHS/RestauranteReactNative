import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginAuto from './src/auth/login/auto';
import Login from './src/auth/login';
import Cadastro from './src/auth/cadastro';
import Home from './src/home';
import Tabs from './src/tabs';

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
          options={{headerShown: false}}
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
          component={Tabs}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Screens/HomeScreens';
import DetailsScreen from './Screens/WeatherCard';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#0F51A4' }, headerTintColor: '#fff' }}>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Previsão do Tempo' }} />
        <Stack.Screen name="Details" component={DetailsScreen} options={{ title: 'Detalhes da Previsão' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;


//NOME: Arthur Romani Inacio de Souza 
//TURMA: CC4N
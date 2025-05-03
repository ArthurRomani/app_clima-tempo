import React from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView } from 'react-native';

//NOME: Arthur Romani Inacio de Souza 
//TURMA: CC4N

const DetailsScreen = ({ route }) => {
  const { location } = route.params;

  const forecast = [
    { day: 'Segunda-feira', min: 20, max: 28, weather: 'Ensolarado' },
    { day: 'Terça-feira', min: 18, max: 25, weather: 'Nublado' },
    { day: 'Quarta-feira', min: 22, max: 30, weather: 'Chuva Leve' },
    { day: 'Quinta-feira', min: 19, max: 26, weather: 'Chuva Forte' },
    { day: 'Sexta-feira', min: 21, max: 29, weather: 'Ensolarado' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Previsão Detalhada para {location.name}</Text>
      <FlatList
        data={forecast}
        renderItem={({ item }) => (
          <View style={styles.detailCard}>
            <Text style={styles.detailText}>{item.day}</Text>
            <Text style={styles.detailText}>
              {item.min}°C - {item.max}°C
            </Text>
            <Text style={styles.detailText}>{item.weather}</Text>
          </View>
        )}
        keyExtractor={(item) => item.day}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#BDD6E0',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#0F51A4',
    textAlign: 'center',
  },
  detailCard: {
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
  },
  detailText: {
    fontSize: 18,
    color: '#333',
    textAlign: 'center',
    marginVertical: 5,
  },
});

export default DetailsScreen;

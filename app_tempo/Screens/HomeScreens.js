import React, { useState } from 'react';
import { View, Text, FlatList, Button, StyleSheet, TouchableOpacity, Image, ScrollView, TextInput, Modal } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Importando o Picker

const HomeScreen = ({ navigation }) => {
  const [locations, setLocations] = useState([
    { id: '1', name: 'Vila Velha', state: 'ES', temp: 28, weather: 'Ensolarado' },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [newCity, setNewCity] = useState({
    name: '',
    state: '',
    temp: '',
    weather: 'Ensolarado', // valor padrão para clima
  });

  const weatherIcons = {
    Ensolarado: require('../assets/ensolarado.jpg'),
    Nublado: require('../assets/nublado.jpg'),
    Chuva_Leve: require('../assets/chuvaLeve.jpg'),
    Chuva_Forte: require('../assets/chuvaForte.jpg'),
  };

  const addLocation = () => {
    if (newCity.name && newCity.state && newCity.temp) {
      const newLocation = {
        id: (locations.length + 1).toString(),
        name: newCity.name,
        state: newCity.state,
        temp: newCity.temp,
        weather: newCity.weather,
      };

      setLocations([...locations, newLocation]);
      setModalVisible(false); // Fechar o modal
      setNewCity({ name: '', state: '', temp: '', weather: 'Ensolarado' }); // Resetar o formulário
    } else {
      alert('Preencha todos os campos!');
    }
  };

  const removeLocation = (id) => {
    setLocations(locations.filter((location) => location.id !== id));
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Previsão do Tempo</Text>
      <FlatList
        data={locations}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity
              style={styles.cardContent}
              onPress={() => navigation.navigate('Details', { location: item })}
            >
              <Image 
                source={weatherIcons[item.weather]} 
                style={styles.cardImage} 
                onError={() => console.log('Erro ao carregar a imagem do clima')} 
              />
              <View>
                <Text style={styles.cardText}>
                  {item.name}, {item.state}
                </Text>
                <Text style={styles.cardText}>
                  {item.temp}°C - {item.weather}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => removeLocation(item.id)} 
            >
              <Text style={styles.deleteText}>Excluir</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={(item) => item.id}
      />
      <Button title="Adicionar Município" onPress={() => setModalVisible(true)} />

      {/* Modal to Add Location */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Adicionar Nova Cidade</Text>
            <TextInput
              style={styles.input}
              placeholder="Nome da cidade"
              value={newCity.name}
              onChangeText={(text) => setNewCity({ ...newCity, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Estado"
              value={newCity.state}
              onChangeText={(text) => setNewCity({ ...newCity, state: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Temperatura (°C)"
              keyboardType="numeric"
              value={newCity.temp}
              onChangeText={(text) => setNewCity({ ...newCity, temp: text })}
            />

            {/* Picker para selecionar o clima */}
            <Picker
              selectedValue={newCity.weather}
              style={styles.input}
              onValueChange={(itemValue) => setNewCity({ ...newCity, weather: itemValue })}
            >
              <Picker.Item label="Ensolarado" value="Ensolarado" />
              <Picker.Item label="Nublado" value="Nublado" />
              <Picker.Item label="Chuva Leve" value="Chuva_Leve" />
              <Picker.Item label="Chuva Forte" value="Chuva_Forte" />
            </Picker>

            <View style={styles.modalButtons}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Adicionar" onPress={addLocation} />
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    justifyContent: 'space-between',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  cardText: {
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#ff4d4d',
    padding: 5,
    borderRadius: 5,
  },
  deleteText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});

export default HomeScreen;

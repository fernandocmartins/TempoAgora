import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);

  const API_KEY = 'dcbc1cb8515aacf24032486e42097d8d';
  const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  const fetchWeather = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    setWeather(data.main);
  };

  const clearInput = () => {
    setCity('');
    setWeather(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Previsão do tempo</Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={(text) => setCity(text)}
        placeholder="Digite o nome da cidade"
      />
      
      <TouchableOpacity style={styles.button} onPress={fetchWeather}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.clearButton} onPress={clearInput}>
        <Text style={styles.buttonText}>Limpar</Text>
      </TouchableOpacity>
      
      {weather && (
        <View style={styles.weather}>
          <Text style={styles.weatherText}>{weather.temp}°C</Text>
          <Text style={styles.weatherText}>{weather.humidity}% de umidade</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  clearButton: {
    marginTop: 10,
    backgroundColor: '#aaa',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
  },
  weather: {
    marginTop: 24,
    alignItems: 'center',
  },
  weatherText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

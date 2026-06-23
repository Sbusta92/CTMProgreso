import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

import { API_URL } from "../config/config";



const baseDivisiones = [
  { division: 'Primera', color: '#FFD700' },
  { division: 'Segunda', color: '#C0C0C0' },
  { division: 'Tercera', color: '#A52A2A' },
  { division: 'Cuarta', color: '#800080' },
  { division: 'Quinta', color: '#696969' },
];

const Historial = () => {
  const [historial, setHistorial] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const cargarHistorial = async () => {
      try {
        const nombre = await AsyncStorage.getItem('nombre');
        const response = await fetch(`${API_URL}/CTMProgreso/v3/HistorialLigas/${nombre}`);
        const data = await response.json();

        const resultadoFinal = baseDivisiones.map(base => {
          const encontrado = data.find(d => d.division === base.division);
          return {
            division: base.division,
            color: base.color,
            victorias: encontrado ? encontrado.victorias : 0,
          };
        });

        setHistorial(resultadoFinal);
      } catch (error) {
        console.error('Error al cargar historial:', error);
      } finally {
        setLoading(false);
      }
    };

    cargarHistorial();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Historial</Text>
      <FlatList
        data={historial}
        keyExtractor={(item) => item.division}
        renderItem={({ item }) => (
          <View style={[styles.item, { backgroundColor: item.color }]}>
            <Text style={styles.itemText}>
              {item.division} - Ganado {item.victorias} {item.victorias === 1 ? 'vez' : 'veces'}
            </Text>
          </View>
        )}
      />
      <TouchableOpacity style={styles.boton} onPress={() => navigation.navigate('Acciones')}>
        <Text style={styles.botonTexto}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF69B4',
    padding: 20,
  },
  titulo: {
    fontSize: 30,
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  item: {
    padding: 20,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  itemText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  boton: {
    backgroundColor: '#6495ED',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  botonTexto: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Historial;

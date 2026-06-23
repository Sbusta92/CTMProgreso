import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Acciones = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const obtenerNombre = async () => {
      const nombreGuardado = await AsyncStorage.getItem('nombre');
      if (nombreGuardado) setUsername(nombreGuardado);
    };
    obtenerNombre();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🏓</Text>


        <Text style={styles.welcomeText}>Bienvenido, {username}</Text>
        <Text style={styles.subtitulo}>¡Prepárate para competir y subir de división! 💪</Text>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Perfil')}>
          <Text style={styles.menuItemText}>➡️ Perfil</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Historial')}>
          <Text style={styles.menuItemText}>➡️ Historial</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Divisiones')}>
          <Text style={styles.menuItemText}>➡️ Divisiones</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF69B4',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  content: {
    marginTop: 80,
    width: '100%',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 60,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    backgroundColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 35,
    borderRadius: 12,
    marginBottom: 10,
  },
  subtitulo: {
    fontSize: 16,
    color: '#fff',
    fontStyle: 'italic',
    marginBottom: 40,
    textAlign: 'center',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#87CEFA',
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 12,
    marginBottom: 25,
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  menuItemText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});

export default Acciones;

import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../config/config";

function Pantalla_Inicio({ navigation }) {
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const postOptions = {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      nombre: nombre,
      password: password
    })
  };

  const postUsuario = async () => {
    try {
      const response = await fetch(`${API_URL}/CTMProgreso/v1/Usuario`, postOptions);
      if (response.ok) {
        const data = await response.json();
        console.log("✅ Usuario creado:", data);
        Alert.alert("Usuario registrado correctamente");
      } else {
        const texto = await response.text();
        console.warn("⚠️ Error al registrar usuario:", response.status, texto);
        Alert.alert("Error", `No se pudo registrar el usuario\nCódigo: ${response.status}\n${texto}`);
      }
    } catch (error) {
      console.error("❌ Error en postUsuario:", error);
      Alert.alert("Error", "Error de red o servidor");
    }
  };

  const checkUsuario = async () => {
    try {
      const response = await fetch(`${API_URL}/CTMProgreso/v1/Usuario/${nombre}/${password}`);
      if (response.status === 200) {
        const data = await response.json();
        const id = data[0].id_usuario;
        const admin = data[0].admin; // Si tienes un campo admin en BD

        await AsyncStorage.setItem('nombre', nombre);
        await AsyncStorage.setItem('id', id.toString());
        await AsyncStorage.setItem('admin', admin.toString()); // Opcional

        setError(false);
        navigation.navigate("Acciones");
      } else {
        console.log("Usuario no existe");
        setError(true);
      }
    } catch (error) {
      console.log("❌ Error en checkUsuario:", error);
      setError(true);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/ctm.png')}
          style={styles.image}
        />
      </View>
      <Text style={styles.title}>CTM Progreso</Text>
      <View style={styles.spacer} />

      <Text style={styles.label}>Usuario:</Text>
      <TextInput style={styles.input} placeholder="Escriba aquí" value={nombre} onChangeText={setNombre} />
      <Text style={styles.label}>Password:</Text>
      <TextInput style={styles.input} placeholder="Escriba aquí" secureTextEntry value={password} onChangeText={setPassword} />

      {error && (<View><Text style={{ color: 'white' }}>Contraseña incorrecta</Text></View>)}

      <TouchableOpacity style={styles.button} onPress={checkUsuario}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonMargin]} onPress={postUsuario}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>

      <View style={styles.bottomSpacer} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FF1493',
  },
  imageContainer: {
    alignItems: 'flex-end',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 54,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  spacer: {
    flex: 1,
  },
  label: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  input: {
    height: 40,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#FFFFFF',
  },
  button: {
    backgroundColor: '#FFFFFF',
    padding: 10,
    alignItems: 'center',
    marginBottom: 20,
    marginTop: 70
  },
  buttonText: {
    color: '#FF1493',
  },
  buttonMargin: {
    marginTop: 10,
  },
  bottomSpacer: {
    flex: 1,
  },
});

export default Pantalla_Inicio;

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Button, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../config/config";




const Perfil = ({ navigation }) => {
    const [image, setImage] = useState(null);
    const [edadSeleccionada, setEdadSeleccionada] = useState(null);
    const [palaSeleccionada, setPalaSeleccionada] = useState(null);

    // Cargar perfil guardado al abrir
    useEffect(() => {
        const cargarPerfil = async () => {
            try {
                const perfilGuardado = await AsyncStorage.getItem('perfilJugador');
                if (perfilGuardado !== null) {
                    const perfil = JSON.parse(perfilGuardado);
                    setEdadSeleccionada(perfil.edad);
                    setPalaSeleccionada(perfil.tipoPala);
                    setImage(perfil.imagen);
                }
            } catch (error) {
                console.log('Error al cargar el perfil', error);
            }
        };

        cargarPerfil();
    }, []);

    // Seleccionar imagen
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    // Guardar perfil localmente
    const guardarPerfil = async () => {
        try {
            const nombreUsuario = await AsyncStorage.getItem('nombre'); // ya lo guardas al iniciar sesión
            const perfil = {
                edad: edadSeleccionada,
                tipoPala: palaSeleccionada,
                imagen: image,
            };
            await AsyncStorage.setItem(`perfil_${nombreUsuario}`, JSON.stringify(perfil));
            Alert.alert('Éxito', 'Perfil guardado con éxito');
        } catch (error) {
            console.log('Error al guardar perfil', error);
            Alert.alert('Error', 'No se pudo guardar el perfil');
        }
    };


    return (
        <View style={styles.container}>
            <Text style={styles.header}>Perfil</Text>

            <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
                {image ? (
                    <Image source={{ uri: image }} style={styles.image} />
                ) : (
                    <Text style={styles.imageText}>Inserte foto</Text>
                )}
            </TouchableOpacity>

            <Text style={styles.label}>Edad:</Text>
            <View style={styles.optionsContainer}>
                {["<15", "15-60", ">60"].map((edad) => (
                    <TouchableOpacity
                        key={edad}
                        onPress={() => setEdadSeleccionada(edad)}
                        style={[
                            styles.optionButton,
                            edadSeleccionada === edad && styles.optionSelected,
                        ]}
                    >
                        <Text style={styles.optionText}>{edad}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Tipo de pala:</Text>
            <View style={styles.optionsContainer}>
                {["Lisa/Lisa", "Lisa/picos"].map((pala) => (
                    <TouchableOpacity
                        key={pala}
                        onPress={() => setPalaSeleccionada(pala)}
                        style={[
                            styles.optionButton,
                            palaSeleccionada === pala && styles.optionSelected,
                        ]}
                    >
                        <Text style={styles.optionText}>{pala}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Button title="Guardar Perfil" onPress={guardarPerfil} />
            <View style={{ height: 10 }} />
            <Button title="Volver" onPress={() => navigation.navigate('Pantalla_Inicio')} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFC0CB',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    imagePlaceholder: {
        width: 150,
        height: 150,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 75,
        marginBottom: 20,
        alignSelf: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 75,
    },
    imageText: {
        color: '#808080',
    },
    label: {
        fontSize: 18,
        marginBottom: 5,
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    optionButton: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 5,
        backgroundColor: '#fff',
    },
    optionSelected: {
        backgroundColor: '#ff69b4',
        borderColor: '#ff1493',
    },
    optionText: {
        fontSize: 16,
        color: '#000',
    },
});

export default Perfil;

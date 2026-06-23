// src/components/Usuario.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from 'react-native';
import {fetch} from "expo/fetch";

async function getUsuario() {
    fetch("http://192.168.1.34:8080/CTMProgreso/v2/Usuario")
        .then((resp) => resp.json())
        .then((json) => setData(json))
        .catch((error) => console.error(error))
        .finally(() => setLoading(false));
}

function Usuario  ()  {
    const [Usuario, setUsuario] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsuario = async () => {
            try {
                const data = await getUsuario();
                setUsuario(data);
                setLoading(false);
            } catch (error) {
                console.error('Error al introducir usuario', error);
                setLoading(false);
            }
        };

        fetchUsuario();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Usuario</Text>
            <FlatList
                data={Usuario}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>id_usuario {item.id_usuario}</Text>
                        <Text>nombre {item.nombre}</Text>
                        <Text>password {item.password}</Text>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    item: {
        marginBottom: 15,
    },
});

export default Usuario;
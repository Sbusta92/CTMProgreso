import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

const ParticipantScreen = () => {
    const [participants, setParticipants] = useState(Array(20).fill(''));

    const handleAddParticipant = (index, name) => {
        const newParticipants = [...participants];
        newParticipants[index] = name;
        setParticipants(newParticipants);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Participantes</Text>
            <ScrollView>
                {participants.map((participant, index) => (
                    <TextInput
                        key={index}
                        style={styles.input}
                        placeholder={`Nombre ${index + 1}`}
                        value={participant}
                        onChangeText={(text) => handleAddParticipant(index, text)}
                    />
                ))}
            </ScrollView>
            <View style={styles.buttonContainer}>
                <Button title="Añadir" onPress={() => console.log('Añadir participante')} />
                <Button title="Volver" onPress={() => console.log('Volver')} />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FF69B4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#FFF',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#FFF',
        padding: 10,
        marginBottom: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});

export default ParticipantScreen;


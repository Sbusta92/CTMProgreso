import React from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';

const DetalleDivision = ({ route, navigation }) => {
    const { divisionName } = route.params;

    // Datos de ejemplo para los partidos de la división
    const matches = [
        { id: '1', teams: 'Usuario 1 vs Usuario 2', score: '2-1' },
        { id: '2', teams: 'Usuario 1 vs Usuario 2', score: '1-2' },
        { id: '3', teams: 'Usuario 1 vs Usuario 3', score: '2-1' },
        { id: '4', teams: 'Usuario 1 vs Usuario 3', score: '1-2' },
        { id: '5', teams: 'Usuario 1 vs Usuario 4', score: '2-1' },
        { id: '6', teams: 'Usuario 1 vs Usuario 4', score: '1-2' },
        { id: '7', teams: 'Usuario 2 vs Usuario 3', score: '2-1' },
        { id: '8', teams: 'Usuario 2 vs Usuario 3', score: '1-2' },
        { id: '9', teams: 'Usuario 2 vs Usuario 4', score: '2-1' },
        { id: '10', teams: 'Usuario 2 vs Usuario 4', score: '1-2' },
        { id: '11', teams: 'Usuario 3 vs Usuario 4', score: '2-1' },
        { id: '12', teams: 'Usuario 3 vs Usuario 4', score: '1-2' },


        // Añadir más partidos según sea necesario
    ];

    const renderMatch = ({ item }) => (
        <View style={styles.matchContainer}>
            <Text style={styles.matchTeams}>{item.teams}</Text>
            <Text style={styles.matchScore}>{item.score}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>{divisionName}</Text>
            <FlatList
                data={matches}
                keyExtractor={(item) => item.id}
                renderItem={renderMatch}
            />
            <Button title="Volver" onPress={() => navigation.goBack()} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#FFC0CB', // Color rosa
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    matchContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    matchTeams: {
        fontSize: 18,
    },
    matchScore: {
        fontSize: 16,
        color: '#555',
    },
});

export default DetalleDivision;

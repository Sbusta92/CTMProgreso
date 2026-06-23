import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TablaDivision = ({ nombres = [], resultados = [] }) =>{

function getGanador(rowIndex, colIndex) {
  const jugadorFila = nombres[rowIndex];
  const jugadorCol = nombres[colIndex];
  if (!jugadorFila || !jugadorCol) return '';

  const resultado = resultados.find(r =>
    (r.jugador1 === jugadorFila.id && r.jugador2 === jugadorCol.id) ||
    (r.jugador1 === jugadorCol.id && r.jugador2 === jugadorFila.id)
  );

  if (!resultado) return '';

  return resultado.ganador === jugadorFila.id
    ? jugadorFila.nombre
    : jugadorCol.nombre;
}


return(
<View style={styles.grid}>
                <View style={{ ...styles.cell, ...styles.headerCell }}>
                    <Text>Nombre</Text>
                </View>
                {Array.from({ length: 5 }).map((_, index) => (
                    <View key={`header-${index}`} style={{ ...styles.cell, ...styles.headerCell }}>
                        <Text>{nombres[index]?.nombre}</Text>
                    </View>
                ))}
                {Array.from({ length: 5 }).map((_, rowIndex) => (
                    <React.Fragment key={rowIndex}>
                        <View style={{ ...styles.cell, ...styles.headerCell }}>
                            <Text>{nombres[rowIndex]?.nombre}</Text>
                        </View>
                        {Array.from({ length: 5 }).map((_, colIndex) => (
                            <View
                                key={`${rowIndex}-${colIndex}`}
                                style={{
                                    ...styles.cell,
                                    ...(rowIndex === colIndex ? styles.gray : styles.pink),
                                }}
                            >
                                <Text>
                                  {rowIndex === colIndex ? 'X' : getGanador(rowIndex, colIndex)}
                                </Text>
                            </View>
                        ))}
                    </React.Fragment>
                ))}
            </View>
            )}
const styles = StyleSheet.create({
                
                grid: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    width: '98%',
                    maxWidth: 400,
                    flex:8,
                    marginTop:5,
                },
                cell: {
                    width: 60,
                    height: 100,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#ccc',
                },
                headerCell: {
                    backgroundColor: 'white',
                    fontWeight: 'bold',
                },
                pink: {
                    backgroundColor: 'pink',
                },
                gray: {
                    backgroundColor: 'lightgray',
                },

            });

 export default TablaDivision;
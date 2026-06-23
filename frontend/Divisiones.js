import React, { useState, useEffect, useRef } from 'react';

import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity, Modal, Alert } from 'react-native';
import TablaDivision from './TablaDivision'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../config/config";


const Divisiones = ({ navigation }) => {

    const [division, setDivision] = useState(0);
    const [torneoActivo, setTorneoActivo] = useState(false);



    const [usuarioId, setUsuarioId] = useState('');
    const [isUsuarioAdmin, setIsUsuarioAdmin] = useState(false);
    const [isUsuarioEnTorneoActivo, setIsUsuarioEnTorneoActivo] = useState(false);
    const yaRegistradoRef = useRef(false);

    const [modalTorneoVisible, setModalTorneoVisible] = useState(false);
    const [numJugadores, setNumJugadores] = useState(null);
    const [jugadoresDisponibles, setJugadoresDisponibles] = useState([]);
    const [jugadoresSeleccionados, setJugadoresSeleccionados] = useState([]);

    const [modalActualizarVisible, setModalActualizarVisible] = useState(false);
    const [jugador1, setJugador1] = useState(null);
    const [jugador2, setJugador2] = useState(null);
    const [ganador, setGanador] = useState(null);

    const [resultados, setResultados] = useState([]);
    const [torneoCompletado, setTorneoCompletado] = useState(false);

    const [torneo, setTorneo] = useState(false);
    const [bgColor, setBgColor] = useState('#FFC0CB');
    const [divisionesData, setDivisionesData] = useState([]);

    useEffect(() => {
      const restaurarTorneo = async () => {
        const activo = await AsyncStorage.getItem('torneoActivo');
        if (activo === 'true') {
          try {
            const jugadores = await AsyncStorage.getItem('jugadoresSeleccionados');
            const divisiones = await AsyncStorage.getItem('divisionesData');
            const resultadosGuardados = await AsyncStorage.getItem('resultados');

            // 🔽 Añadir esta parte
            const finalizado = await AsyncStorage.getItem('registroFinalizado');
            if (finalizado === 'true') {
              yaRegistradoRef.current = true;
              console.log("✅ Protección activada desde almacenamiento persistente");
            }

            if (jugadores && divisiones) {
              setJugadoresSeleccionados(JSON.parse(jugadores));
              setDivisionesData(JSON.parse(divisiones));
              setResultados(resultadosGuardados ? JSON.parse(resultadosGuardados) : []);
              setTorneo(true);
              console.log("✅ Torneo restaurado desde AsyncStorage");
            }
          } catch (error) {
            console.error("❌ Error restaurando torneo:", error);
          }
        }
      };


      restaurarTorneo();
    }, []);


    useEffect(() => {
      fetch(`${API_URL}/CTMProgreso/v1/Usuario`)

        .then(res => res.json())
        .then(data => {
              const jugadoresFiltrados = data.map(j => ({
                id: j.id_usuario,
                nombre: j.nombre,
              }));
            setJugadoresDisponibles(jugadoresFiltrados)
            })
        .catch(err => console.error('Error al cargar jugadores:', err));
    }, []);

 useEffect(() => {
   // ⛔ Protección: no continuar si no hay resultados
   if (resultados.length === 0) {
     console.log("⛔ Nada que registrar: no hay resultados.");
     return;
   }

   // 🔍 DEPURACIÓN: Estado actual de condiciones antes de registrar
   console.log("🔍 Chequeo automático:", {
     resultados: resultados.length,
     torneoCompletado,
     yaRegistrado: yaRegistradoRef.current,
     todosPartidos: todosLosPartidosRegistrados(divisionesData, resultados),
   });

   if (
     divisionesData.length > 0 &&
     !torneoCompletado &&
     todosLosPartidosRegistrados(divisionesData, resultados) &&
     !yaRegistradoRef.current
   ) {
     console.log("🔥 Ejecutando registro de historial...");

     yaRegistradoRef.current = true;
     setTorneoCompletado(true);
     AsyncStorage.setItem('registroFinalizado', 'true');

     const obtenerGanadoresPorDivision = (divisiones, resultados) => {
       const victorias = contarVictorias(resultados);
       const nombresDivisiones = ['Primera', 'Segunda', 'Tercera', 'Cuarta', 'Quinta'];

       return divisiones.map((jugadores, index) => {
         const ordenados = [...jugadores].sort(
           (a, b) => (victorias[b.id] || 0) - (victorias[a.id] || 0)
         );
         const ganador = ordenados[0];
         return {
           nombreUsuario: ganador.nombre,
           division: nombresDivisiones[index] || `División ${index + 1}`,
         };
       });
     };

     const ganadores = obtenerGanadoresPorDivision(divisionesData, resultados);

     ganadores.forEach(async (ganador) => {
       try {
         const res = await fetch(`${API_URL}/CTMProgreso/v3/HistorialLigas/incrementar`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify(ganador),
         });

         if (res.ok) {
           console.log(`✅ Historial actualizado para ${ganador.nombreUsuario} (${ganador.division})`);
         } else {
           console.warn(`⚠️ Error al registrar historial de ${ganador.nombreUsuario}`);
         }
       } catch (error) {
         console.error(`❌ Error al registrar historial de ${ganador.nombreUsuario}:`, error);
       }
     });

     Alert.alert(
       'Torneo finalizado',
       '¡Ya se han registrado todos los resultados!',
       [
         {
           text: 'Seguir jugando',
           onPress: async () => {
             const nuevasDivisiones = reorganizarDivisiones(divisionesData, resultados);
             setDivisionesData(nuevasDivisiones);
             setResultados([]);
             await AsyncStorage.removeItem('registroFinalizado');
             yaRegistradoRef.current = false;
           },
         },
         {
           text: 'Finalizar torneo',
           onPress: async () => {
             ponerJugadoresEnTorneoActivo(jugadoresSeleccionados);
             setTorneo(false);

             await AsyncStorage.removeItem('registroFinalizado');

             fetch(`${API_URL}/CTMProgreso/v1/Usuario/resetearDivisiones`, {
               method: 'PATCH',
             })
               .then((res) => {
                 if (res.ok) {
                   console.log('✅ Divisiones reseteadas correctamente');
                 } else {
                   console.warn('⚠️ Error reseteando divisiones. Estado:', res.status);
                 }
               })
               .catch((err) => console.error('❌ Error al resetear divisiones:', err));
           },
           style: 'destructive',
         },
       ],
       { cancelable: false }
     );
   }
 }, [resultados, divisionesData]);



    useEffect(() => {
      const cargarID = async () => {
        idGuardado = await AsyncStorage.getItem('id');
        if (idGuardado) {
          console.log("ID recuperado de asyncstorage: ", idGuardado)
          setUsuarioId(idGuardado);
        }
      };

      cargarID();

    }, []);

    useEffect(() => {
      const comprobarTorneoActivo = async () => {
        const activo = await AsyncStorage.getItem('torneoActivo');
        if (activo === 'true') {
          setTorneo(true);
          setTorneoActivo(true);
        }
      };
      comprobarTorneoActivo();
    }, []);


    useEffect(() => {
      if (usuarioId) {
        fetch(`${API_URL}/CTMProgreso/v1/Usuario/${usuarioId}`)

          .then(res => res.json())
          .then(data => {
            console.log(data.admin, data.activo);
            setIsUsuarioAdmin(data.admin);
            setIsUsuarioEnTorneoActivo(data.activo);
          })
          .catch(err => console.error('Error al cargar datos del usuario:', err));
      }
    }, [usuarioId]);

    function shuffleJugadores(){
      const shuffledData = [...jugadoresSeleccionados].sort(() => Math.random() - 0.5);
      const groupedData = Array.from({ length: Math.ceil(shuffledData.length / 5) }, (_, i) =>
        shuffledData.slice(i * 5, i * 5 + 5)
      );
      setDivisionesData(groupedData);
      actualizarDivisionesEnBackend(groupedData)
    }

    const actualizarDivisionesEnBackend = async (groupedData) => {
      // 1. Construir el array plano con id y division
      const jugadoresConDivision = [];

      for (let i = 0; i < groupedData.length; i++) {
        const division = i + 1; // empezamos en 1
        const jugadores = groupedData[i];

        for (let j = 0; j < jugadores.length; j++) {
          jugadoresConDivision.push({
            id: jugadores[j].id,
            division: division
          });
        }
      }

      console.log(jugadoresConDivision);

      // 2. Hacer PATCH por cada jugador
      for (const jugador of jugadoresConDivision) {
        try {
          const response = await fetch(`${API_URL}/CTMProgreso/v1/Usuario/divisionActual/${jugador.id}/${jugador.division}`, {
            method: 'PATCH'
          });


          if (response.ok) {
            console.log(`✅ División actualizada para jugador ${jugador.id} → División ${jugador.division}`);
          } else {
            console.warn(`⚠️ Error actualizando jugador ${jugador.id}. Estado: ${response.status}`);
          }

        } catch (error) {
          console.error(`❌ Error de red al actualizar jugador ${jugador.id}:`, error);
        }
      }
    };

    function contarVictorias(resultados) {
      const conteo = {};

      resultados.forEach(({ ganador }) => {
        if (!conteo[ganador]) {
          conteo[ganador] = 1;
        } else {
          conteo[ganador]++;
        }
      });

      return conteo; // { id_jugador: victorias, ... }
    }

    function reorganizarDivisiones(divisiones, resultados) {
      const victorias = contarVictorias(resultados);

      const nuevasDivisiones = divisiones.map((division) => {
        return division.map(j => ({
          ...j,
          victorias: victorias[j.id] || 0,
        }));
      });

      const reorganizadas = Array.from({ length: nuevasDivisiones.length }, () => []);

      const randomSort = arr => [...arr].sort(() => Math.random() - 0.5);
      const ultimaDivisionIndex = nuevasDivisiones.length - 1;

      for (let i = 0; i < nuevasDivisiones.length; i++) {
        const division = nuevasDivisiones[i];

        const ordenados = [...division].sort((a, b) => b.victorias - a.victorias);

        // === ASCENSO ===
        let ascendentes = [];
        const puedeSubir = i !== 0 && i === ultimaDivisionIndex; // solo en la última división real
        const puedeSubirNormal = i > 0 && i !== ultimaDivisionIndex;

        if (puedeSubir || puedeSubirNormal) {
          const maxVictorias = ordenados[0].victorias;
          const empatadosArriba = ordenados.filter(j => j.victorias === maxVictorias);

          if (empatadosArriba.length > 2) {
            ascendentes = randomSort(empatadosArriba).slice(0, 2);
          } else {
            ascendentes = ordenados.slice(0, 2);
          }
        }

        // === DESCENSO ===
        let descendentes = [];
        const puedeBajar = i !== ultimaDivisionIndex;

        if (puedeBajar) {
          const minVictorias = ordenados[ordenados.length - 1].victorias;
          const empatadosAbajo = ordenados.filter(j => j.victorias === minVictorias);

          if (empatadosAbajo.length > 2) {
            descendentes = randomSort(empatadosAbajo).slice(0, 2);
          } else {
            descendentes = ordenados.slice(-2);
          }
        }

        // === RESTANTES ===
        const idsAsc = new Set(ascendentes.map(j => j.id));
        const idsDesc = new Set(descendentes.map(j => j.id));

        const restantes = division.filter(j => !idsAsc.has(j.id) && !idsDesc.has(j.id));

        // === DISTRIBUCIÓN ===
        if (i > 0) reorganizadas[i - 1].push(...ascendentes);
        reorganizadas[i].push(...restantes);
        if (i < ultimaDivisionIndex) reorganizadas[i + 1].push(...descendentes);
      }

      return reorganizadas;
    }


    function crearNuevoTorneo(){
        setModalTorneoVisible(true);
    }

    function participarTorneo() {

      fetch(`${API_URL}/CTMProgreso/v1/Usuario`)

        .then(res => res.json())
        .then(data => {
          const jugadoresFiltrados = data
            .filter(j => j.activo) // 👉 solo los que tienen activo = true
            .map(j => ({
              id: j.id_usuario,
              nombre: j.nombre,
              activo: j.activo,
              division: j.divisionActual,
            }));
          console.log("Array de peñita: ", jugadoresFiltrados, "Length: ", jugadoresFiltrados.length);
          setJugadoresSeleccionados(jugadoresFiltrados);
          const agrupadosPorDivision = [];

          jugadoresFiltrados.forEach(jugador => {
            const index = jugador.division - 1;
            if (!agrupadosPorDivision[index]) agrupadosPorDivision[index] = [];
            agrupadosPorDivision[index].push(jugador);
          });

          setDivisionesData(agrupadosPorDivision);
        })
        .catch(err => console.error('Error al cargar jugadores:', err));

      setTorneo(true);
    }

    function actualizarDivision() {
        setModalActualizarVisible(true);
    }

    function toggleJugador(jugador) {
      const yaSeleccionado = jugadoresSeleccionados.find(j => j.id === jugador.id);

      if (yaSeleccionado) {
        setJugadoresSeleccionados(prev => prev.filter(j => j.id !== jugador.id));
      } else if (jugadoresSeleccionados.length < numJugadores) {
        setJugadoresSeleccionados(prev => [...prev, jugador]);
      }
    }

    const ponerJugadoresEnTorneoActivo = async (jugadoresSeleccionados) => {
      for (let i = 0; i < jugadoresSeleccionados.length; i++) {
        const jugador = jugadoresSeleccionados[i];
        try {
          const response = await fetch(`${API_URL}/CTMProgreso/v1/Usuario/activo/${jugador.id}`, {
            method: 'PATCH',
          });

          if (response.ok) {
            console.log(`Jugador ${jugador.nombre} activado correctamente.`);
          } else {
            console.warn(`Error al activar al jugador ${jugador.nombre}. Estado: ${response.status}`);
          }
        } catch (error) {
          console.error(`Error al activar al jugador ${jugador.nombre}:`, error);
        }
      }
    };

    // 🔻 Pega aquí la nueva función
    const cancelarTorneo = async () => {
      try {
        await AsyncStorage.removeItem('torneoActivo');
        await AsyncStorage.removeItem('jugadoresSeleccionados');
        await AsyncStorage.removeItem('divisionesData');
        await AsyncStorage.removeItem('resultados');

        setTorneo(false);
        setTorneoActivo(false);
        setDivisionesData([]);
        setResultados([]);
        setJugadoresSeleccionados([]);

        await fetch(`${API_URL}/CTMProgreso/v1/Usuario/resetearDivisiones`, {
          method: 'PATCH',
        });

        console.log('🗑️ Torneo cancelado y divisiones reseteadas');
        Alert.alert('Torneo cancelado', 'Puedes crear uno nuevo.');

        // 🔁 Recargar estado del usuario
        const res = await fetch(`${API_URL}/CTMProgreso/v1/Usuario/${usuarioId}`);
        const data = await res.json();
        setIsUsuarioAdmin(data.admin);
        setIsUsuarioEnTorneoActivo(data.activo);

      } catch (error) {
        console.error('❌ Error al cancelar torneo:', error);
      }
    };




    function renderTabla() {
      const nombres = divisionesData[division - 1];

      if (division > 0 && nombres && nombres.length > 0) {
        return <TablaDivision nombres={nombres} resultados={resultados} />;
      }

      return (
        <View>
          <Text>No hay división seleccionada</Text>
        </View>
      );
    }

    function todosLosPartidosRegistrados(divisionesData, resultados) {
      if (!resultados || resultados.length === 0) return false; // ⚠️ protección crítica

      for (let division of divisionesData) {
        for (let i = 0; i < division.length; i++) {
          for (let j = i + 1; j < division.length; j++) {
            const jugador1 = division[i];
            const jugador2 = division[j];

            const existeResultado = resultados.some(
              r =>
                (r.jugador1 === jugador1.id && r.jugador2 === jugador2.id) ||
                (r.jugador1 === jugador2.id && r.jugador2 === jugador1.id)
            );

            if (!existeResultado) return false;
          }
        }
      }

      return true;
    }



    const renderModalNuevoTorneo = () => {
        return (
            <Modal
              visible={modalTorneoVisible}
              transparent={true}
              animationType="slide"
              onRequestClose={() => {
                setModalTorneoVisible(!modalTorneoVisible)
          }}

            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                  <Text style={styles.modalTitle}>Crear Torneo</Text>

                  <Text>Selecciona número de jugadores:</Text>
                  {[5, 10, 15, 20, 25].map((n) => (
                    <TouchableOpacity key={n} onPress={() => setNumJugadores(n)} style={styles.modalOption}>
                      <Text style={{ fontWeight: numJugadores === n ? 'bold' : 'normal' }}>{n}</Text>
                    </TouchableOpacity>
                  ))}

                  {numJugadores && (
                    <>
                      <Text style={{ marginTop: 10 }}>Selecciona jugadores ({jugadoresSeleccionados.length}/{numJugadores}):</Text>
                      <FlatList
                        data={jugadoresDisponibles}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            onPress={() => toggleJugador(item)}
                            style={[
                              styles.jugadorItem,
                              jugadoresSeleccionados.find(j => j.id === item.id) && styles.jugadorSeleccionado,
                            ]}
                          >
                            <Text>{item.nombre}</Text>
                          </TouchableOpacity>
                        )}
                      />

                      {jugadoresSeleccionados.length !== numJugadores && (
                        <Text style={{ color: 'red', marginVertical: 10 }}>
                          Debes seleccionar exactamente {numJugadores} jugadores.
                        </Text>
                      )}

                    </>
                  )}

                 <Button
                   title="Confirmar"
                   onPress={async () => {
                     setModalTorneoVisible(false);

                     // 1. Mezclar y agrupar jugadores
                     const shuffledData = [...jugadoresSeleccionados].sort(() => Math.random() - 0.5);
                     const groupedData = Array.from({ length: Math.ceil(shuffledData.length / 5) }, (_, i) =>
                       shuffledData.slice(i * 5, i * 5 + 5)
                     );
                     setDivisionesData(groupedData);

                     // 2. Guardar en AsyncStorage
                     try {
                       await AsyncStorage.setItem('torneoActivo', 'true');
                       await AsyncStorage.setItem('jugadoresSeleccionados', JSON.stringify(jugadoresSeleccionados));
                       await AsyncStorage.setItem('divisionesData', JSON.stringify(groupedData));
                       await AsyncStorage.setItem('resultados', JSON.stringify([]));
                       console.log("✅ Datos del torneo guardados correctamente");
                     } catch (error) {
                       console.error("❌ Error guardando datos en AsyncStorage:", error);
                     }

                     // 3. Activar torneo
                     setTorneo(true);
                     ponerJugadoresEnTorneoActivo(jugadoresSeleccionados);
                     actualizarDivisionesEnBackend(groupedData);
                   }}
                   disabled={jugadoresSeleccionados.length !== numJugadores}
                 />


                </View>
              </View>
            </Modal>

        )
    }



    const renderModalActualizar = () => {
      const jugadoresDivActual = divisionesData[division - 1] || [];

      const jugadoresFiltrados = jugador1
        ? jugadoresDivActual.filter(j => j.id !== jugador1.id)
        : jugadoresDivActual;


      return (
        <Modal
          visible={modalActualizarVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => {
            setModalActualizarVisible(!modalActualizarVisible)
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Actualizar Resultado</Text>

              <Text>Selecciona Jugador 1:</Text>
              <FlatList
                data={jugadoresDivActual}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => {
                      setJugador1(item);
                      setJugador2(null);
                      setGanador(null);
                    }}
                    style={[
                      styles.jugadorItem,
                      jugador1?.id === item.id && styles.jugadorSeleccionado,
                    ]}
                  >
                    <Text>{item.nombre}</Text>
                  </TouchableOpacity>
                )}
              />

              <Text style={{ marginTop: 10 }}>Selecciona Jugador 2:</Text>
              <FlatList
                data={jugadoresFiltrados}
                keyExtractor={(item) => item.id.toString()}
                horizontal
                renderItem={({ item }) => (
                  <TouchableOpacity
                    disabled={!jugador1}
                    onPress={() => {
                      setJugador2(item);
                      setGanador(null);
                    }}
                    style={[
                      styles.jugadorItem,
                      jugador2?.id === item.id && styles.jugadorSeleccionado,
                      !jugador1 && { opacity: 0.4 },
                    ]}
                  >
                    <Text>{item.nombre}</Text>
                  </TouchableOpacity>
                )}
              />

              {jugador1 && jugador2 && (
                <>
                  <Text style={{ marginTop: 10 }}>Selecciona Ganador:</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    {[jugador1, jugador2].map((jug) => (
                      <TouchableOpacity
                        key={jug.id}
                        onPress={() => setGanador(jug)}
                        style={[
                          styles.jugadorItem,
                          ganador?.id === jug.id && styles.jugadorSeleccionado,
                        ]}
                      >
                        <Text>{jug.nombre}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                </>
              )}

              <Button
                title="Confirmar"
                disabled={
                  !jugador1 ||
                  !jugador2 ||
                  !ganador ||
                  (usuarioId !== jugador1.id.toString() && usuarioId !== jugador2.id.toString() && !isUsuarioAdmin)
                }
                onPress={async () => {
                  const nuevoResultado = {
                    jugador1: jugador1.id,
                    jugador2: jugador2.id,
                    ganador: ganador.id,
                  };

                  const nuevosResultados = [...resultados, nuevoResultado];
                  setResultados(nuevosResultados);

                  try {
                    await AsyncStorage.setItem('resultados', JSON.stringify(nuevosResultados));
                    console.log('✅ Resultados guardados en AsyncStorage');
                  } catch (error) {
                    console.error('❌ Error al guardar resultados:', error);
                  }

                  setModalActualizarVisible(false);
                  setJugador1(null);
                  setJugador2(null);
                  setGanador(null);
                }}
              />


             <Button
               title="Borrar resultado"
               color="red"
               disabled={!jugador1 || !jugador2}
               onPress={borrarResultado}
             />

             <Button
               title="Cancelar"
               color="gray"
               onPress={() => {
                 setModalActualizarVisible(false);
                 setJugador1(null);
                 setJugador2(null);
                 setGanador(null);
               }}
             />


            </View>
          </View>
        </Modal>
      );

    }

    const borrarResultado = async () => {
      const nuevosResultados = resultados.filter(r =>
        !(
          (r.jugador1 === jugador1.id && r.jugador2 === jugador2.id) ||
          (r.jugador1 === jugador2.id && r.jugador2 === jugador1.id)
        )
      );

      setResultados(nuevosResultados);

      try {
        await AsyncStorage.setItem('resultados', JSON.stringify(nuevosResultados));
        console.log('🗑️ Resultado eliminado correctamente');
      } catch (error) {
        console.error('❌ Error al borrar resultado:', error);
      }

      setModalActualizarVisible(false);
      setJugador1(null);
      setJugador2(null);
      setGanador(null);
    };


    return (

    <>
        {renderModalNuevoTorneo()}
        {renderModalActualizar()}

        {torneo ? (
           <View style={[styles.container, {backgroundColor: bgColor}]}>
                <Text style={styles.header}>Divisiones</Text>
                {renderTabla()}
                <View style={styles.containerRow}>
                    <TouchableOpacity
                        style={[styles.btn, {backgroundColor: "lightblue"}]}
                        onPress={actualizarDivision}
                        disabled={division < 1 || division > 5}
                    >
                        <Text style={styles.btnTxt}>Actualizar</Text>
                    </TouchableOpacity>
                        {Array.from({ length: Math.ceil(jugadoresSeleccionados.length / 5) }).map((_, i) => (
                          <TouchableOpacity
                            key={i}
                            onPress={() => {
                              setDivision(i + 1);
                              const colores = ['gold', 'silver', 'brown', 'red', 'darkred'];
                              setBgColor(colores[i % colores.length]); // Para no desbordar el array
                            }}
                            style={[styles.btn, {
                              backgroundColor: ['gold', 'silver', 'brown', 'red', 'darkred'][i % 5],
                            }]}
                          >
                            <Text style={styles.btnTxt}>{i + 1}</Text>
                          </TouchableOpacity>
                        ))}

                    <TouchableOpacity
                      disabled={!isUsuarioAdmin}
                      style={[
                        styles.btn,
                        {
                          backgroundColor: isUsuarioAdmin ? 'tomato' : 'gray',
                          borderColor: isUsuarioAdmin ? 'black' : 'gray',
                        },
                      ]}
                      onPress={() => {
                        if (isUsuarioAdmin) cancelarTorneo();
                      }}
                    >
                      <Text style={styles.btnTxt}>Cancelar Torneo</Text>
                    </TouchableOpacity>


                </View>
            </View>
        ) : (
            <View style={[styles.container, {flexDirection: "column", alignItems: "center"}]}>
                <Text style={styles.header}>No hay un torneo activo.</Text>
                <TouchableOpacity
                    disabled={!isUsuarioAdmin}
                    style={[styles.btnNuevoTorneo,
                            {borderColor: isUsuarioAdmin ? "black" : "gray",
                             backgroundColor: isUsuarioAdmin ? "lightgreen" : "gray"}
                        ]}
                    onPress={crearNuevoTorneo}
                >
                    <Text style={styles.btnNuevoTorneoTxt}>Crear Nuevo Torneo</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={!torneoActivo || !isUsuarioEnTorneoActivo}
                  style={[styles.btnNuevoTorneo,
                    {
                      borderColor: torneoActivo && isUsuarioEnTorneoActivo ? "black" : "gray",
                      backgroundColor: torneoActivo && isUsuarioEnTorneoActivo ? "lightgreen" : "gray"
                    }
                  ]}
                  onPress={participarTorneo}
                >
                  <Text style={styles.btnNuevoTorneoTxt}>Participar en Torneo</Text>
                </TouchableOpacity>

            </View>
        )}
    </>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    containerRow: {
        flexDirection: "row",
    },
    btnNuevoTorneo: {
        backgroundColor: "lightgreen",
        padding: 6,
        margin: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
    },
    btnNuevoTorneoTxt: {
        fontSize: 24,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    divisionContainer: {
        marginBottom: 20,
    },
    divisionName: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 18,
    },
    btn: {
        width: 48,
        height: 48,
        marginHorizontal: 6,
        marginTop: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "black",
    },
    btnTxt: {
        textAlign: "center",
    },

    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      borderRadius: 10,
      padding: 20,
      elevation: 10,
      maxHeight: '80%',
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    modalOption: {
      padding: 10,
      marginVertical: 2,
      backgroundColor: '#f0f0f0',
      borderRadius: 5,
    },
    jugadorItem: {
      padding: 10,
      marginVertical: 2,
      backgroundColor: '#e0e0e0',
      borderRadius: 5,
    },
    jugadorSeleccionado: {
      backgroundColor: '#90ee90',
    },
});

export default Divisiones;

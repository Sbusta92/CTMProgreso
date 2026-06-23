import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import Usuario from "./components/Usuario";
import Pantalla_Inicio from "./components/Pantalla_Inicio";
import DetalleDivision from './components/DetalleDivision';
import Perfil from "./components/Perfil";
import Divisiones from "./components/Divisiones";
import Acciones from "./components/Acciones"
import Historial from "./components/Historial"
const Stack =createStackNavigator();
function Main({navigation}) {

}
export default function App  () {
    console.log("App Navigator initialized")
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName={"Pantalla_Inicio"} >
            <Stack.Screen name={"Main"} component={Main} />
          <Stack.Screen name={"Pantalla_Inicio"} component={Pantalla_Inicio} />
          <Stack.Screen name={"Usuario"} component={Usuario} />
            <Stack.Screen name={"Perfil"} component={Perfil}/>
            <Stack.Screen name={"Divisiones"} component={Divisiones}/>
            <Stack.Screen name={"Acciones"} component={Acciones}/>
            <Stack.Screen name={"Historial"} component={Historial}/>



        </Stack.Navigator>
      </NavigationContainer>
  );
};

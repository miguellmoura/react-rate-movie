// src/navigation/AppNavigator.js
import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SearchScreen from "../screens/SearchScreen";
import DetailsScreen from "../screens/DetailsScreen";
import MyMoviesScreen from "../screens/MyMoviesScreen";
import { UserContext } from "../contexts/UserContext";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  const { user } = useContext(UserContext);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <>
            <Stack.Screen name="Search" component={SearchScreen} options={{ title: "Buscar" }} />
            <Stack.Screen name="Details" component={DetailsScreen} options={{ title: "Detalhes" }} />
            <Stack.Screen name="MyMovies" component={MyMoviesScreen} options={{ title: "Meus Filmes" }} />
            <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: "Perfil" }} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

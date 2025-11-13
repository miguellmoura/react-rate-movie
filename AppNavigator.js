// AppNavigator.js
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import SearchScreen from "./src/screens/SearchScreen";
import MyMoviesScreen from "./src/screens/MyMoviesScreen";
import DetailsScreen from "./src/screens/DetailsScreen"; // 👈 garante que exista esse arquivo!

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// 🔹 Stack para a aba de busca (Search + Details)
function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: "Buscar Filmes" }}
      />
      <Stack.Screen
        name="Details"
        component={DetailsScreen}
        options={{ title: "Detalhes do Filme" }}
      />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Buscar") iconName = "search";
          else if (route.name === "Meus Filmes") iconName = "list";
          else if (route.name === "Perfil") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#6C63FF",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Buscar" component={SearchStack} />
      <Tab.Screen name="Meus Filmes" component={MyMoviesScreen} />
    </Tab.Navigator>
  );
}

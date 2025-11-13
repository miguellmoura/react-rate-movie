import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthScreen from "./src/screens/AuthScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import AppNavigator from "./AppNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      const logged = await AsyncStorage.getItem("loggedUser");
      if (logged) setUser(JSON.parse(logged));
    };
    loadUser();
  }, []);

  const handleLogin = async (userData) => {
    setUser(userData);
    await AsyncStorage.setItem("loggedUser", JSON.stringify(userData));
  };

  const handleLogout = async () => {
    setUser(null);
    await AsyncStorage.removeItem("loggedUser");
  };

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <>
            <Stack.Screen name="Login">
              {(props) => (
                <AuthScreen {...props} onLogin={handleLogin} />
              )}
            </Stack.Screen>
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
            />
          </>
        ) : (
          <Stack.Screen name="Main">
            {(props) => (
              <AppNavigator {...props} user={user} setUser={handleLogout} />
            )}
          </Stack.Screen>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
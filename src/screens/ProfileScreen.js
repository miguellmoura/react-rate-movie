// src/screens/ProfileScreen.js
import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "../contexts/UserContext";

export default function ProfileScreen() {
  const { user, logout } = useContext(UserContext);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri:
            user?.photo || user?.photoUri || "https://via.placeholder.com/120",
        }}
        style={styles.avatar}
      />
      <Text style={styles.name}>{user?.name || "Usuário"}</Text>
      <Text style={styles.email}>{user?.email}</Text>

      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={{ color: "#fff" }}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 12 },
  name: { fontSize: 20, fontWeight: "bold" },
  email: { color: "#666", marginBottom: 20 },
  button: { backgroundColor: "#E53935", padding: 12, borderRadius: 8 },
});

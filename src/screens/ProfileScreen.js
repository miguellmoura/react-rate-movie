import React, { useContext } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "../contexts/UserContext";

export default function ProfileScreen() {
  const { user, logout } = useContext(UserContext);

  const photo =
    user?.photo || user?.photoUri || "https://via.placeholder.com/120";

  return (
    <View style={styles.container}>

      <Image
        source={{ uri: photo }}
        style={styles.avatar}
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={
          user?.photo
            ? "Foto de perfil do usuário"
            : "Foto padrão de perfil não selecionada"
        }
      />

      <Text
        style={styles.name}
        accessibilityRole="header"
      >
        {user?.name || "Usuário"}
      </Text>

      <Text
        style={styles.email}
        accessible={true}
        accessibilityLabel={`E-mail cadastrado: ${user?.email}`}
      >
        {user?.email}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={logout}
        accessibilityRole="button"
        accessibilityLabel="Sair da conta"
        accessibilityHint="Encerra sua sessão no aplicativo"
      >
        <Text style={styles.buttonText}>Sair</Text>
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
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  email: {
    color: "#666",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#E53935",
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    minHeight: 44, 
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
  },
});
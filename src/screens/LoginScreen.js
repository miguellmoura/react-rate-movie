import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "../contexts/UserContext";

export default function LoginScreen({ navigation }) {
  const { login } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const raw = await AsyncStorage.getItem("users");
      const users = raw ? JSON.parse(raw) : [];
      const found = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!found) {
        Alert.alert("Erro", "E-mail ou senha incorretos.");
        return;
      }
      await login(found);
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Falha ao realizar login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Rate My Movie
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        accessibilityLabel="Campo de e-mail"
        accessibilityHint="Digite o e-mail cadastrado para entrar"
        autoFocus
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        accessibilityLabel="Campo de senha"
        accessibilityHint="Digite sua senha de acesso"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        accessibilityRole="button"
        accessibilityLabel="Entrar no aplicativo"
        accessibilityHint="Tenta fazer login com o e-mail e senha informados"
      >
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.linkButton}
        accessibilityRole="button"
        accessibilityLabel="Ir para tela de cadastro"
        accessibilityHint="Abre a tela para criar uma nova conta"
      >
        <Text style={{ color: "#6C63FF" }}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#6C63FF",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
    minHeight: 44,
    justifyContent: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },
  linkButton: {
    marginTop: 12,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});

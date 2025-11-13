import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AuthScreen({ navigation, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }

    try {
      const raw = await AsyncStorage.getItem("users");
      const users = raw ? JSON.parse(raw) : [];
      const user = users.find(
        (u) => u.email === email && u.password === password
      );
      if (!user) {
        Alert.alert("Erro", "Usuário ou senha incorretos.");
        return;
      }

      await AsyncStorage.setItem("loggedUser", JSON.stringify(user));
      onLogin(user);
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Falha ao fazer login.");
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={styles.title}
        accessibilityRole="header"
      >
        Rate My Movie 🎬
      </Text>

      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        accessibilityLabel="Campo de e-mail"
        accessibilityHint="Digite seu e-mail para entrar"
        autoFocus
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Campo de senha"
        accessibilityHint="Digite sua senha para entrar"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        accessibilityRole="button"
        accessibilityLabel="Entrar no Rate My Movie"
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
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
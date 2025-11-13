import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [photo, setPhoto] = useState(null);

  const pickImage = async () => {
    try {
      const res = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!res.granted) {
        Alert.alert("Permissão", "Permita acesso à galeria.");
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });
      if (!result.canceled) {
        setPhoto(result.assets[0].uri);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert("Erro", "Preencha todos os campos.");
      return;
    }
    try {
      const raw = await AsyncStorage.getItem("users");
      const users = raw ? JSON.parse(raw) : [];
      if (users.some((u) => u.email === email)) {
        Alert.alert("Erro", "E-mail já cadastrado.");
        return;
      }
      const newUser = { name, email, password, photo };
      users.push(newUser);
      await AsyncStorage.setItem("users", JSON.stringify(users));
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      navigation.navigate("Login");
    } catch (e) {
      console.log(e);
      Alert.alert("Erro", "Falha ao cadastrar.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title} accessibilityRole="header">
        Criar Conta
      </Text>

      <TouchableOpacity
        onPress={pickImage}
        style={styles.avatarBtn}
        accessibilityRole="button"
        accessibilityLabel={
          photo ? "Alterar foto de perfil" : "Selecionar foto de perfil"
        }
        accessibilityHint="Abre a galeria para escolher uma foto quadrada para o perfil"
      >
        {photo ? (
          <Image
            source={{ uri: photo }}
            style={styles.avatar}
            accessible={true}
            accessibilityRole="image"
            accessibilityLabel="Foto de perfil selecionada"
          />
        ) : (
          <View
            style={styles.avatarPlaceholder}
            accessible={false}
          >
            <Text>Selecionar foto</Text>
          </View>
        )}
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        accessibilityLabel="Campo de nome completo"
        accessibilityHint="Digite seu nome que será mostrado no perfil"
        autoFocus
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
        accessibilityLabel="Campo de e-mail"
        accessibilityHint="Digite um e-mail válido para cadastro"
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        accessibilityLabel="Campo de senha"
        accessibilityHint="Digite uma senha para acessar o aplicativo"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleRegister}
        accessibilityRole="button"
        accessibilityLabel="Cadastrar nova conta"
        accessibilityHint="Cria sua conta com os dados preenchidos"
      >
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.linkButton}
        accessibilityRole="button"
        accessibilityLabel="Voltar para tela de login"
        accessibilityHint="Retorna para a tela de login"
      >
        <Text style={{ color: "#6C63FF" }}>Voltar ao login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 10,
    textAlign: "center",
  },
  avatarBtn: {
    alignItems: "center",
    marginBottom: 12,
    minHeight: 44,
    justifyContent: "center",
  },
  avatar: { width: 100, height: 100, borderRadius: 50 },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
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
    marginTop: 6,
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
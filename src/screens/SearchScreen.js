import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { searchMovies } from "../services/tmdb";
import MovieItem from "../components/MovieItem";

export default function SearchScreen({ navigation }) {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (q.length < 2) {
        setResults([]);
        return;
      }
      fetchMovies();
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [q]);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const data = await searchMovies(q);
      setResults(data.results || []);
    } catch (e) {
      console.log("Erro busca TMDb:", e);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <TextInput
          placeholder="Buscar filmes..."
          value={q}
          onChangeText={setQ}
          style={styles.input}
          accessibilityLabel="Campo de busca de filmes"
          accessibilityHint="Digite o nome de um filme para ver os resultados"
          autoCapitalize="none"
          autoFocus
        />

        {loading ? (
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : results.length === 0 && q.length >= 2 ? (
          <Text style={styles.emptyText}>Nenhum resultado encontrado.</Text>
        ) : (
          <FlatList
            data={results}
            keyExtractor={(item) => String(item.id)}
            renderItem={({ item }) => (
              <MovieItem
                movie={item}
                onPress={() =>
                  navigation.navigate("Details", { movieId: item.id })
                }
              />
            )}
            contentContainerStyle={{ padding: 12 }}
          />
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f4f6fb" },
  input: {
    margin: 12,
    padding: 12,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 24,
    fontSize: 16,
    color: "#666",
  },
});
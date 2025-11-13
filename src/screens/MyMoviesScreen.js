import React, { useContext } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { MoviesContext } from "../contexts/MoviesContext";

export default function MyMoviesScreen() {
  const { myMovies, removeMovie } = useContext(MoviesContext);

  if (myMovies.length === 0)
    return (
      <SafeAreaView style={styles.center}>
        <Text style={{ color: "#666" }}>Nenhum filme salvo ainda.</Text>
      </SafeAreaView>
    );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={myMovies}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={{ padding: 12 }}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
              }}
              style={styles.image}
              accessible={true}
              accessibilityRole="image"
              accessibilityLabel={`Poster do filme ${item.title}`}
            />
            <View style={{ flex: 1, padding: 8 }}>
              <Text style={styles.title}>{item.title}</Text>
              <Text>тнР {item.rating} / 5</Text>
              <TouchableOpacity
                onPress={() => removeMovie(item.id)}
                style={styles.removeBtn}
                accessibilityRole="button"
                accessibilityLabel={`Remover o filme ${item.title} da lista de filmes salvos`}
                accessibilityHint="Remove este filme da sua lista de filmes avaliados"
              >
                <Text style={{ color: "white" }}>Remover</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  item: {
    flexDirection: "row",
    backgroundColor: "#fafafa",
    borderRadius: 12,
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  image: { width: 100, height: 150 },
  title: { fontWeight: "700", fontSize: 16, marginBottom: 4 },
  removeBtn: {
    backgroundColor: "#ff5555",
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: "flex-start",
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
});

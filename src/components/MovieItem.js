import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { getPoster } from "../services/tmdb";

export default function MovieItem({ movie, onPress }) {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      accessible={true}
      accessibilityRole="button"
      accessibilityLabel={`Filme ${movie.title}`}
      accessibilityHint="Toque para ver os detalhes e avaliar este filme"
    >
      <Image
        source={{ uri: getPoster(movie.poster_path) }}
        style={styles.image}
        accessible={true}
        accessibilityRole="image"
        accessibilityLabel={`Poster do filme ${movie.title}`}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{movie.title}</Text>
        {movie.release_date ? (
          <Text style={styles.subtitle}>Lançamento: {movie.release_date}</Text>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    overflow: "hidden",
    padding: 8,
  },
  image: { width: 80, height: 120, borderRadius: 6, marginRight: 10 },
  title: { fontWeight: "700", fontSize: 16 },
  subtitle: { color: "#555", marginTop: 4 },
});
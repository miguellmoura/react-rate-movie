// src/components/MovieItem.js
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function MovieItem({ movie, onPress }) {
  const poster = movie.poster_path
    ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
    : null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      accessibilityLabel={`Abrir detalhes de ${movie.title}`}
    >
      {poster ? (
        <Image source={{ uri: poster }} style={styles.image} accessibilityLabel={`Poster do filme ${movie.title}`} />
      ) : (
        <View style={[styles.image, styles.placeholder]}>
          <Text>Sem imagem</Text>
        </View>
      )}

      <View style={styles.info}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text numberOfLines={3} style={styles.overview}>
          {movie.overview || "Sem descrição"}
        </Text>
        <Text style={styles.meta}>⭐ {movie.vote_average ?? "—"} • {movie.release_date ?? "—"}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", marginBottom: 12, backgroundColor: "#fff", borderRadius: 8, overflow: "hidden", elevation: 2 },
  image: { width: 100, height: 150 },
  placeholder: { alignItems: "center", justifyContent: "center", backgroundColor: "#eee" },
  info: { flex: 1, padding: 10 },
  title: { fontWeight: "700", fontSize: 16, marginBottom: 6 },
  overview: { color: "#555", fontSize: 13 },
  meta: { marginTop: 8, color: "#888", fontSize: 12 }
});

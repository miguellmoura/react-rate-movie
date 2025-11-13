import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import { getPoster } from "../services/tmdb";
import { getMovieDetails } from "../services/movieDetails";
import { MoviesContext } from "../contexts/MoviesContext";
import * as Haptics from "expo-haptics";

export default function DetailsScreen({ route, navigation }) {
  const { movieId } = route.params;
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(0);
  const { addMovie } = useContext(MoviesContext);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await getMovieDetails(movieId);
        if (mounted) setMovie(data);
      } catch (e) {
        console.log(e);
      }
    })();
    return () => (mounted = false);
  }, [movieId]);

  if (!movie) return <ActivityIndicator style={{ flex: 1 }} size="large" />;

  const handleRate = async (value) => {
    setRating(value);
    await addMovie(movie, value);
    alert("Filme salvo com sucesso!");
    // Navega para a aba "Meus Filmes"
    navigation.getParent()?.navigate("Meus Filmes");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={{ uri: getPoster(movie.poster_path) }}
        style={styles.poster}
        accessibilityLabel={`Poster do filme ${movie.title}`}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>

      <Text style={styles.label}>Avalie este filme:</Text>
      <View style={styles.starsContainer}>
        {[1, 2, 3, 4, 5].map((n) => (
          <Pressable
            key={n}
            onPress={() => {
              Haptics.selectionAsync();
              handleRate(n);
            }}
            style={({ pressed }) => [
              styles.star,
              rating >= n && styles.starActive,
              pressed && { opacity: 0.6 },
            ]}
            accessibilityLabel={`Dar nota ${n} estrelas`}
          >
            <Text style={{ fontSize: 26 }}>⭐</Text>
          </Pressable>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#fff",
  },
  poster: { width: "100%", height: 450, borderRadius: 8 },
  title: { fontSize: 22, fontWeight: "700", marginTop: 12 },
  overview: { marginTop: 10, color: "#444" },
  label: { marginTop: 20, fontWeight: "600" },
  starsContainer: { flexDirection: "row", marginTop: 8 },
  star: {
    marginRight: 8,
    padding: 10,
    minWidth: 44,
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },
  starActive: { backgroundColor: "#FFECA0", borderRadius: 8 },
});

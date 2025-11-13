import { TMDB_API_KEY } from "../../config";
const BASE = "https://api.themoviedb.org/3";

export async function getMovieDetails(movieId) {
  const url = `${BASE}/movie/${movieId}?api_key=${TMDB_API_KEY}&language=pt-BR`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro movie details");
  return res.json();
}

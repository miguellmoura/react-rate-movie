// src/services/tmdb.js
import { TMDB_API_KEY } from "../../config";

const BASE = "https://api.themoviedb.org/3";

export async function searchMovies(query, page = 1) {
  if (!query) return { results: [] };
  const url = `${BASE}/search/movie?api_key=${TMDB_API_KEY}&language=pt-BR&query=${encodeURIComponent(
    query
  )}&page=${page}&include_adult=false`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Erro ao buscar filmes TMDb");
  return res.json();
}

export function getPoster(path, size = "w500") {
  if (!path) return null;
  return `https://image.tmdb.org/t/p/${size}${path}`;
}

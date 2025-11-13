import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserContext } from "./UserContext";

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const { user } = useContext(UserContext);
  const [myMovies, setMyMovies] = useState([]);

  useEffect(() => {
    if (user) {
      loadMovies();
    } else {
      setMyMovies([]);
    }
  }, [user]);

  const STORAGE_KEY = user ? `@movies_${user.email}` : null;

  const loadMovies = async () => {
    if (!STORAGE_KEY) return;
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      setMyMovies(data ? JSON.parse(data) : []);
    } catch (e) {
      console.log("Erro ao carregar filmes:", e);
    }
  };

  const saveMovies = async (list) => {
    if (!STORAGE_KEY) return;
    try {
      setMyMovies(list);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      console.log("Erro ao salvar filmes:", e);
    }
  };

  const addMovie = async (movie, rating) => {
    if (!movie || !user) return;
    const exists = myMovies.find((m) => m.id === movie.id);
    if (exists) return;
    const newList = [...myMovies, { ...movie, rating }];
    await saveMovies(newList);
  };

  const removeMovie = async (id) => {
    const newList = myMovies.filter((m) => m.id !== id);
    await saveMovies(newList);
  };

  return (
    <MoviesContext.Provider value={{ myMovies, addMovie, removeMovie }}>
      {children}
    </MoviesContext.Provider>
  );
};

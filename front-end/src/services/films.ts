import axios from "axios";
import type { Film } from "../types/film";

const API_BASE_URL = "http://localhost:3000/films";

export async function getFilms(): Promise<Film[]> {
  try {
    const response = await axios.get<Film[]>(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar filmes:", error);
    throw error;
  }
}

export async function getFilmById(id: string): Promise<Film> {
  try {
    const response = await axios.get<Film>(`${API_BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Erro ao buscar filme com ID ${id}:`, error);
    throw error;
  }
}
export async function createFilm(filmData: Omit<Film, 'id'>): Promise<Film> {
  try {
    const response = await axios.post<Film>(API_BASE_URL, filmData);
    return response.data;
  } catch (error) {
    console.error("Erro ao criar filme:", error);
    throw error;
  }
}

export async function updateFilm(id: string, filmData: Film): Promise<Film> {
  try {
    const response = await axios.put<Film>(`${API_BASE_URL}/${id}`, filmData);
    return response.data;
  } catch (error) {
    console.error(`Erro ao atualizar filme com ID ${id}:`, error);
    throw error;
  }
}

export async function deleteFilm(id: string): Promise<void> {
  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
  } catch (error) {
    console.error(`Erro ao deletar filme com ID ${id}:`, error);
    throw error;
  }
}
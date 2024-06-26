import axios from "axios";
import { Specialist } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetchSpecialists = async (): Promise<Specialist[]> => {
  const response = await api.get("/especialistas");
  return response.data;
};

// Función para iniciar sesión
export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await api.get('/auth/login', {
      params: { email, password },
    });
    return response.data; // Suponiendo que el token es devuelto como la data de la respuesta
  } catch (error) {
    handleAxiosError(error);
    throw error; // Lanzar el error después de manejarlo
  }
};


// Función para manejar errores de Axios
const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    throw new Error(error.response.data);
  } else {
    throw new Error('An unexpected error occurred');
  }
};
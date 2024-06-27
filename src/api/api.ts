import axios from "axios";
import { Specialist } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetchSpecialists = async (): Promise<Specialist[]> => {
  const response = await api.get("/especialistas");
  return response.data;
};

//Recomendado Login mediante POST en lugar de parametros en url
export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await api.get('/auth/login', {
      params: { email, password },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

const handleAxiosError = (error: any) => {
  if (axios.isAxiosError(error) && error.response) {
    throw new Error(error.response.data);
  } else {
    throw new Error('An unexpected error occurred');
  }
};
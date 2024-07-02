import axios from "axios";
import { Appointment, Specialist, SlotData } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetchSpecialists = async (): Promise<Specialist[]> => {
  try {
    const response = await api.get("/especialistas");
    console.log("aya", response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al cargar los especialistas');
    }
    throw new Error('Error de red');
  }
};

export const fetchSpecialistsBySpeciality = async (speciality: string): Promise<Specialist[]> => {
  try {
    const response = await api.get(`/especialistas/especialidad/${speciality}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al cargar los especialistas');
    }
    throw new Error('Error de red');
  }
};


export const fetchAppointments = async (): Promise<Appointment[]> => {
  try {
    const response = await api.get("/turnos");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al cargar los turnos');
    }
    throw new Error('Error de red');
  }
};

export const register = async (email: string, password: string, firstName: string, lastName: string): Promise<string> => {
  try {
    const response = await api.post('/auth/register', {
      email,
      password,
      firstName,
      lastName,
    });
    return response.data.token; // Suponiendo que el token se devuelve en la respuesta
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al registrar');
    }
    throw new Error('Error de red');
  }
};

//Recomendado Login mediante POST en lugar de parametros en url
export const login = async (email: string, password: string): Promise<string> => {
  try {
    const response = await api.get('/auth/login', {
      params: { email, password },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al iniciar sesión');
    }
    throw new Error('Error de red');
  }
};


export const fetchSpecialties = async (): Promise<string[]> => {
  try {
    const response = await api.get("/especialidades");
    console.log(response.data)
    return response.data.map((item: string) => item.toString());
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al cargar los turnos');
    }
    throw new Error('Error de red');
  }
};

// Función para obtener los slots disponibles
export const fetchAvailableSlots = async (doctorId: number): Promise<SlotData[]> => {
  const response = await api.get(`/turnos/available-slots/${doctorId}`);
  if (response.data && Array.isArray(response.data)) {
    return response.data;
  } else {
    throw new Error('Invalid response format');
  }
};

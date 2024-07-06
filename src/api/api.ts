import axios from "axios";
import { Appointment, Specialist, SlotData, Patient, AppointmentCreate, Recipe, AppointmentUpdate } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetchSpecialists = async (): Promise<Specialist[]> => {
  try {
    const response = await api.get("/especialistas");
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

export const fetchAppointmentDetails = async (id: number): Promise<Appointment> => {
  try {
    const response = await api.get(`/turnos/${id}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al obtener los detalles del turno');
    }
    throw new Error('Error de red');
  }
};

export const fetchAppointmentsByPatientId = async (patientId: number): Promise<Appointment[]> => {
  try {
    const response = await api.get(`/turnos/paciente/${patientId}`);
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

export const fetchPatients = async (): Promise<Patient[]> => {
  try {
    const response = await api.get("/pacientes");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al cargar los pacientes');
    }
    throw new Error('Error de red');
  }
};

export const createAppointment = async (appointmentCreate: AppointmentCreate): Promise<AppointmentCreate> => {
  try {
    const response = await api.post('/turnos', appointmentCreate);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al crear el turno');
    }
    throw new Error('Error de red');
  }
};

export const fetchRecipes = async (appointmentId: number): Promise<Recipe[]> => {
  try {
    const token = localStorage.getItem('token'); // Obtén el token desde localStorage
    if (!token) {
      throw new Error('No se encontró el token de autenticación');
    }

    const response = await api.get(`/recetas/${appointmentId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Incluye el token en el encabezado
      }
    });
//Solo depuracion
    console.log(response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al cargar las recetas');
    }
    throw new Error('Error de red');
  }
};

export const deleteAppointment = async (appointmentId: number): Promise<void> => {
  try {
    await api.delete(`/turnos/${appointmentId}`);
    console.log('Turno eliminado exitosamente');
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al eliminar el turno');
    }
    throw new Error('Error de red');
  }
};

export const updateAppointment = async (appointmentUpdate: AppointmentUpdate): Promise<AppointmentUpdate> => {
  try {
    const response = await api.put(`/turnos/${appointmentUpdate.id}`, appointmentUpdate);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || 'Error al actualizar el turno');
    }
    throw new Error('Error de red');
  }
};

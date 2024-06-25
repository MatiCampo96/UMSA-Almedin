import { Specialist } from '../types/types';

export const fetchSpecialists = async (): Promise<Specialist[]> => {
  const response = await fetch('http://localhost:8080/especialistas');
  if (!response.ok) {
    throw new Error('Respuesta no válida');
  }
  const data = await response.json();
  return data;
};

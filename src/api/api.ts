import axios from "axios";
import { Specialist } from "../types/types";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

export const fetchSpecialists = async (): Promise<Specialist[]> => {
  const response = await api.get("/especialistas");
  return response.data;
};

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import AppointmentCard from "../components/AppointmentCard";
import { fetchAppointmentsByPatientId } from "../api/api";
import { deleteAppointment } from "../api/api";
import { fetchRecipes } from "../api/api";
import { Appointment } from "../types/types";
import { generatePDF } from "../services/DownloadRecipes";
import { useNavigate } from "react-router-dom";

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("No se encontró el token de autenticación");
        }

        const tokenParts = token.split(".");
        const encodedPayload = tokenParts[1];
        const decodedPayload = atob(encodedPayload);
        const payload = JSON.parse(decodedPayload);
        const patientId = payload.id; // Ajusta según el nombre del claim en tu token
        const data = await fetchAppointmentsByPatientId(patientId); // Pasa el ID como parámetro
        setAppointments(data);
      } catch (error) {
        throw new Error("Error encontrando citas");
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, []);

  const handleCancel = async (appointmentId: number) => {
    try {
      await deleteAppointment(appointmentId);
      setAppointments(
        appointments.filter((appointment) => appointment.id !== appointmentId)
      );
      alert("Cita cancelada con exito");
    } catch (error) {
      throw new Error("Error cancelando la cita");
    }
  };

  const handleDownloadRecipes = async (appointmentId: number) => {
    try {
      const recipes = await fetchRecipes(appointmentId);
      generatePDF(recipes);
    } catch (error) {
      throw new Error("Error al descargar las recetas");
    }
  };

  const handleEdit = (appointmentId: number) => {
    navigate(`/turnos/actualizar/${appointmentId}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Citas Médicas
      </Typography>
      <Box sx={{ height: '70vh', overflow: 'auto' }}>
        <Grid container spacing={4}>
          {appointments.map((appointment) => (
            <Grid item key={appointment.id} xs={12} sm={6} md={4}>
              <AppointmentCard
                onEdit={() => handleEdit(appointment.id)}
                onCancel={() => handleCancel(appointment.id)}
                onDownloadRecipes={() => handleDownloadRecipes(appointment.id)}
                {...appointment}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default AppointmentList;

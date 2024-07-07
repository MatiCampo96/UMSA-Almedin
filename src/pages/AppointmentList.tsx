import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import AppointmentCard from "../components/AppointmentCard";
import { fetchAppointmentsByPatientId, deleteAppointment, fetchRecipes } from "../api/api";
import { Appointment } from "../types/types";
import { generatePDF } from "../services/DownloadRecipes";
import { useNavigate } from "react-router-dom";

const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
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
        const patientId = payload.id;
        const data = await fetchAppointmentsByPatientId(patientId);
        setAppointments(data);
      } catch (error) {
        setError("Error encontrando citas");
        console.error("Error fetching appointments:", error);
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
      alert("Cita cancelada con éxito");
    } catch (error) {
      setError("Error cancelando la cita");
      console.error("Error canceling appointment:", error);
    }
  };

  const handleDownloadRecipes = async (appointmentId: number) => {
    try {
      const recipes = await fetchRecipes(appointmentId);
      generatePDF(recipes);
    } catch (error) {
      setError("Error al descargar las recetas");
      console.error("Error downloading recipes:", error);
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
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Box sx={{ height: '70vh', overflow: 'auto', mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
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
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AppointmentList;

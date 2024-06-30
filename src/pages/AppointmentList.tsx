import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Box } from '@mui/material';
import AppointmentCard from '../components/AppointmentCard';
import { fetchAppointments } from '../api/api';
import { Appointment } from '../types/types';
import axios from 'axios';
import { fetchAvailableSlots } from '../api/api';

(window as any).axios = axios;
(window as any).fetchAvailableSlots = fetchAvailableSlots;


const AppointmentList: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (error) {
        console.error('Error encontrando citas:', error);
      } finally {
        setLoading(false);
      }
    };

    getAppointments();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Lista de Citas Médicas
      </Typography>
      <Grid container spacing={4}>
        {appointments.map((appointment) => (
          <Grid item key={appointment.id} xs={12} sm={6} md={4}>
            <AppointmentCard {...appointment} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AppointmentList;

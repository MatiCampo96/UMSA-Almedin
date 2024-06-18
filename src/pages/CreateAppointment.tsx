import React from 'react';
import { Container, Typography } from '@mui/material';
import AppointmentForm from '../components/AppointmentForm';

const CreateAppointment: React.FC = () => {
  const handleCreateAppointment = (data: { patientName: string; date: string; time: string; specialist: string; reason: string }) => {
    console.log('Crear Turno:', data);
    //TODO: Lógica para enviar la solicitud del turno
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Crear Turno Médico
      </Typography>
      <AppointmentForm onSubmit={handleCreateAppointment} />
    </Container>
  );
};

export default CreateAppointment;

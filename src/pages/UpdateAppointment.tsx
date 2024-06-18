import React from 'react';
import { Container, Typography } from '@mui/material';
import AppointmentForm from '../components/AppointmentForm';

const UpdateAppointment: React.FC = () => {
  const handleUpdateAppointment = (data: { patientName: string; date: string; time: string; specialist: string; reason: string }) => {
    console.log('Actualizar Turno:', data);
    //TODO: Logica para actualizar el turno
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Actualizar Turno Médico
      </Typography>
      <AppointmentForm onSubmit={handleUpdateAppointment} initialData={{
        patientName: '', // Debe ser rellenado con los datos actuales del turno
        date: '',
        time: '',
        specialist: '',
        reason: '',
      }} />
    </Container>
  );
};

export default UpdateAppointment;

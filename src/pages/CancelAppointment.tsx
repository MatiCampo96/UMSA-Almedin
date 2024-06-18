import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const CancelAppointment: React.FC = () => {
  const [appointmentId, setAppointmentId] = useState('');

  const handleCancelAppointment = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Cancelar Turno:', appointmentId);
    //TODO: Lógica para cancelar el turno médico
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Cancelar Turno Médico
        </Typography>
        <form noValidate onSubmit={handleCancelAppointment}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="appointmentId"
            label="ID del Turno"
            value={appointmentId}
            onChange={(e) => setAppointmentId(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Cancelar Turno
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default CancelAppointment;

import React, { useState } from 'react';
import { Container, Typography, TextField, Box } from '@mui/material';
import PrescriptionDownload from '../components/PrescriptionDownload';

const DownloadPrescription: React.FC = () => {
  const [appointmentId, setAppointmentId] = useState('');

  const handleDownloadPrescription = (id: string) => {
    console.log('Descargar Receta:', id);
    //TODO: Lógica para descargar la receta médica
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Descargar Receta Médica
        </Typography>
        <TextField
          margin="normal"
          required
          fullWidth
          id="appointmentId"
          label="ID del Turno"
          value={appointmentId}
          onChange={(e) => setAppointmentId(e.target.value)}
        />
        <PrescriptionDownload appointmentId={appointmentId} onDownload={handleDownloadPrescription} />
      </Box>
    </Container>
  );
};

export default DownloadPrescription;

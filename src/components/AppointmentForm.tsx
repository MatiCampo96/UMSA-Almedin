import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

interface AppointmentFormProps {
  onSubmit: (data: {
    patientName: string;
    date: string;
    time: string;
    specialist: string;
    reason: string;
  }) => void;
  initialData?: {
    patientName: string;
    date: string;
    time: string;
    specialist: string;
    reason: string;
  };
}

const AppointmentForm: React.FC<AppointmentFormProps> = ({ onSubmit, initialData }) => {
  const [patientName, setPatientName] = useState(initialData?.patientName || '');
  const [date, setDate] = useState(initialData?.date || '');
  const [time, setTime] = useState(initialData?.time || '');
  const [specialist, setSpecialist] = useState(initialData?.specialist || '');
  const [reason, setReason] = useState(initialData?.reason || '');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit({ patientName, date, time, specialist, reason });
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        {initialData ? 'Actualizar Turno' : 'Crear Turno'}
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Nombre del Paciente"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Fecha"
          type="date"
          InputLabelProps={{ shrink: true }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Hora"
          type="time"
          InputLabelProps={{ shrink: true }}
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Especialista"
          value={specialist}
          onChange={(e) => setSpecialist(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Motivo de la Consulta"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          {initialData ? 'Actualizar' : 'Crear'} Turno
        </Button>
      </form>
    </Box>
  );
};

export default AppointmentForm;

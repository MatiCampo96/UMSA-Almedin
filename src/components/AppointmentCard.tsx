import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import { Appointment } from '../types/types';

interface AppointmentCardProps extends Appointment {
  onEdit: () => void;
  onCancel: () => void;
  onDownloadRecipes: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  patient, dateHour, doctor, recipes = [], queryReason, onEdit, onCancel, onDownloadRecipes
}) => {
  const formatSpeciality = (speciality: string): string => {
    return speciality.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardContent>
        <Typography variant="h6">
          {patient ? `${patient.firstName} ${patient.lastName}` : 'No patient info'}
        </Typography>
        <Typography color="text.secondary">
          {new Date(dateHour).toLocaleString()}
        </Typography>
        <Typography color="text.secondary">
          {doctor ? `${doctor.firstName} ${doctor.lastName} - ${formatSpeciality(doctor.speciality)}` : 'No specialist info'}
        </Typography>
        <Typography color="text.secondary">{queryReason}</Typography>
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button variant="contained" color="warning" onClick={onEdit}>
          Editar
        </Button>
        <Button variant="outlined" color="error"onClick={onCancel}>
          Cancelar
        </Button>
        <Button variant="contained" color="success" onClick={onDownloadRecipes}>
          Descargar recetas
        </Button>
      </Box>
    </Card>
  );
};

export default AppointmentCard;

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Appointment } from '../types/types';

const AppointmentCard: React.FC<Appointment> = ({ patient, dateHour, specialist, recipes = [], queryReason }) => {
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
          {specialist ? `${specialist.firstName} ${specialist.lastName} - ${specialist.speciality}` : 'No specialist info'}
        </Typography>
        <Typography color="text.secondary">{queryReason}</Typography>
        {recipes.length > 0 && (
          <Typography color="text.secondary">
            Recetas:
            <ul>
              {recipes.map((recipe) => (
                <li key={recipe.id}>{recipe.description}</li>
              ))}
            </ul>
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default AppointmentCard;

import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Patient } from '../types/types';

interface PatientCardProps extends Patient {
  onClick: () => void; // Función para manejar el click en la tarjeta
}

const PatientCard: React.FC<PatientCardProps> = ({ firstName, lastName, onClick }) => {


  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default PatientCard;

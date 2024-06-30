import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Branch } from '../types/types';

interface BranchCardProps extends Branch {
  onClick: () => void; // Función para manejar el click en la tarjeta
}

const BranchCard: React.FC<BranchCardProps> = ({ name, address, city, onClick }) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="h6">{name}</Typography>
          <Typography color="text.secondary">{address}</Typography>
          <Typography color="text.secondary">{city}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default BranchCard;

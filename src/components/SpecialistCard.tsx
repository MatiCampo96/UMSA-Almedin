import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface SpecialistCardProps {
  name: string;
  specialty: string;
  schedule: string;
  location: string;
}

const SpecialistCard: React.FC<SpecialistCardProps> = ({ name, specialty, schedule, location }) => {
  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{name}</Typography>
        <Typography color="text.secondary">{specialty}</Typography>
        <Typography color="text.secondary">{schedule}</Typography>
        <Typography color="text.secondary">{location}</Typography>
      </CardContent>
    </Card>
  );
};

export default SpecialistCard;

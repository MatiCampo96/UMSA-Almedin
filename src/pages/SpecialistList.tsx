import React from 'react';
import { Container, Typography, Grid } from '@mui/material';
import SpecialistCard from '../components/SpecialistCard';

const specialists = [
  //TODO: Logica de la lista de especialistas
  // Especialistas hardcodeados
  { name: 'Dr. Juan Perez', specialty: 'Cardiología', schedule: 'Lunes a Viernes 9:00 - 17:00', location: 'Sucursal Centro' },
  { name: 'Dra. María Lopez', specialty: 'Dermatología', schedule: 'Lunes a Jueves 10:00 - 16:00', location: 'Sucursal Norte' },
  { name: 'Dr. Pedro Rodriguez', specialty: 'Pediatria', schedule: 'Lunes a Sabado 10:00 - 18:00', location: 'Sucursal Sur' },];

const SpecialistList: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Cartilla de Especialistas
      </Typography>
      <Grid container spacing={4}>
        {specialists.map((specialist, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <SpecialistCard
              name={specialist.name}
              specialty={specialist.specialty}
              schedule={specialist.schedule}
              location={specialist.location}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SpecialistList;

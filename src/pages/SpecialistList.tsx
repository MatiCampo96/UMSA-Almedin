import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import SpecialistCard from '../components/SpecialistCard';
import { Specialist } from '../types';

const ListSpecialists: React.FC = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [error, setError] = useState<string | null>(null);    //Puede usarse un Loading en lugar de error, error no esta implementado...

  useEffect(() => {
    console.log('Fetching doctors...');
    fetch('http://localhost:8080/especialistas')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data received:', data);  //Opcional, util durante depuración
        setSpecialists(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error); //Opcional, util durante depuración
        setError(error.message);
      });
  }, []);

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Cartilla de Especialistas
      </Typography>
      <Grid container spacing={4}>
        {specialists.map((specialist) => (
          <Grid item key={specialist.id} xs={12} sm={6} md={4}>
            <SpecialistCard
              firstName={specialist.firstName}
              lastName={specialist.lastName}
              specialty={specialist.speciality}
              location={specialist.branch.city}
              schedule={specialist.schedules}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ListSpecialists;
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, CircularProgress, Box } from '@mui/material';
import SpecialistCard from '../components/SpecialistCard';
import { fetchSpecialists } from '../api/api';
import { Specialist } from '../types/types';

const SpecialistList: React.FC = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSpecialists = async () => {
      try {
        const data = await fetchSpecialists();
        setSpecialists(data);
      } catch (error) {
        console.error('Error encontrando especialistas:', error);
      } finally {
        setLoading(false);
      }
    };

    getSpecialists();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Cartilla de Especialistas
      </Typography>
      <Grid container spacing={4}>
        {specialists.map((specialist, index) => (
          <Grid item key={index} xs={12} sm={6} md={4}>
            <SpecialistCard
              firstName={specialist.firstName}
              lastName={specialist.lastName}
              speciality={specialist.speciality}
              location={specialist.branch.city}
              schedule={specialist.schedules}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SpecialistList;

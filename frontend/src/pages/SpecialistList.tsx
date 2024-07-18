import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  CircularProgress,
  Box,
  Alert,
} from "@mui/material";
import SpecialistCard from "../components/SpecialistCard";
import { fetchSpecialists } from "../api/api";
import { Specialist } from "../types/types";

const SpecialistList: React.FC = () => {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getSpecialists = async () => {
      try {
        const data = await fetchSpecialists();
        setSpecialists(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred while fetching specialists.");
        }
      } finally {
        setLoading(false);
      }
    };

    getSpecialists();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg">
        <Alert severity="error" sx={{ mt: 4 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Cartilla de Especialistas
      </Typography>
      <Box sx={{ height: "70vh", overflow: "auto", mt: 2, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
        <Grid container spacing={4}>
          {specialists.map((specialist, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <SpecialistCard
                showDetails={true}
                firstName={specialist.firstName}
                lastName={specialist.lastName}
                speciality={specialist.speciality}
                branch={specialist.branch}
                schedules={specialist.schedules}
                onClick={() => {}}
                id={specialist.id}
                dni={specialist.dni}
                appointments={specialist.appointments}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default SpecialistList;

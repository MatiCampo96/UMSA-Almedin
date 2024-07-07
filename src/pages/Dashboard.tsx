import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ height: "76vh", overflow: "auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1">Bienvenido al panel de AlMedin.</Typography>
        <Typography variant="body1">
          Aquí encontraras las estadísticas de la aplicación.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;

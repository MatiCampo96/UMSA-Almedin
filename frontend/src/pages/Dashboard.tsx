import React from "react";
import { Container, Typography, Box } from "@mui/material";

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          height: "76vh",
          overflow: "auto",
          p: 3,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          Bienvenido al panel de AlMedin.
        </Typography>
        <Typography variant="body1">
          Aquí encontraras las estadísticas de la aplicación.
        </Typography>
      </Box>
    </Container>
  );
};

export default Dashboard;

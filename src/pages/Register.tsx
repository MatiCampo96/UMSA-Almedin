import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Register: React.FC = () => {
  //TODO: Logica de registro
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Registrarme
        </Typography>
        <form noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="firstName"
            label="Nombre"
            name="firstName"
            autoComplete="firstName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Apellido"
            name="lastName"
            autoComplete="lastName"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electrónico"
            name="email"
            autoComplete="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Registrarme
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Register;

import React from 'react';
import { Container, Typography, TextField, Button, Box } from '@mui/material';

const Login: React.FC = () => {
  //TODO: Logica de iniciar sesion
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <form noValidate>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electronico"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
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
            Iniciar sesion
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;

import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './components/Navbar';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container component="main" sx={{ mt: 8, mb: 2 }}>
        <h1>Trabajo Practico Grupo 10</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Container>
    </>
  );
};

export default App;

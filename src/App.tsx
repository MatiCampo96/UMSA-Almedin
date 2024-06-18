import React from 'react';
import { CssBaseline, Container } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Container component="main" sx={{ mt: 8, mb: 2 }}>
        <h1>AlMedin</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </Container>
      <Footer />
    </>
  );
};

export default App;

import React from 'react';
import { Container, Typography, Box, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box component="footer" sx={{ py: 3, px: 2, mt: '40px', bgcolor: 'primary.main', color: 'white' }}>
      <Container maxWidth="lg" sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: { xs: 'column', md: 'row' } }}>
        <Typography variant="body1" sx={{ textAlign: { xs: 'center', md: 'left' } }}>
          Hecho con ♥ por el grupo 10 de Trabajo Integrador.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' }, mt: { xs: 2, md: 0 } }}>
          <Link href="#" color="inherit" variant="body2" sx={{ mx: 1 }}>
            Políticas de Privacidad
          </Link>
          <Link href="#" color="inherit" variant="body2" sx={{ mx: 1 }}>
            Términos y Condiciones
          </Link>
          <Link href="#" color="inherit" variant="body2" sx={{ mx: 1 }}>
            Contacto
          </Link>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

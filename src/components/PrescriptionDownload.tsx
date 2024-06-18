import React from 'react';
import { Container, Typography, Box, Button } from '@mui/material';

interface PrescriptionDownloadProps {
  appointmentId: string;
  onDownload: (id: string) => void;
}

const PrescriptionDownload: React.FC<PrescriptionDownloadProps> = ({ appointmentId, onDownload }) => {
  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h6" gutterBottom>
          Descargar Receta Médica
        </Typography>
        <Button variant="contained" color="primary" onClick={() => onDownload(appointmentId)}>
          Descargar Receta
        </Button>
      </Box>
    </Container>
  );
};

export default PrescriptionDownload;

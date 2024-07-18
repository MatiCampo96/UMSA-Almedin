import React from 'react';
import { Card, CardContent, Typography, Box, Button } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import DownloadIcon from '@mui/icons-material/Download';
import { Appointment, Recipe } from '../types/types';

interface AppointmentCardProps extends Appointment {
  onEdit: () => void;
  onCancel: () => void;
  onDownloadRecipes: () => void;
}

const AppointmentCard: React.FC<AppointmentCardProps> = ({
  patient, dateHour, doctor, recipes = [], queryReason, onEdit, onCancel, onDownloadRecipes
}) => {
  const formatSpecialty = (specialty: string): string => {
    return specialty.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase());
  };

  const formatRecipe = (recipe: Recipe): string => {
    return `Recipe details: ${recipe.description}`;
  };

  return (
    <Card sx={{ maxWidth: 345, mb: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h6">
          {patient ? `${patient.firstName} ${patient.lastName}` : 'No patient info'}
        </Typography>
        <Typography color="text.secondary">
          {new Date(dateHour).toLocaleString()}
        </Typography>
        <Typography color="text.secondary">
          {doctor ? `${doctor.firstName} ${doctor.lastName} - ${formatSpecialty(doctor.speciality)}` : 'No specialist info'}
        </Typography>
        <Typography color="text.secondary">{queryReason}</Typography>
        {recipes.length > 0 && (
          <Typography color="text.secondary">
            Recetas:
            <ul>
              {recipes.map((recipe, index) => (
                <li key={index}>{formatRecipe(recipe)}</li>
              ))}
            </ul>
          </Typography>
        )}
      </CardContent>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Button
          variant="contained"
          startIcon={<EditIcon />}
          onClick={onEdit}
          aria-label="Edit appointment"
          sx={{ bgcolor: 'warning.main', color: 'white', '&:hover': { bgcolor: 'warning.dark' } }}
        >
        </Button>
        <Button
          variant="outlined"
          startIcon={<CancelIcon />}
          onClick={onCancel}
          aria-label="Cancel appointment"
          sx={{ borderColor: 'error.main', color: 'error.main', '&:hover': { borderColor: 'error.dark', color: 'error.dark' } }}
        >
        </Button>
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={onDownloadRecipes}
          aria-label="Download recipes"
          sx={{ bgcolor: 'success.main', color: 'white', '&:hover': { bgcolor: 'success.dark' } }}
        >
          Descargar recetas
        </Button>
      </Box>
    </Card>
  );
};

export default AppointmentCard;

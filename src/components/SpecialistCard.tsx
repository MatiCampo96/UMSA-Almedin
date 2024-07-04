import React from 'react';
import { Card, CardContent, Typography, CardActionArea } from '@mui/material';
import { Specialist } from '../types/types';
import { formatSchedule, sortSchedulesByDay } from '../utils/schedule';

interface SpecialistCardProps extends Specialist {
  onClick: () => void; // Función para manejar el click en la tarjeta
  showDetails: boolean; // Nueva prop para controlar la visualización de detalles
}

const SpecialistCard: React.FC<SpecialistCardProps> = ({ firstName, lastName, speciality, branch, schedules, onClick, showDetails }) => {
  const formattedSchedules = schedules ? schedules.map(formatSchedule) : [];
  const sortedSchedules = sortSchedulesByDay(formattedSchedules);

  const formatSpeciality = (speciality: string): string => {
    return speciality.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardActionArea onClick={onClick}>
        <CardContent>
          <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
          {showDetails && (
            <>
              <Typography color="text.secondary">{formatSpeciality(speciality)}</Typography>
              <Typography color="text.secondary">
                {branch ? `${branch.name} - ${branch.city}` : 'No branch info'}
              </Typography>
              <Typography color="text.secondary">
                {sortedSchedules.map(schedule => (
                  <span key={schedule.id}>
                    {schedule.day}: {schedule.entryTime} - {schedule.departureTime}
                    <br />
                  </span>
                ))}
              </Typography>
            </>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SpecialistCard;

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Schedule } from '../types';
import { formatSchedule, sortSchedulesByDay } from '../utils/schedule';


interface SpecialistCardProps {
  firstName: string;
  lastName: string;
  specialty: string;
  location: string;
  schedule: Schedule[];
}

const SpecialistCard: React.FC<SpecialistCardProps> = ({ firstName, lastName, specialty, location, schedule }) => {
  const formattedSchedules = schedule.map(formatSchedule);
  const sortedSchedules = sortSchedulesByDay(formattedSchedules);

  const formatSpecialty = (specialty: string): string => {
    return specialty.replace(/_/g, ' ');
  };
  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{firstName + " " + lastName}</Typography>
        <Typography color="text.secondary">{formatSpecialty(specialty)}</Typography>
        <Typography color="text.secondary">{location}</Typography>
        <Typography color="text.secondary">
          {sortedSchedules.map(formattedSchedule => (
            <span key={formattedSchedule.id}>
              {formattedSchedule.day} {formattedSchedule.entryTime}-{formattedSchedule.departureTime}<br />
            </span>
          ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default SpecialistCard;

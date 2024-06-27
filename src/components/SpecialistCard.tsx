import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import { Specialist } from '../types/types';
import { formatSchedule, sortSchedulesByDay } from '../utils/schedule';

const SpecialistCard: React.FC<Specialist> = ({ firstName, lastName, speciality, branch, schedules }) => {
  const formattedSchedules = schedules ? schedules.map(formatSchedule) : [];
  const sortedSchedules = sortSchedulesByDay(formattedSchedules);

  const formatSpeciality = (speciality: string): string => {
    return speciality.replace(/_/g, ' ').toLowerCase().replace(/^\w/, c => c.toUpperCase());
  };

  return (
    <Card sx={{ maxWidth: 345, mb: 2 }}>
      <CardContent>
        <Typography variant="h6">{`${firstName} ${lastName}`}</Typography>
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
      </CardContent>
    </Card>
  );
};

export default SpecialistCard;

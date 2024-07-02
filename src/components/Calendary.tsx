import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText, Box } from '@mui/material';
import { fetchAvailableSlots } from '../api/api';
import { SlotData } from '../types/types';

interface CalendarComponentProps {
  doctorId: number;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ doctorId, onDateSelect, onTimeSelect }) => {
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const slotData = await fetchAvailableSlots(doctorId);
        if (Array.isArray(slotData)) {
          setSlots(slotData);
        } else {
          setError('Invalid data format');
        }
      } catch (error) {
        console.error('Error al obtener los slots disponibles desde calendario:', error);
        setError('Error al obtener los slots disponibles');
      }
    };

    fetchSlots();
  }, [doctorId]);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    onDateSelect(date);
  };

  const handleTimeClick = (time: string) => {
    onTimeSelect(time);
  };

  if (error) {
    return <Box mt={4} color="error.main">Error: {error}</Box>;
  }

  return (
    <Box mt={4}>
      {selectedDate === null ? (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" component="h4">
              Selecciona una fecha
            </Typography>
            <List>
              {slots.map((slotData, index) => (
                <ListItem button key={index} onClick={() => handleDateClick(slotData.date)}>
                  <ListItemText primary={slotData.date} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      ) : (
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="h6" component="h4">
              Selecciona una hora para {selectedDate}
            </Typography>
            <List>
              {slots.find(slot => slot.date === selectedDate)?.slots.map((slot, idx) => (
                <ListItem button key={idx} onClick={() => handleTimeClick(slot)}>
                  <ListItemText primary={slot} />
                </ListItem>
              ))}
            </List>
          </CardContent>
        </Card>
      )}
    </Box>
  );
};

export default CalendarComponent;

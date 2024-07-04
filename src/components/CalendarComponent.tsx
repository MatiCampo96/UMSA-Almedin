import React, { useState, useEffect } from 'react';
import { Grid, Typography, Button, CircularProgress, Box, TextField } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { SlotData } from '../types/types';
import { fetchAvailableSlots } from '../api/api';
import { format } from 'date-fns';

interface CalendarComponentProps {
  doctorId: number;
  onDateSelect: (date: string) => void;
  onTimeSelect: (time: string) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ doctorId, onDateSelect, onTimeSelect }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [availableSlots, setAvailableSlots] = useState<SlotData[]>([]);
  const [loading, setLoading] = useState(false);
  const [noSlotsMessage, setNoSlotsMessage] = useState('');

  useEffect(() => {
    if (selectedDate) {
      setLoading(true);
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      fetchAvailableSlots(doctorId)
        .then((slots) => {
          const filteredSlots = slots.filter((slot) => slot.date === formattedDate);
          setAvailableSlots(filteredSlots);
          if (filteredSlots.length === 0) {
            setNoSlotsMessage('No hay horas disponibles para la fecha seleccionada.');
          } else {
            setNoSlotsMessage('');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching slots:', error);
          setLoading(false);
        });
    }
  }, [selectedDate, doctorId]);

  const handleDateChange = (newValue: Date | null) => {
    setSelectedDate(newValue);
    if (newValue) {
      const formattedDate = format(newValue, 'yyyy-MM-dd');
      onDateSelect(formattedDate);
    }
  };

  const handleTimeSelect = (time: string) => {
    onTimeSelect(time);
  };

  return (
    <Box sx={{ mt: 2 }}>
      <DatePicker
        label="Seleccionar Fecha"
        value={selectedDate}
        onChange={handleDateChange}
        renderInput={(params) => <TextField {...params} />}
      />
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {noSlotsMessage ? (
            <Typography variant="h6" color="error" sx={{ mt: 2 }}>{noSlotsMessage}</Typography>
          ) : (
            <Grid container spacing={2} sx={{ mt: 2 }}>
              {availableSlots.map((slot, index) => (
                <Grid item key={index} xs={12}>
                  <Typography variant="h6">Horas disponibles para {slot.date}:</Typography>
                  <Grid container spacing={1}>
                    {slot.slots.map((time, timeIndex) => (
                      <Grid item key={timeIndex}>
                        <Button variant="outlined" onClick={() => handleTimeSelect(time)}>
                          {time}
                        </Button>
                      </Grid>
                    ))}
                  </Grid>
                </Grid>
              ))}
            </Grid>
          )}
        </>
      )}
    </Box>
  );
};

export default CalendarComponent;

import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';

interface TimePickerProps {
  slots: string[];
  selectedDate: string | null;
  onTimeSelect: (time: string) => void;
}

const TimePicker: React.FC<TimePickerProps> = ({ slots, selectedDate, onTimeSelect }) => {
  if (!selectedDate) return null;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h3">
          Selecciona una hora para {selectedDate}
        </Typography>
        <List>
          {slots.map((slot, index) => (
            <ListItem button key={index} onClick={() => onTimeSelect(slot)}>
              <ListItemText primary={slot} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default TimePicker;

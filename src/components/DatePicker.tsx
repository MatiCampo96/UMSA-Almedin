import React from 'react';
import { Card, CardContent, Typography, List, ListItem, ListItemText } from '@mui/material';
import { SlotData } from '../types/types';

interface DatePickerProps {
  slots: SlotData[];
  onDateSelect: (date: string) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ slots, onDateSelect }) => {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" component="h3">
          Selecciona una fecha
        </Typography>
        <List>
          {slots.map((slotData, index) => (
            <ListItem button key={index} onClick={() => onDateSelect(slotData.date)}>
              <ListItemText primary={slotData.date} />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default DatePicker;

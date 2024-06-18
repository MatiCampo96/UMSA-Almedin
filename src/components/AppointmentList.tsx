import React from 'react';
import { List, ListItem, ListItemText, ListItemSecondaryAction, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  specialist: string;
  reason: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onEdit, onDelete }) => {
  return (
    <List>
      {appointments.map((appointment) => (
        <ListItem key={appointment.id} divider>
          <ListItemText
            primary={`${appointment.patientName} - ${appointment.date} ${appointment.time}`}
            secondary={`${appointment.specialist} - ${appointment.reason}`}
          />
          <ListItemSecondaryAction>
            <IconButton edge="end" aria-label="edit" onClick={() => onEdit(appointment.id)}>
              <EditIcon />
            </IconButton>
            <IconButton edge="end" aria-label="delete" onClick={() => onDelete(appointment.id)}>
              <DeleteIcon />
            </IconButton>
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
};

export default AppointmentList;

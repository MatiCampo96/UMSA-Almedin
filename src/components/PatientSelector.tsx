import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField, Box, Alert } from '@mui/material';
import { fetchPatients } from '../api/api';
import { Patient } from '../types/types';

interface PatientSelectorProps {
  onSelectPatient: (patientId: number) => void;
}

const PatientSelector: React.FC<PatientSelectorProps> = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (error) {
        setError('Error al cargar los pacientes');
      }
    };

    loadPatients();
  }, []);

  const handlePatientChange = (_event: React.ChangeEvent<NonNullable<unknown>>, newValue: Patient | null) => {
    setSelectedPatient(newValue);
    if (newValue) {
      onSelectPatient(newValue.id);
    }
  };

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Autocomplete
        value={selectedPatient}
        onChange={handlePatientChange}
        options={patients}
        getOptionLabel={(option) => `${option.firstName} ${option.lastName}`}
        renderInput={(params) => <TextField {...params} label="Seleccionar paciente" variant="outlined" />}
        filterOptions={(options, params) => {
          const filtered = options.filter((option) =>
            option.firstName.toLowerCase().includes(params.inputValue.toLowerCase()) ||
            option.lastName.toLowerCase().includes(params.inputValue.toLowerCase())
          );
          return filtered;
        }}
        sx={{ width: '100%' }}
      />
    </Box>
  );
};

export default PatientSelector;

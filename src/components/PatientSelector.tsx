import React, { useEffect, useState } from 'react';
import { Autocomplete, TextField } from '@mui/material';
import { fetchPatients } from '../api/api'; // Asegúrate de importar tu método fetchPatients
import { Patient } from '../types/types'; // Asegúrate de importar el tipo Patient

interface PatientSelectorProps {
  onSelectPatient: (patientId: number) => void; // Función para manejar la selección del paciente
}

const PatientSelector: React.FC<PatientSelectorProps> = ({ onSelectPatient }) => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    const loadPatients = async () => {
      try {
        const data = await fetchPatients();
        setPatients(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadPatients();
  }, []);

  return (
    <Autocomplete
      value={selectedPatient}
      onChange={(event, newValue) => {
        setSelectedPatient(newValue);
        if (newValue) {
          onSelectPatient(newValue.id); // Pasar el ID del paciente seleccionado al padre
        }
      }}
      options={patients}
      getOptionLabel={(option) => `${option.firstName} ${option.lastName}`} // Mostrar nombre y apellido
      renderInput={(params) => <TextField {...params} label="Seleccionar paciente" variant="outlined" />}
      filterOptions={(options, params) => {
        const filtered = options.filter((option) =>
          option.firstName.toLowerCase().includes(params.inputValue.toLowerCase()) ||
          option.lastName.toLowerCase().includes(params.inputValue.toLowerCase())
        );
        return filtered;
      }}
    />
  );
};

export default PatientSelector;

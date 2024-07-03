import React from 'react';
import { TextField } from '@mui/material';

interface QueryReasonInputProps {
  queryReason: string;
  setQueryReason: (value: string) => void;
}

const QueryReasonInput: React.FC<QueryReasonInputProps> = ({ queryReason, setQueryReason }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQueryReason(event.target.value);
  };

  return (
    <TextField
      label="Motivo de la consulta"
      multiline
      rows={4}
      value={queryReason}
      onChange={handleChange}
      variant="outlined"
      fullWidth
    />
  );
};

export default QueryReasonInput;

import React, { useState, useEffect } from 'react';
import { fetchAppointments, fetchAppointmentDetails, updateAppointment } from '../api/api';
import { Appointment, AppointmentUpdate } from '../types/types';
import { Button, Stepper, Step, StepLabel, TextField } from "@mui/material";

const UpdateAppointmentStepper = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [appointmentDetails, setAppointmentDetails] = useState<AppointmentUpdate | null>(null);
  const [updatedData, setUpdatedData] = useState<AppointmentUpdate>({
    id: undefined,
    doctor_id: 0,
    patient_id: 0,
    queryReason: '',
    dateHour: '',
  });

  useEffect(() => {
    const loadAppointments = async () => {
      try {
        const data = await fetchAppointments();
        setAppointments(data);
      } catch (error) {
        console.error(error);
      }
    };

    loadAppointments();
  }, []);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSelectAppointment = async (id: number) => {
    // API call to fetch appointment details
    try {
      const details = await fetchAppointmentDetails(id);
      console.log('Appointment Details:', details);
      const appointmentUpdate: AppointmentUpdate = {
        id: details.id,
        doctor_id: details.doctor.id,
        patient_id: details.patient.id,
        queryReason: details.queryReason,
        dateHour: details.dateHour.substring(0, 16), // For datetime-local input
      };
      setAppointmentDetails(appointmentUpdate);
      setUpdatedData(appointmentUpdate);
    } catch (error) {
      console.error(error);
    }
    handleNext();
  };

  const handleUpdateDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      const updatedAppointment = await updateAppointment(updatedData);
      console.log('Updated Appointment:', updatedAppointment);
      // Handle success (e.g., show a success message, navigate to another page, etc.)
    } catch (error) {
      console.error('Error updating appointment:', error);
      // Handle error (e.g., show an error message)
    }
  };

  const steps = ['Elegir el Turno', 'Actualizar los datos', 'Confirmar y guardar'];

  return (
    <div>
      <Stepper activeStep={activeStep}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {activeStep === 0 && (
        <div>
          <h2>Seleccionar Turno</h2>
          {appointments.map((appointment) => (
            <Button key={appointment.id} onClick={() => handleSelectAppointment(appointment.id)}>
              {appointment.patient.firstName} {appointment.patient.lastName} - {new Date(appointment.dateHour).toLocaleString()}
            </Button>
          ))}
        </div>
      )}

      {activeStep === 1 && appointmentDetails && (
        <div>
          <h2>Actualizar Datos</h2>
          <TextField
            label="Motivo de Consulta"
            name="queryReason"
            value={updatedData.queryReason}
            onChange={handleUpdateDataChange}
            fullWidth
          />
          <TextField
            label="Fecha y Hora"
            name="dateHour"
            type="datetime-local"
            value={updatedData.dateHour}
            onChange={handleUpdateDataChange}
            fullWidth
          />
          <Button onClick={handleBack}>Atrás</Button>
          <Button onClick={handleNext}>Siguiente</Button>
        </div>
      )}

      {activeStep === 2 && (
        <div>
          <h2>Confirmar y Guardar</h2>
          <p>Motivo de Consulta: {updatedData.queryReason}</p>
          <p>Fecha y Hora: {updatedData.dateHour}</p>
          <Button onClick={handleBack}>Atrás</Button>
          <Button onClick={handleSave}>Guardar</Button>
        </div>
      )}
    </div>
  );
};

export default UpdateAppointmentStepper;

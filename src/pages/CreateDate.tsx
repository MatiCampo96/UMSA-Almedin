import React, { useState, useEffect } from 'react';
import { Container, Typography, Stepper, Step, StepLabel, Button, Grid, CircularProgress, Snackbar, Alert, Divider } from '@mui/material';
import SpecialityCard from '../components/SpecialityCard';
import SpecialistCard from '../components/SpecialistCard';
import PatientSelector from '../components/PatientSelector'; // Asegúrate de importar tu nuevo componente PatientSelector
import QueryReasonInput from '../components/QueryReasonInput'; // Importa tu nuevo componente QueryReasonInput
import { formatDateHour } from '../utils/dateHour'; // Importa la función formatDateTime


import CalendarComponent from '../components/Calendary';
import { fetchSpecialties, fetchSpecialistsBySpeciality, createAppointment } from '../api/api';
import { Specialist, Branch } from '../types/types';
import BranchCard from '../components/BranchCard'; // Importa el componente BranchCard aquí
import { getSpecialistsByBranch, getBranchesFromSpecialists } from '../services/CreateDate'; // Importa la función getSpecialistsByBranch


const steps = [
  'Seleccionar Especialidad',
  'Seleccionar Centro Médico',
  'Seleccionar Especialista y Paciente',
  'Seleccionar Fecha y Hora',
  'Complete el motivo de la consulta'
];

const stepDescription = [
  'Elija una especialidad medica',
  'Seleccione un centro medico',
  'Seleccione un paciente y profesional',
  'Elija fecha y hora para su consulta',
  'Complete el motivo de la consulta'
];

const CreateDate: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [specialities, setSpecialties] = useState<string[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(null);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<number>(); // Estado para la ID del especialista seleccionado 
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<number | undefined>(undefined);
  const [queryReason, setQueryReason] = useState<string>('');

  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  // const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null); // Nuevo estado para la sucursal seleccionada
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<number>(); // Estado para la ID del especialista seleccionado
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  //SNACK; EXPORTAR!!
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');


  const selectedDateHour = formatDateHour(selectedDate, selectedTime)


  useEffect(() => {
    const getSpecialties = async () => {
      try {
        const data = await fetchSpecialties();
        setSpecialties(data);
      } catch (error) {
        console.error("Error encontrando especialidades:", error);
      } finally {
        setLoading(false);
      }
    };

    getSpecialties();
  }, []);

  const handleSelectSpeciality = async (speciality: string) => {
    try {
      setSelectedSpeciality(speciality);
      const specialistsData = await fetchSpecialistsBySpeciality(speciality);
      setSpecialists(specialistsData);

      // Obtener sucursales únicas directamente desde los especialistas obtenidos
      const uniqueBranches = getBranchesFromSpecialists(specialistsData);
      setFilteredBranches(uniqueBranches);

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.error("Error al cargar los especialistas:", error);
    }
  };


  const handleSelectBranch = (branch: Branch) => {
    // setSelectedBranch(branch);

    // Obtener los especialistas por sucursal usando tu función getSpecialistsByBranch
    const specialistsByBranch = getSpecialistsByBranch(specialists);

    // Actualizar la lista de especialistas con los especialistas de la sucursal seleccionada
    const branchSpecialists = specialistsByBranch.get(branch.id) || [];
    setSpecialists(branchSpecialists);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSelectSpecialist = async (specialistId: number) => {
    try {
      setSelectedSpecialistId(specialistId);
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      console.error("Error al obtener los slots disponibles:", error);
    }
  };

  const handleSelectPatient = (patientId: number) => {
    setSelectedPatientId(patientId);
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreateAppointment = async () => {
    if (!selectedSpecialistId || !selectedPatientId || !selectedDate || !selectedDateHour || !queryReason) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const appointment = {
      doctor_id: selectedSpecialistId,
      patient_id: selectedPatientId,
      queryReason: queryReason,
      dateHour: selectedDateHour,
    };

    try {
      const createdAppointment = await createAppointment(appointment);
      console.log('Appointment created:', createdAppointment);

      setSnackbarMessage('Cita creada satisfactoriamente');
      setSnackbarSeverity('success');
      setSnackbarOpen(true);
    } catch (error) {
      console.error(error);

      setSnackbarMessage('Error al crear la cita');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
    }
  };


  if (loading) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Cargando Especialidades...
        </Typography>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Crear Turno Médico
      </Typography>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => (
          <Step key={index}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
      <div>
        {activeStep === 0 && (
          <Grid container spacing={2}>
            <SpecialityCard specialities={specialities} onSelectSpeciality={handleSelectSpeciality} />
          </Grid>
        )}
        {activeStep === 1 && (
          <Grid container spacing={2}>
            {filteredBranches.map((branch, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                <BranchCard {...branch} onClick={() => handleSelectBranch(branch)} />
              </Grid>
            ))}
          </Grid>
        )}
{activeStep === 2 && (
  <>
    <Grid container spacing={2}>
      {/* Título para los especialistas */}
      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          Selecciona un Especialista
        </Typography>
        <Divider />
      </Grid>
      
      {/* Mostrar especialistas por sucursal */}
      {specialists.map((specialist, index) => (
        <Grid item key={index} xs={12} sm={6} md={4}>
          <SpecialistCard showDetails={false} onClick={() => handleSelectSpecialist(specialist.id)} {...specialist} />
        </Grid>
      ))}
      
      {/* Título para el selector de pacientes */}
      <Grid item xs={12}>
        <Typography variant="h6" align="center">
          Selecciona un Paciente
        </Typography>
        <Divider />
      </Grid>
      
      {/* Selector de pacientes */}
      <Grid item xs={12} sm={6} md={4}>
        <PatientSelector onSelectPatient={handleSelectPatient} />
      </Grid>
    </Grid>
    
    {/* Muestra el ID del paciente y especialista seleccionado como ejemplo */}
    {selectedPatientId && <Typography>ID del paciente seleccionado: {selectedPatientId}</Typography>}
    {selectedSpecialistId && <Typography>ID del especialista seleccionado: {selectedSpecialistId}</Typography>}
  </>
)}
         {activeStep === 3 && (
          <Grid container spacing={2}>
            {/* Mostrar calendario */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Seleccionar Fecha y Hora:
              </Typography>
              {selectedSpecialistId !== undefined && (
                <CalendarComponent
                  doctorId={selectedSpecialistId}
                  onDateSelect={handleDateSelect}
                  onTimeSelect={handleTimeSelect}
                />
              )}
            </Grid>
            </Grid>
        )}
        {activeStep === 4 && (
        <QueryReasonInput queryReason={queryReason} setQueryReason={setQueryReason} />
      )}
      </div>
      <Typography>{stepDescription[activeStep]}</Typography>
      <div>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Atrás
        </Button>
        {activeStep < steps.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={activeStep === 0}
          >
            Siguiente
          </Button>
        )}
        {activeStep === steps.length - 1 && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleCreateAppointment()}
          >
            Crear Turno
          </Button>
        )}
      </div>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default CreateDate;
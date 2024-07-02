import React, { useState, useEffect } from 'react';
import { Container, Typography, Stepper, Step, StepLabel, Button, Grid, CircularProgress } from '@mui/material';
import SpecialityCard from '../components/SpecialityCard';
import SpecialistCard from '../components/SpecialistCard';
import CalendarComponent from '../components/Calendary';
import { fetchSpecialties, fetchSpecialistsBySpeciality } from '../api/api';
import { Specialist, Branch } from '../types/types';
import BranchCard from '../components/BranchCard'; // Importa el componente BranchCard aquí
import { getSpecialistsByBranch, getBranchesFromSpecialists } from '../services/CreateDate'; // Importa la función getSpecialistsByBranch


const steps = [
  'Seleccionar Especialidad',
  'Seleccionar Centro Médico',
  'Seleccionar Especialista y Paciente',
  'Seleccionar Fecha y Hora'
];

const stepDescription = [
  'Elija una especialidad medica',
  'Seleccione un centro medico',
  'Seleccione un paciente y profesional',
  'Elija fecha y hora para su consulta'
];

const CreateDate: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [specialities, setSpecialties] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpeciality, setSelectedSpeciality] = useState<string | null>(null);
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null); // Nuevo estado para la sucursal seleccionada
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<number | null>(null); // Estado para la ID del especialista seleccionado



  useEffect(() => {
    const getSpecialties = async () => {
      try {
        const data = await fetchSpecialties();
        setSpecialties(data);
      } catch (error) {
        console.error('Error encontrando especialidades:', error);
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
      console.error('Error al cargar los especialistas:', error);
    }
  };


  const handleSelectBranch = (branch: Branch) => {
    setSelectedBranch(branch);

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
      console.error('Error al obtener los slots disponibles:', error);
    }
  };
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleCreateAppointment = (data: {
    patientName: string;
    date: string;
    time: string;
    specialist: string;
    reason: string;
  }) => {
    console.log('Crear Turno:', data);
    // TODO: Lógica para enviar la solicitud del turno
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
          <Grid container spacing={2}>
            {/* Mostrar especialistas por sucursal */}
            {specialists.map((specialist, index) => (
              <Grid item key={index} xs={12} sm={6} md={4}>
                 <SpecialistCard onClick={() => handleSelectSpecialist(specialist.id)} {...specialist} />
              </Grid>
            ))}
          </Grid>
        )}
         {activeStep === 3 && (
          <Grid container spacing={2}>
            {/* Mostrar calendario */}
            <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>Seleccionar Fecha y Hora:</Typography>
            <CalendarComponent doctorId={selectedSpecialistId} />
            </Grid>
          </Grid>
        )}
      </div>
      <Typography>{stepDescription[activeStep]}</Typography>
      <div>
        <Button disabled={activeStep === 0} onClick={handleBack}>
          Atrás
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext} disabled={activeStep === 0}>
          Siguiente
        </Button>
      </div>
    </Container>
  );
};

export default CreateDate;

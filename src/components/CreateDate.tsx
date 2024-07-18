import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Grid,
  CircularProgress,
  Snackbar,
  Alert,
  Divider,
  Box,
} from "@mui/material";
import SpecialityCard from "./SpecialityCard";
import SpecialistCard from "./SpecialistCard";
import PatientSelector from "./PatientSelector";
import QueryReasonInput from "./QueryReasonInput";
import { formatDateHour } from "../utils/dateHour";
import CalendarComponent from "./CalendarComponent";
import {
  fetchSpecialties,
  fetchSpecialistsBySpeciality,
  createAppointment,
} from "../api/api";
import { Specialist, Branch } from "../types/types";
import BranchCard from "./BranchCard";
import {
  getSpecialistsByBranch,
  getBranchesFromSpecialists,
} from "../services/CreateDate";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const steps = [
  "Seleccionar Especialidad",
  "Seleccionar Centro Médico",
  "Seleccionar Especialista y Paciente",
  "Seleccionar Fecha y Hora",
  "Complete el motivo de la consulta",
];

const stepDescription = [
  "Elija una especialidad medica",
  "Seleccione un centro medico",
  "Seleccione un paciente y profesional",
  "Elija fecha y hora para su consulta",
  "Complete el motivo de la consulta",
];

const CreateDate: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [specialities, setSpecialties] = useState<string[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<number>(); // Estado para la ID del especialista seleccionado
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState<number | undefined>(
    undefined
  );
  const [queryReason, setQueryReason] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  // SNACKBAR
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">(
    "success"
  );

  const selectedDateHour = formatDateHour(
    selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
    selectedTime
  );

  const navigate = useNavigate();

  useEffect(() => {
    const getSpecialties = async () => {
      try {
        const data = await fetchSpecialties();
        setSpecialties(data);
      } catch (error) {
        setSnackbarMessage("Error encontrando especialidades");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
      } finally {
        setLoading(false);
      }
    };

    getSpecialties();
  }, []);

  const handleSelectSpeciality = async (speciality: string) => {
    try {
      const specialistsData = await fetchSpecialistsBySpeciality(speciality);
      setSpecialists(specialistsData);

      // Obtener sucursales únicas directamente desde los especialistas obtenidos
      const uniqueBranches = getBranchesFromSpecialists(specialistsData);
      setFilteredBranches(uniqueBranches);

      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } catch (error) {
      setSnackbarMessage("Error al cargar los especialistas");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSelectBranch = (branch: Branch) => {
    // Obtener los especialistas por sucursal usando tu función getSpecialistsByBranch
    const specialistsByBranch = getSpecialistsByBranch(specialists);

    // Actualizar la lista de especialistas con los especialistas de la sucursal seleccionada
    const branchSpecialists = specialistsByBranch.get(branch.id) || [];
    setSpecialists(branchSpecialists);

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSelectSpecialist = async (specialistId: number) => {
    setSelectedSpecialistId(specialistId);
    proceedToNextStepIfReady(specialistId, selectedPatientId);
  };

  const handleSelectPatient = (patientId: number) => {
    setSelectedPatientId(patientId);
    proceedToNextStepIfReady(selectedSpecialistId, patientId);
  };

  const proceedToNextStepIfReady = (
    specialistId?: number,
    patientId?: number
  ) => {
    if (specialistId && patientId) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(new Date(date));
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
    if (
      !selectedSpecialistId ||
      !selectedPatientId ||
      !selectedDate ||
      !selectedDateHour ||
      !queryReason
    ) {
      setSnackbarMessage("Por favor, completa todos los campos.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }

    // Convert selectedDateHour to UTC
    const dateHourUTC = new Date(selectedDateHour).toISOString();

    const appointment = {
      doctor_id: selectedSpecialistId,
      patient_id: selectedPatientId,
      queryReason: queryReason,
      dateHour: dateHourUTC, // Use the UTC date
    };

    try {
      await createAppointment(appointment);
      setSnackbarMessage("Cita creada satisfactoriamente");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/turnos");
    } catch (error) {
      setSnackbarMessage("Error al crear la cita");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="lg">
        <Typography variant="h4" component="h1" gutterBottom>
          Cargando Especialidades...
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          height: "76vh",
          overflow: "auto",
          p: 3, // Add padding
          bgcolor: "background.paper", // Add background color
          borderRadius: 2, // Add border radius for rounded corners
          boxShadow: 3, // Add box shadow for depth
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h4" component="h1" gutterBottom>
          Crear Turno Médico
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={4} sx={{ width: "100%" }}>
          {activeStep === 0 && (
            <Grid container spacing={2}>
              <SpecialityCard
                specialities={specialities}
                onSelectSpeciality={handleSelectSpeciality}
              />
            </Grid>
          )}
          {activeStep === 1 && (
            <Grid container spacing={2}>
              {filteredBranches.map((branch, index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <BranchCard
                    {...branch}
                    onClick={() => handleSelectBranch(branch)}
                  />
                </Grid>
              ))}
            </Grid>
          )}
          {activeStep === 2 && (
            <>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    Selecciona un Especialista
                  </Typography>
                  <Divider />
                </Grid>
                {specialists.map((specialist, index) => (
                  <Grid item key={index} xs={12} sm={6} md={4}>
                    <SpecialistCard
                      showDetails={false}
                      onClick={() => handleSelectSpecialist(specialist.id)}
                      {...specialist}
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Typography variant="h6" align="center">
                    Selecciona un Paciente
                  </Typography>
                  <Divider />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                  <PatientSelector onSelectPatient={handleSelectPatient} />
                </Grid>
              </Grid>
              {selectedPatientId && (
                <Typography>
                  ID del paciente seleccionado: {selectedPatientId}
                </Typography>
              )}
              {selectedSpecialistId && (
                <Typography>
                  ID del especialista seleccionado: {selectedSpecialistId}
                </Typography>
              )}
            </>
          )}
          {activeStep === 3 && (
            <Grid container spacing={2}>
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
            <QueryReasonInput
              queryReason={queryReason}
              setQueryReason={setQueryReason}
            />
          )}
        </Box>
        <Typography>{stepDescription[activeStep]}</Typography>
        <Box mt={2} display="flex" justifyContent="space-between" width="100%">
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Atrás
          </Button>
          {activeStep < steps.length - 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={
                activeStep === 2 &&
                (!selectedSpecialistId || !selectedPatientId)
              }
            >
              Siguiente
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleCreateAppointment}
            >
              Crear Turno
            </Button>
          )}
        </Box>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={6000}
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert
            onClose={() => setSnackbarOpen(false)}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default CreateDate;

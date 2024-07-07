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
import SpecialityCard from "../components/SpecialityCard";
import SpecialistCard from "../components/SpecialistCard";
import QueryReasonInput from "../components/QueryReasonInput";
import { formatDateHour } from "../utils/dateHour";
import CalendarComponent from "../components/CalendarComponent";
import {
  fetchSpecialties,
  fetchSpecialistsBySpeciality,
  userUpdateAppointment,
} from "../api/api";
import { Specialist, Branch } from "../types/types";
import BranchCard from "../components/BranchCard";
import {
  getSpecialistsByBranch,
  getBranchesFromSpecialists,
} from "../services/CreateDate";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";

const steps = [
  "Seleccionar Especialidad",
  "Seleccionar Centro Médico",
  "Seleccionar Especialista",
  "Seleccionar Fecha y Hora",
  "Complete el motivo de la consulta",
];

const stepDescription = [
  "Elija una especialidad médica",
  "Seleccione un centro médico",
  "Seleccione un profesional",
  "Elija fecha y hora para su consulta",
  "Complete el motivo de la consulta",
];

const UpdateDate: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [specialities, setSpecialties] = useState<string[]>([]);
  const [filteredBranches, setFilteredBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState<number>();
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
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
  const { appointmentId } = useParams<{ appointmentId: string }>();

  useEffect(() => {
    const getSpecialties = async () => {
      try {
        const data = await fetchSpecialties();
        setSpecialties(data);
      } catch (error) {
        throw new Error("Error encontrando especialidades");
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
      throw new Error("Error al cargar los especialistas");
    }
  };

  const handleSelectBranch = (branch: Branch) => {
    const specialistsByBranch = getSpecialistsByBranch(specialists);
    const branchSpecialists = specialistsByBranch.get(branch.id) || [];
    setSpecialists(branchSpecialists);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleSelectSpecialist = async (specialistId: number) => {
    setSelectedSpecialistId(specialistId);
    proceedToNextStepIfReady(specialistId);
  };

  const proceedToNextStepIfReady = (specialistId?: number) => {
    if (specialistId) {
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

  const handleUpdateAppointment = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("No se encontró el token de autenticación");
      return;
    }

    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const decodedPayload = atob(encodedPayload);
    const payload = JSON.parse(decodedPayload);
    const patientId = payload.id; // Ajusta según el nombre del claim en tu token

    if (
      !selectedSpecialistId ||
      !patientId ||
      !selectedDate ||
      !selectedDateHour ||
      !queryReason
    ) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const dateHourUTC = new Date(selectedDateHour).toISOString();

    const appointment = {
      doctor_id: selectedSpecialistId,
      patient_id: patientId,
      queryReason: queryReason,
      dateHour: dateHourUTC,
    };

    try {
      await userUpdateAppointment(Number(appointmentId), appointment);
      setSnackbarMessage("Cita actualizada satisfactoriamente");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      navigate("/turnos");
    } catch (error) {
      setSnackbarMessage("Error al actualizar la cita");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      throw new Error("Error al actualizar la cita");
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
    <Container maxWidth="lg">
      <Box sx={{ height: "70vh", overflow: "auto" }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Actualizar Turno Médico
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((label, index) => (
            <Step key={index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box mt={4}>
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
              </Grid>
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
        <Box mt={2}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Atrás
          </Button>
          {activeStep < steps.length - 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={activeStep === 2 && !selectedSpecialistId}
            >
              Siguiente
            </Button>
          )}
          {activeStep === steps.length - 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdateAppointment}
            >
              Actualizar Turno
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

export default UpdateDate;

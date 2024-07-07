import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateAppointment from "./pages/CreateAppointment";
import UpdateDate from "./pages/UpdateDate";
import SpecialistList from "./pages/SpecialistList";
import { AuthProvider } from "./context/AuthContext";
import AppointmentList from "./pages/AppointmentList";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/turnos" element={<AppointmentList />} />
            <Route path="/turnos/crear" element={<CreateAppointment />} />
            <Route path="/turnos/actualizar/:appointmentId" element={<UpdateDate />} />
            <Route path="/especialistas" element={<SpecialistList />} />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default App;

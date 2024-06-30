import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateAppointment from "./pages/CreateAppointment";
import CreateDate from "./pages/CreateDate";
import SpecialistList from "./pages/SpecialistList";
import UpdateAppointment from "./pages/UpdateAppointment";
import CancelAppointment from "./pages/CancelAppointment";
import DownloadPrescription from "./pages/DownloadPrescription";
import { AuthProvider } from "./context/AuthContext";
import AppointmentList from "./pages/AppointmentList";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <AuthProvider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/turnos" element={<AppointmentList />} />
            <Route path="/turnos/crear" element={<CreateAppointment />} />
            <Route path="/turnos/crear_cita" element={<CreateDate />} />
            <Route path="/especialistas" element={<SpecialistList />} />
            <Route path="/turnos/actualizar" element={<UpdateAppointment />} />
            <Route path="/turnos/cancelar" element={<CancelAppointment />} />
            <Route
              path="/recetas/descargar"
              element={<DownloadPrescription />}
            />
          </Routes>
          <Footer />
        </AuthProvider>
      </Router>
    </>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import CreateAppointment from './pages/CreateAppointment';
import SpecialistList from './pages/SpecialistList';
import UpdateAppointment from './pages/UpdateAppointment';
import CancelAppointment from './pages/CancelAppointment';
import DownloadPrescription from './pages/DownloadPrescription';

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Navbar />
        // Pasar a routes.tsx
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-appointment" element={<CreateAppointment />} />
          <Route path="/specialists" element={<SpecialistList />} />
          <Route path="/update-appointment" element={<UpdateAppointment />} />
          <Route path="/cancel-appointment" element={<CancelAppointment />} />
          <Route path="/download-prescription" element={<DownloadPrescription />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default App;

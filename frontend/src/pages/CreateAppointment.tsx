import React from "react";
import CreateDate from "../components/CreateDate";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";

const CreateAppointment: React.FC = () => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <CreateDate />
    </LocalizationProvider>
  );
};

export default CreateAppointment;

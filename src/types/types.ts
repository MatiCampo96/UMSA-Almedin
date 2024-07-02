//Interfaces, pedidas en Typescript
export interface Schedule {
    id: number;
    day: string;
    entryTime: string;
    departureTime: string;
  }

  export interface Branch {
    id: number;
    name: string;
    address: string;
    city: string;
  }

  export interface Specialist {
    id: number;
    firstName: string;
    lastName: string;
    dni: string;
    speciality: string;
    schedules: Schedule[];
    branch: Branch;
    appointments: Appointment[];
  }

  export interface Patient {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    Role: string;
    appointments: Appointment[];
  }

  export interface Recipe {
    id: number;
    description: string;
    appointment: Appointment;
    issueDate: Date;
  }

  export interface Appointment {
    id: number;
    dateHour: Date;
    patient: Patient;
    doctor: Specialist;
    recipes: Recipe[];
    queryReason: string;
  }

  export interface Specialties {
    specialties: string[];
  }
  
  export interface SlotData {
    date: string;
    slots: string[];
  }

  export interface AvailableSlots {
    [date: string]: string[];
  }
  
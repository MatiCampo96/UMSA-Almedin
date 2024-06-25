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
    speciality: string;
    schedules: Schedule[];
    branch: Branch;
  }
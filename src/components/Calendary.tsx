import React, { useState, useEffect } from 'react';
import { fetchAvailableSlots } from '../api/api';
import { SlotData } from '../types/types';

const CalendarComponent: React.FC<{ doctorId: number }> = ({ doctorId }) => {
    const [slots, setSlots] = useState<string[]>([]);
  
    useEffect(() => {
      const fetchSlots = async () => {
        try {
          const slotData = await fetchAvailableSlots(doctorId);
          console.log(doctorId)
          console.log(slotData)
          setSlots(slotData);
        } catch (error) {
          console.error('Error al obtener los slots disponibles desde calendario:', error);
        }
      };
  
      fetchSlots();
    }, [doctorId]); // Ejecutar solo cuando cambia el doctorId
  



//   const generateSlots = (slotData: SlotData[]): string[] => {
//     const generatedSlots: string[] = [];
  
//     slotData.forEach((slot) => {
//       // Genera los slots a partir de los objetos SlotData
//       generatedSlots.push(`${slot.date} - ${slot.slots}`);
//     });
  
//     return generatedSlots;
//   };

  return (
    <div>
      <h2>Calendario de Citas</h2>
      <ul>
        {slots.map((slot, index) => (
          <li key={index}>{slot}</li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarComponent;
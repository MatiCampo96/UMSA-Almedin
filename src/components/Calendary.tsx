import React, { useState, useEffect } from 'react';
import { fetchAvailableSlots } from '../api/api';
import { SlotData } from '../types/types';

const CalendarComponent: React.FC<{ doctorId: number }> = ({ doctorId }) => {
  const [slots, setSlots] = useState<SlotData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSlots = async () => {
      try {
        const slotData = await fetchAvailableSlots(doctorId);
        if (Array.isArray(slotData)) {
          setSlots(slotData);
        } else {
          setError('Invalid data format');
        }
      } catch (error) {
        console.error('Error al obtener los slots disponibles desde calendario:', error);
        setError('Error al obtener los slots disponibles');
      }
    };

    fetchSlots();
  }, [doctorId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Calendario de Citas</h2>
      <ul>
        {slots.map((slotData, index) => (
          <li key={index}>
            <strong>{slotData.date}</strong>
            <ul>
              {slotData.slots.map((slot, idx) => (
                <li key={idx}>{slot}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CalendarComponent;

import { Specialist } from '../types/types';
import { Branch } from '../types/types';

/**
 * Función para obtener una lista de sucursales únicas a partir de una lista de especialistas.
 * @param {Array} specialists - Lista de especialistas.
 * @returns {Array} - Lista de sucursales únicas.
 */
export const getBranchesFromSpecialists = (specialists: Specialist[]): Branch[] => {
  const branchesMap = new Map<string, Branch>(); // Usamos un Map en lugar de Set para personalizar la comparación

  // Recorremos la lista de especialistas
  specialists.forEach((specialist) => {
    if (specialist.branch) {
      const { id, name, address, city } = specialist.branch;
      const branchKey = `${id}_${name}_${address}_${city}`; // Crear una clave única basada en las propiedades de Branch

      // Si la sucursal no está en el Map, la añadimos
      if (!branchesMap.has(branchKey)) {
        branchesMap.set(branchKey, specialist.branch);
      }
    }
  });

  // Convertimos el Map de sucursales de nuevo a un array de sucursales únicas
  return Array.from(branchesMap.values());
};

export const getSpecialistsByBranch = (specialists: Specialist[]): Map<number, Specialist[]> => {
    const specialistsByBranch = new Map<number, Specialist[]>();
  
    specialists.forEach((specialist) => {
      const { id } = specialist.branch;
  
      // Si la sucursal no está en el Map, la inicializamos como un array vacío
      if (!specialistsByBranch.has(id)) {
        specialistsByBranch.set(id, []);
      }
  
      // Añadimos el especialista al array correspondiente a su sucursal
      const branchSpecialists = specialistsByBranch.get(id);
      if (branchSpecialists) {
        branchSpecialists.push(specialist);
      }
    });
  
    return specialistsByBranch;
  };

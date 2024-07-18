import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { Recipe } from '../types/types'; // Asegúrate de importar el tipo Recipe

interface Column {
  header: string;
  dataKey: keyof Recipe;
}

export const generatePDF = (recipes: Recipe[]): void => {
  const doc = new jsPDF();

  // Configurar el título del PDF
  doc.text(`Recetas`, 14, 22);

  // Configurar los datos de la tabla
  const columns: Column[] = [
    { header: 'ID de la receta', dataKey: 'id' },
    { header: 'Fecha', dataKey: 'issueDate' },
    { header: 'Descripción', dataKey: 'description' },
    // Agrega más columnas según sea necesario
  ];

  const data = recipes.map(recipe => ({
    id: recipe.id,
    appointment_id : recipe.appointment_id,
    description: recipe.description,
    issueDate : recipe.issueDate
    // Agrega más datos según sea necesario
  }));

 // Agregar los datos a la tabla usando autoTable
 (doc as any).autoTable({ // Usa "(doc as any)" para evitar errores de tipo en TypeScript
    head: [columns.map(col => col.header)],
    body: data.map(item => columns.map(col => item[col.dataKey])),
    startY: 30,
  });

  // Descargar el PDF
  doc.save('recetas.pdf');
};

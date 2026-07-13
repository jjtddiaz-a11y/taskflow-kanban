/**
 * @file Punto de entrada de la aplicación React.
 * Configura el proveedor de Drag & Drop (react-dnd) y
 * renderiza el componente raíz.
 * 
 * @module main
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './index.css';
import App from './App';

/**
 * Renderiza la aplicación en el elemento #root.
 * El DndProvider encapsula toda la app para habilitar
 * la funcionalidad de arrastrar y soltar (drag & drop).
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DndProvider backend={HTML5Backend}>
      <App />
    </DndProvider>
  </StrictMode>
);

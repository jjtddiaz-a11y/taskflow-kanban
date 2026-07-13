/**
 * @file Componente raíz de la aplicación.
 * Configura el enrutamiento y protección de rutas.
 * 
 * @module App
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

/**
 * Componente de ruta protegida.
 * Verifica existencia del token en localStorage.
 * La validación contra backend se hace al cargar el Dashboard.
 * 
 * @param {Object}  props
 * @param {ReactNode} props.children - Componente hijo protegido
 * @returns {ReactNode}
 */
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

/**
 * Componente principal de TaskFlow.
 * @returns {ReactNode}
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

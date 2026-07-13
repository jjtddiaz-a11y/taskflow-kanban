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
 * Redirige a /login si no hay token JWT en localStorage.
 * 
 * @param {Object}  props
 * @param {ReactNode} props.children - Componente hijo protegido
 * @returns {ReactNode}
 */
function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');
  return token ? children : <Navigate to="/login" replace />;
}

/**
 * Componente principal de TaskFlow.
 * Define las rutas de la aplicación.
 * 
 * @returns {ReactNode}
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública: Login/Registro */}
        <Route path="/login" element={<Login />} />

        {/* Ruta protegida: Dashboard Kanban */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Catch-all: redirige a dashboard o login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

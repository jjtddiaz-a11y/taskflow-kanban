/**
 * @file Componente raíz de la aplicación.
 * Configura el enrutamiento y protección de rutas.
 * Valida el token JWT contra el backend en cada carga.
 * 
 * @module App
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import api from './api';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

/**
 * Componente de ruta protegida.
 * Valida el token contra el backend antes de mostrar contenido.
 * 
 * @param {Object}  props
 * @param {ReactNode} props.children - Componente hijo protegido
 * @returns {ReactNode}
 */
function PrivateRoute({ children }) {
  const [status, setStatus] = useState('loading'); // loading | valid | invalid

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setStatus('invalid');
      return;
    }

    // Validar token contra el backend
    api.get('/api/tasks')
      .then(() => setStatus('valid'))
      .catch(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setStatus('invalid');
      });
  }, []);

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-800 flex items-center justify-center">
        <div className="text-white text-lg">Verificando sesión...</div>
      </div>
    );
  }

  return status === 'valid' ? children : <Navigate to="/login" replace />;
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
      </Routes>
    </BrowserRouter>
  );
}

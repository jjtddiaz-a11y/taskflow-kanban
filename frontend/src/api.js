/**
 * @file Configuración del cliente HTTP axios.
 * 
 * - Base URL configurable via variable de entorno VITE_API_URL.
 * - Interceptor de petición: añade token JWT automáticamente.
 * - Interceptor de respuesta: redirige a login si 401.
 * 
 * @module api
 */

import axios from 'axios';

/** URL base de la API. Default: localhost:5000 para desarrollo */
const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Instancia de axios preconfigurada para el proyecto.
 * @type {import('axios').AxiosInstance}
 */
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

// ─── Interceptor: Adjuntar JWT a cada petición ─────────────────────
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ─── Interceptor: Manejar errores de autenticación ─────────────────
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;

/**
 * @file Página de inicio de sesión y registro de usuarios.
 * 
 * @module pages/Login
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

/**
 * Componente de Login/Registro.
 * Alterna entre formulario de inicio de sesión y registro.
 * Al autenticarse exitosamente, guarda el token JWT en localStorage
 * y redirige al dashboard.
 * 
 * @returns {ReactNode}
 */
export default function Login() {
  const navigate = useNavigate();

  // Si ya hay sesión, redirigir al dashboard
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api.get('/api/tasks')
        .then(() => navigate('/', { replace: true }))
        .catch(() => {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        });
    }
  }, [navigate]);

  /** @type {[boolean, Function]} Alterna modo registro/login */
  const [isRegister, setIsRegister] = useState(false);

  /** @type {[Object, Function]} Estado del formulario */
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  /** @type {[string, Function]} Mensaje de error */
  const [error, setError] = useState('');

  /** @type {[boolean, Function]} Estado de carga */
  const [loading, setLoading] = useState(false);

  /**
   * Maneja el envío del formulario de autenticación.
   * Envía los datos al endpoint correspondiente según el modo.
   * 
   * @param {Event} e - Evento de submit del formulario
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isRegister ? '/api/auth/register' : '/api/auth/login';
      const { data } = await api.post(endpoint, form);

      // Persistir sesión en localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center p-4"
      role="main"
      aria-label="Formulario de autenticación"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8">
        {/* Logo y título */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800">TaskFlow</h1>
          <p className="text-slate-500 mt-1">Organiza tus tareas visualmente</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Campo: Nombre (solo registro) */}
          {isRegister && (
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="name">
                Nombre
              </label>
              <input
                id="name"
                type="text"
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                aria-label="Nombre completo"
                placeholder="Tu nombre"
              />
            </div>
          )}

          {/* Campo: Email */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              aria-label="Correo electrónico"
              placeholder="ejemplo@correo.com"
            />
          </div>

          {/* Campo: Contraseña */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="password">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              aria-label="Contraseña"
              placeholder="Mínimo 6 caracteres"
            />
          </div>

          {/* Mensaje de error */}
          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm border border-red-200" role="alert">
              {error}
            </div>
          )}

          {/* Botón de submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={isRegister ? 'Crear cuenta' : 'Iniciar sesión'}
          >
            {loading ? 'Cargando...' : isRegister ? 'Crear Cuenta' : 'Iniciar Sesión'}
          </button>
        </form>

        {/* Alternar modo registro/login */}
        <p className="text-center mt-6 text-sm text-slate-500">
          {isRegister ? '¿Ya tienes cuenta?' : '¿No tienes cuenta?'}{' '}
          <button
            className="text-blue-600 hover:underline font-medium"
            onClick={() => { setIsRegister(!isRegister); setError(''); }}
            aria-label={isRegister ? 'Ir a iniciar sesión' : 'Ir a registrarse'}
          >
            {isRegister ? 'Inicia sesión' : 'Regístrate'}
          </button>
        </p>
      </div>
    </div>
  );
}

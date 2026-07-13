/**
 * @file Punto de entrada del servidor Express.
 * Configura middlewares globales de seguridad, logging, CORS y rutas.
 * 
 * @author TaskFlow Dev
 * @version 1.0.0
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 5000;

// ─── Middleware de seguridad ───────────────────────────────────────
app.use(helmet());                    // Headers HTTP seguros (XSS, clickjacking, MIME sniffing)

// CORS abierto para desarrollo académico
app.use(cors({
  origin: function (origin, callback) {
    // Permitir peticiones sin origen (Postman, curl) y cualquier .netlify.app
    if (!origin || origin.endsWith('.netlify.app') || origin === 'http://localhost:5173') {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json({ limit: '10kb' })); // Límite de payload para evitar ataques DoS
app.use(morgan('dev'));               // Logging centralizado de peticiones

// ─── Rutas ─────────────────────────────────────────────────────────
app.get('/', (_req, res) => {
  res.json({
    name: 'TaskFlow API',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/health',
      register: 'POST /api/auth/register',
      login: 'POST /api/auth/login',
      tasks: 'GET/POST /api/tasks',
      task: 'PUT/DELETE /api/tasks/:id',
    },
  });
});

app.use('/api/auth', authRoutes);     // Autenticación (registro, login)
app.use('/api/tasks', taskRoutes);    // CRUD de tareas (requiere JWT)

// ─── Health check ──────────────────────────────────────────────────
/**
 * GET /api/health
 * Endpoint de verificación de estado del servidor.
 * @returns {Object} { status, timestamp }
 */
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// ─── Inicio del servidor ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Backend corriendo en http://localhost:${PORT}`);
});

/**
 * @file Rutas de autenticación (registro e inicio de sesión).
 * 
 * @module routes/auth
 */

const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../database');
const router = express.Router();

/**
 * POST /api/auth/register
 * Registra un nuevo usuario en el sistema.
 * 
 * - Valida que todos los campos estén presentes.
 * - Verifica que el email no esté duplicado.
 * - Hashea la contraseña con bcrypt (salt rounds: 12).
 * - El primer usuario registrado obtiene rol 'admin'.
 * - Retorna un JWT válido por 24 horas.
 * 
 * @param {Object} req.body
 * @param {string} req.body.name     - Nombre del usuario
 * @param {string} req.body.email    - Correo electrónico
 * @param {string} req.body.password - Contraseña (mín. 6 caracteres)
 * 
 * @returns {Object} 201 - { token, user: { id, name, email, role } }
 * @returns {Object} 400 - { error } si faltan campos
 * @returns {Object} 409 - { error } si el email ya existe
 */
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: 'Todos los campos son requeridos' });
  }

  // Verificar unicidad del email
  const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
  if (existing) {
    return res.status(409).json({ error: 'El email ya está registrado' });
  }

  // Hash de contraseña con bcrypt
  const hashed = bcrypt.hashSync(password, 12);

  const result = db.prepare(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)'
  ).run(name, email, hashed);

  // El primer usuario del sistema es admin automáticamente
  const userCount = db.prepare('SELECT COUNT(*) as count FROM users').get();
  let role = 'user';
  if (userCount.count === 1) {
    db.prepare('UPDATE users SET role = ? WHERE id = ?').run('admin', result.lastInsertRowid);
    role = 'admin';
  }

  // Generar token JWT
  const token = jwt.sign(
    { id: result.lastInsertRowid, name, email, role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.status(201).json({
    token,
    user: { id: result.lastInsertRowid, name, email, role },
  });
});

/**
 * POST /api/auth/login
 * Inicia sesión con credenciales existentes.
 * 
 * - Busca el usuario por email.
 * - Compara la contraseña con bcrypt.
 * - Retorna un JWT válido por 24 horas.
 * 
 * @param {Object} req.body
 * @param {string} req.body.email    - Correo electrónico
 * @param {string} req.body.password - Contraseña
 * 
 * @returns {Object} 200 - { token, user: { id, name, email, role } }
 * @returns {Object} 400 - { error } si faltan campos
 * @returns {Object} 401 - { error } si las credenciales son inválidas
 */
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña requeridos' });
  }

  const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Credenciales inválidas' });
  }

  const token = jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );

  res.json({
    token,
    user: { id: user.id, name: user.name, email: user.email, role: user.role },
  });
});

module.exports = router;

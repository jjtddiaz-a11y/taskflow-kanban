/**
 * @file Rutas CRUD de tareas.
 * Todas las rutas requieren autenticación JWT.
 * Implementa control de acceso basado en roles (RBAC).
 * 
 * @module routes/tasks
 */

const express = require('express');
const db = require('../database');
const { authMiddleware, adminMiddleware } = require('../middleware/auth');
const router = express.Router();

// ─── Proteger todas las rutas ──────────────────────────────────────
router.use(authMiddleware);

/**
 * GET /api/tasks
 * Obtiene todas las tareas del usuario autenticado.
 * Los administradores ven todas las tareas del sistema.
 * 
 * @header Authorization - Bearer <token>
 * 
 * @returns {Array<Object>} 200 - Lista de tareas
 *   @returns {number}  id          - ID de la tarea
 *   @returns {string}  title       - Título de la tarea
 *   @returns {string}  description - Descripción de la tarea
 *   @returns {string}  status      - Estado (por_hacer | en_progreso | terminado)
 *   @returns {number}  user_id     - ID del usuario propietario
 *   @returns {string}  created_at  - Fecha de creación ISO
 *   @returns {string}  updated_at  - Fecha de última actualización ISO
 */
router.get('/', (req, res) => {
  let tasks;
  if (req.user.role === 'admin') {
    tasks = db.prepare('SELECT * FROM tasks ORDER BY created_at DESC').all();
  } else {
    tasks = db.prepare(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC'
    ).all(req.user.id);
  }
  res.json(tasks);
});

/**
 * POST /api/tasks
 * Crea una nueva tarea para el usuario autenticado.
 * 
 * @header Authorization - Bearer <token>
 * 
 * @param {Object} req.body
 * @param {string} req.body.title       - Título (requerido)
 * @param {string} [req.body.description] - Descripción (opcional)
 * @param {string} [req.body.status]    - Estado (default: por_hacer)
 * 
 * @returns {Object} 201 - Tarea creada
 * @returns {Object} 400 - { error } si falta el título
 */
router.post('/', (req, res) => {
  const { title, description, status } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'El título es requerido' });
  }

  const result = db.prepare(
    'INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)'
  ).run(title, description || '', status || 'por_hacer', req.user.id);

  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(task);
});

/**
 * PUT /api/tasks/:id
 * Actualiza una tarea existente.
 * Solo el propietario o un administrador puede modificar la tarea.
 * 
 * @header Authorization - Bearer <token>
 * 
 * @param {number} req.params.id - ID de la tarea
 * 
 * @param {Object} req.body
 * @param {string} [req.body.title]       - Nuevo título
 * @param {string} [req.body.description] - Nueva descripción
 * @param {string} [req.body.status]      - Nuevo estado
 * 
 * @returns {Object} 200 - Tarea actualizada
 * @returns {Object} 403 - { error } si no tiene permisos
 * @returns {Object} 404 - { error } si la tarea no existe
 */
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  // RBAC: verificar propiedad o rol admin
  if (task.user_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'No tienes permiso para modificar esta tarea' });
  }

  db.prepare(`
    UPDATE tasks 
    SET title = COALESCE(?, title), 
        description = COALESCE(?, description),
        status = COALESCE(?, status), 
        updated_at = CURRENT_TIMESTAMP 
    WHERE id = ?
  `).run(title || null, description !== undefined ? description : null, status || null, id);

  const updated = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);
  res.json(updated);
});

/**
 * DELETE /api/tasks/:id
 * Elimina una tarea del sistema.
 * Solo el propietario o un administrador puede eliminar.
 * 
 * @header Authorization - Bearer <token>
 * 
 * @param {number} req.params.id - ID de la tarea
 * 
 * @returns {Object} 200 - { message: 'Tarea eliminada' }
 * @returns {Object} 403 - { error } si no tiene permisos
 * @returns {Object} 404 - { error } si la tarea no existe
 */
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const task = db.prepare('SELECT * FROM tasks WHERE id = ?').get(id);

  if (!task) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  // RBAC: propietario o admin
  if (task.user_id !== req.user.id && req.user.role !== 'admin') {
    return res.status(403).json({ error: 'No tienes permiso para eliminar esta tarea' });
  }

  db.prepare('DELETE FROM tasks WHERE id = ?').run(id);
  res.json({ message: 'Tarea eliminada' });
});

module.exports = router;

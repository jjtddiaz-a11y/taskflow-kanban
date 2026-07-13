/**
 * @file Middleware de autenticación y autorización.
 * 
 * @module middleware/auth
 */

const jwt = require('jsonwebtoken');

/**
 * Middleware de autenticación JWT.
 * Verifica que el token sea válido y no haya expirado.
 * Adjunta los datos del usuario decodificados a req.user.
 * 
 * @param {Object}   req  - Objeto de petición Express
 * @param {Object}   res  - Objeto de respuesta Express
 * @param {Function} next - Siguiente middleware
 * @returns {void}
 * 
 * @throws {401} Si el token falta, es inválido o expiró
 */
function authMiddleware(req, res, next) {
  const header = req.headers.authorization;

  if (!header || !header.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  const token = header.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, name, email, role }
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
}

/**
 * Middleware de autorización por rol.
 * Permite el paso solo a usuarios con rol 'admin'.
 * Debe ejecutarse DESPUÉS de authMiddleware.
 * 
 * @param {Object}   req  - Objeto de petición Express
 * @param {Object}   res  - Objeto de respuesta Express
 * @param {Function} next - Siguiente middleware
 * @returns {void}
 * 
 * @throws {403} Si el usuario no es administrador
 */
function adminMiddleware(req, res, next) {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Acción solo para administradores' });
  }
  next();
}

module.exports = { authMiddleware, adminMiddleware };

/**
 * @file Tests unitarios de autenticación.
 * Prueba middleware JWT y middleware de roles.
 * 
 * @module tests/auth.test
 */

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { authMiddleware, adminMiddleware } = require('../src/middleware/auth');

// Configurar JWT_SECRET para tests
const TEST_SECRET = 'test_secret_jwt_2026';
process.env.JWT_SECRET = TEST_SECRET;

/**
 * Helper: crea un token JWT válido para pruebas.
 * @param {Object} payload - Datos del usuario
 * @returns {string} Token JWT
 */
function createToken(payload = {}) {
  return jwt.sign(
    { id: payload.id || 1, name: payload.name || 'Test', email: payload.email || 'test@test.com', role: payload.role || 'user' },
    TEST_SECRET,
    { expiresIn: '1h' }
  );
}

/**
 * Helper: crea objetos req/res mock.
 * @returns {{ req: Object, res: Object, next: Function }}
 */
function mockReqRes() {
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const next = jest.fn();
  return { req: { headers: {} }, res, next };
}

describe('authMiddleware', () => {
  it('Debe rechazar petición sin header Authorization', () => {
    const { req, res, next } = mockReqRes();
    req.headers = {};
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token requerido' });
  });

  it('Debe rechazar header sin formato Bearer', () => {
    const { req, res, next } = mockReqRes();
    req.headers = { authorization: 'InvalidFormat token' };
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('Debe rechazar token inválido', () => {
    const { req, res, next } = mockReqRes();
    req.headers = { authorization: 'Bearer token_invalido' };
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token inválido o expirado' });
  });

  it('Debe rechazar token expirado', () => {
    const { req, res, next } = mockReqRes();
    const expiredToken = jwt.sign({ id: 1, role: 'user' }, TEST_SECRET, { expiresIn: '0s' });
    req.headers = { authorization: `Bearer ${expiredToken}` };
    authMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(401);
  });

  it('Debe aceptar token válido y decodificar usuario', () => {
    const { req, res, next } = mockReqRes();
    const token = createToken({ id: 5, name: 'Jorge', role: 'user' });
    req.headers = { authorization: `Bearer ${token}` };
    authMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
    expect(req.user.id).toBe(5);
    expect(req.user.name).toBe('Jorge');
    expect(req.user.role).toBe('user');
  });
});

describe('adminMiddleware', () => {
  it('Debe rechazar si el usuario no es admin', () => {
    const { req, res, next } = mockReqRes();
    req.user = { role: 'user' };
    adminMiddleware(req, res, next);
    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith({ error: 'Acción solo para administradores' });
  });

  it('Debe permitir paso a administradores', () => {
    const { req, res, next } = mockReqRes();
    req.user = { role: 'admin' };
    adminMiddleware(req, res, next);
    expect(next).toHaveBeenCalled();
  });
});

describe('bcrypt (seguridad de contraseñas)', () => {
  it('Debe generar hash válido para una contraseña', () => {
    const password = 'MiContraseñaSegura123!';
    const hash = bcrypt.hashSync(password, 12);
    expect(hash).toBeDefined();
    expect(hash).not.toBe(password);
    expect(hash.startsWith('$2b$')).toBe(true); // Formato bcrypt
  });

  it('Debe verificar correctamente contraseña vs hash', () => {
    const password = 'test_password_2026';
    const hash = bcrypt.hashSync(password, 12);
    expect(bcrypt.compareSync(password, hash)).toBe(true);
    expect(bcrypt.compareSync('wrong_password', hash)).toBe(false);
  });

  it('No debe revelar la contraseña original en el hash', () => {
    const password = 'secreto';
    const hash = bcrypt.hashSync(password, 12);
    expect(hash.includes(password)).toBe(false);
  });
});

describe('JWT (integridad de token)', () => {
  it('Debe generar token con payload correcto', () => {
    const token = createToken({ id: 42, role: 'admin' });
    const decoded = jwt.verify(token, TEST_SECRET);
    expect(decoded.id).toBe(42);
    expect(decoded.role).toBe('admin');
  });

  it('Debe rechazar token con firma modificada', () => {
    const token = createToken({ id: 1 }) + 'tampered';
    expect(() => jwt.verify(token, TEST_SECRET)).toThrow();
  });
});

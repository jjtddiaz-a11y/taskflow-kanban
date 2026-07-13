/**
 * @file Configuración y conexión a la base de datos SQLite.
 * Define el esquema de las tablas users y tasks.
 * 
 * Utiliza better-sqlite3 para consultas sincrónicas y
 * consultas parametrizadas para prevenir inyección SQL.
 * 
 * @module database
 */

const Database = require('better-sqlite3');
const path = require('path');

/** Ruta del archivo de base de datos SQLite */
const dbPath = path.join(__dirname, '..', 'taskflow.db');
const db = new Database(dbPath);

// ─── Configuración de seguridad y rendimiento ──────────────────────
db.pragma('journal_mode = WAL');      // Write-Ahead Logging para mejor concurrencia
db.pragma('foreign_keys = ON');       // Activar restricciones de clave foránea

// ─── Esquema de base de datos ──────────────────────────────────────
db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT    NOT NULL,
    email       TEXT    UNIQUE NOT NULL,
    password    TEXT    NOT NULL,             -- Hash bcrypt
    role        TEXT    DEFAULT 'user' CHECK(role IN ('user', 'admin')),
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS tasks (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    title       TEXT    NOT NULL,
    description TEXT    DEFAULT '',
    status      TEXT    DEFAULT 'por_hacer' CHECK(status IN ('por_hacer', 'en_progreso', 'terminado')),
    user_id     INTEGER NOT NULL,
    created_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at  DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
  );
`);

module.exports = db;

# TaskFlow 🎯

Sistema Kanban para gestión de tareas colaborativas.

Aplicación web moderna para organizar tareas visualmente con metodología Kanban. Ideal para equipos pequeños, PYMES y proyectos educativos.

## Stack Tecnológico

| Capa | Tecnología |
|------|-----------|
| **Frontend** | React 18 + Vite + TailwindCSS + react-dnd |
| **Backend** | Node.js + Express 5 + SQLite (better-sqlite3) |
| **Autenticación** | JWT + bcrypt + RBAC (roles user/admin) |
| **Despliegue** | Netlify (frontend) + Render (backend) |
| **CI/CD** | GitHub Actions |

## Características

- ✅ Tablero Kanban con 3 columnas (Por Hacer / En Progreso / Terminado)
- ✅ Arrastre (drag & drop) de tareas entre columnas
- ✅ CRUD completo de tareas
- ✅ Autenticación JWT con registro e inicio de sesión
- ✅ Control de acceso por roles (RBAC)
- ✅ Diseño responsive y accesible (ARIA, WCAG AA)
- ✅ Documentación JSDoc en todo el código fuente
- ✅ Tests automatizados con Jest

## Requisitos

- Node.js >= 18
- npm >= 9

## Instalación y Ejecución Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/taskflow-kanban.git
cd taskflow-kanban
```

### 2. Backend

```bash
cd backend
npm install
cp .env.example .env    # Configurar variables de entorno
npm run dev             # Inicia en http://localhost:5000
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev             # Inicia en http://localhost:5173
```

### 4. Abrir en el navegador

Visitar `http://localhost:5173`

El **primer usuario registrado** obtiene rol de administrador automáticamente.

## Variables de Entorno

### Backend (`backend/.env`)

| Variable | Descripción | Default |
|----------|------------|---------|
| `PORT` | Puerto del servidor | `5000` |
| `JWT_SECRET` | Clave secreta para firmar tokens | requerida |
| `NODE_ENV` | Entorno (development/production) | `development` |
| `CLIENT_URL` | URL del frontend para CORS | `http://localhost:5173` |

### Frontend (`frontend/.env`)

| Variable | Descripción | Default |
|----------|------------|---------|
| `VITE_API_URL` | URL base de la API | `http://localhost:5000` |

## API REST

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|------------|
| `POST` | `/api/auth/register` | Registrar nuevo usuario |
| `POST` | `/api/auth/login` | Iniciar sesión |

### Tareas (requieren JWT)

| Método | Endpoint | Descripción |
|--------|----------|------------|
| `GET` | `/api/tasks` | Listar tareas del usuario |
| `POST` | `/api/tasks` | Crear nueva tarea |
| `PUT` | `/api/tasks/:id` | Actualizar tarea |
| `DELETE` | `/api/tasks/:id` | Eliminar tarea |

## Tests

```bash
cd backend
npm test              # Ejecutar tests con Jest
```

## Despliegue

### Frontend (Netlify)

1. Conectar repositorio de GitHub a Netlify
2. Configurar:
   - **Build command:** `cd frontend && npm install && npm run build`
   - **Publish directory:** `frontend/dist`
   - **Environment variable:** `VITE_API_URL` = URL del backend en Render

### Backend (Render)

1. Crear nuevo Web Service en Render
2. Conectar repositorio
3. Configurar:
   - **Root directory:** `backend`
   - **Build command:** `npm install`
   - **Start command:** `npm start`
   - **Environment variables:** `JWT_SECRET`, `NODE_ENV=production`

## Estructura del Proyecto

```
taskflow-kanban/
├── backend/
│   ├── src/
│   │   ├── index.js           # Punto de entrada Express
│   │   ├── database.js        # Configuración SQLite
│   │   ├── middleware/
│   │   │   └── auth.js        # JWT + RBAC middleware
│   │   └── routes/
│   │       ├── auth.js        # Rutas de autenticación
│   │       └── tasks.js       # Rutas CRUD de tareas
│   └── tests/
│       └── auth.test.js       # Tests de autenticación
├── frontend/
│   └── src/
│       ├── api.js             # Cliente HTTP axios
│       ├── App.jsx            # Componente raíz + rutas
│       ├── main.jsx           # Entry point React
│       ├── pages/
│       │   ├── Login.jsx      # Login/Registro
│       │   └── Dashboard.jsx  # Tablero Kanban
│       └── components/
│           ├── TaskCard.jsx   # Tarjeta de tarea (drag)
│           └── TaskModal.jsx  # Modal crear/editar
├── Documentacion/
│   └── 01 - Fundamentos y Analisis Inicial.docx
├── scripts/
│   └── generar-docx.js       # Generador de documentos
├── .gitignore
└── README.md
```

## Licencia

MIT

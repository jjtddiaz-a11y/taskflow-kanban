const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, ShadingType, PageBreak,
  TabStopPosition, TabStopType
} = require('docx');

const BLUE = '1E3A5F';
const DARK = '1E293B';
const GRAY = '64748B';

function h1(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 32, color: BLUE })],
    spacing: { before: 400, after: 200 },
    heading: HeadingLevel.HEADING_1,
  });
}

function h2(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 26, color: BLUE })],
    spacing: { before: 300, after: 150 },
    heading: HeadingLevel.HEADING_2,
  });
}

function h3(text) {
  return new Paragraph({
    children: [new TextRun({ text, bold: true, size: 22, color: DARK })],
    spacing: { before: 200, after: 100 },
    heading: HeadingLevel.HEADING_3,
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    children: [new TextRun({ text, size: 21, color: DARK, ...opts })],
    spacing: { after: 120 },
    alignment: opts.align || AlignmentType.JUSTIFIED,
  });
}

function bullet(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 21, color: DARK })],
    spacing: { after: 60 },
    bullet: { level: 0 },
  });
}

function code(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 18, color: '475569', font: 'Consolas' })],
    spacing: { before: 60, after: 60 },
    shading: { type: ShadingType.SOLID, color: 'F1F5F9' },
    indent: { left: 200, right: 200 },
  });
}

function createTable(headers, rows) {
  return new Table({
    rows: [
      new TableRow({
        tableHeader: true,
        children: headers.map(h => new TableCell({
          shading: { type: ShadingType.SOLID, color: BLUE },
          children: [new Paragraph({
            children: [new TextRun({ text: h, bold: true, color: 'FFFFFF', size: 20 })],
            spacing: { before: 60, after: 60 },
            alignment: AlignmentType.CENTER,
          })]
        }))
      }),
      ...rows.map((row, i) => new TableRow({
        children: row.map(cell => new TableCell({
          shading: i % 2 === 0 ? { type: ShadingType.SOLID, color: 'F8FAFC' } : undefined,
          children: [new Paragraph({
            children: [new TextRun({ text: cell, size: 20, color: DARK })],
            spacing: { before: 40, after: 40 },
          })]
        }))
      }))
    ],
    width: { size: 100, type: WidthType.PERCENTAGE },
  });
}

// ===================================================================
// DOCUMENTO 5: Documentación Institucional Completa
// ===================================================================
async function generarDocumentacionInstitucional() {
  const doc = new Document({
    title: 'Documentación Institucional - TaskFlow',
    description: 'Manual técnico, guía de usuario y documentación del proyecto',
    styles: {
      default: {
        document: { run: { size: 21, font: 'Calibri' }, paragraph: { spacing: { after: 120 } } },
      },
    },
    sections: [
      // PORTADA
      {
        children: [
          new Paragraph({ spacing: { before: 3000 }, children: [] }),
          new Paragraph({
            children: [new TextRun({ text: 'DOCUMENTACIÓN INSTITUCIONAL', bold: true, size: 36, color: BLUE })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'TaskFlow — Sistema Kanban para Gestión de Tareas', size: 28, color: DARK })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Proyecto Integrado', bold: true, size: 24, color: BLUE })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Implementación de Soluciones para Plataformas Web', size: 22, color: GRAY })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
          }),
          new Paragraph({ spacing: { before: 1500 }, children: [] }),
          new Paragraph({
            children: [new TextRun({ text: 'Estudiante: Jorge Luis Diaz Cárdenas', size: 22, color: DARK })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Fecha: 12 de julio de 2026', size: 22, color: DARK })],
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
      // CONTENIDO
      {
        children: [
          h1('1. Manual Técnico'),

          h2('1.1 Arquitectura del Sistema'),
          p('TaskFlow sigue una arquitectura cliente-servidor de tres capas:'),
          bullet('Capa de presentación: Frontend React con Vite, desplegado en Netlify CDN.'),
          bullet('Capa de lógica de negocio: API REST con Express.js, desplegada en Render.'),
          bullet('Capa de datos: Base de datos SQLite con migración planeada a PostgreSQL.'),
          p('El frontend se comunica con el backend exclusivamente a través de peticiones HTTP/HTTPS con autenticación JWT. Todo el tráfico está cifrado con TLS 1.3.'),

          h2('1.2 Stack Tecnológico Detallado'),
          createTable(
            ['Componente', 'Tecnología', 'Versión'],
            [
              ['Frontend', 'React', '18.x'],
              ['Build tool', 'Vite', '8.x'],
              ['Estilos', 'TailwindCSS', '4.x'],
              ['Drag & Drop', 'react-dnd', '16.x'],
              ['Routing', 'react-router-dom', '7.x'],
              ['HTTP Client', 'axios', '1.x'],
              ['Backend', 'Node.js', '26.x'],
              ['Framework API', 'Express', '5.x'],
              ['Base de datos', 'better-sqlite3', '12.x'],
              ['Autenticación', 'jsonwebtoken + bcryptjs', '9.x / 3.x'],
              ['Seguridad HTTP', 'helmet + cors', '8.x / 2.x'],
              ['Logging', 'morgan', '1.x'],
              ['Testing', 'Jest', '29.x'],
            ]
          ),

          h2('1.3 Base de Datos — Esquema'),
          h3('Tabla: users'),
          createTable(
            ['Columna', 'Tipo', 'Restricciones', 'Descripción'],
            [
              ['id', 'INTEGER', 'PK, AUTOINCREMENT', 'Identificador único'],
              ['name', 'TEXT', 'NOT NULL', 'Nombre del usuario'],
              ['email', 'TEXT', 'UNIQUE, NOT NULL', 'Correo electrónico'],
              ['password', 'TEXT', 'NOT NULL', 'Hash bcrypt de la contraseña'],
              ['role', 'TEXT', "DEFAULT 'user', CHECK(user, admin)", 'Rol del usuario'],
              ['created_at', 'DATETIME', 'DEFAULT CURRENT_TIMESTAMP', 'Fecha de registro'],
            ]
          ),
          new Paragraph({ spacing: { after: 100 }, children: [] }),

          h3('Tabla: tasks'),
          createTable(
            ['Columna', 'Tipo', 'Restricciones', 'Descripción'],
            [
              ['id', 'INTEGER', 'PK, AUTOINCREMENT', 'Identificador único'],
              ['title', 'TEXT', 'NOT NULL', 'Título de la tarea'],
              ['description', 'TEXT', "DEFAULT ''", 'Descripción opcional'],
              ['status', 'TEXT', "DEFAULT 'por_hacer', CHECK", 'Estado actual de la tarea'],
              ['user_id', 'INTEGER', 'FK → users(id), NOT NULL', 'Propietario de la tarea'],
              ['created_at', 'DATETIME', 'DEFAULT CURRENT_TIMESTAMP', 'Fecha de creación'],
              ['updated_at', 'DATETIME', 'DEFAULT CURRENT_TIMESTAMP', 'Última modificación'],
            ]
          ),

          h2('1.4 API REST — Endpoints'),
          h3('Autenticación'),
          createTable(
            ['Método', 'Endpoint', 'Cuerpo', 'Respuesta', 'Códigos'],
            [
              ['POST', '/api/auth/register', '{ name, email, password }', '{ token, user }', '201, 400, 409'],
              ['POST', '/api/auth/login', '{ email, password }', '{ token, user }', '200, 400, 401'],
            ]
          ),
          new Paragraph({ spacing: { after: 100 }, children: [] }),

          h3('Tareas (requieren JWT)'),
          createTable(
            ['Método', 'Endpoint', 'Cuerpo', 'Respuesta', 'Códigos'],
            [
              ['GET', '/api/tasks', '—', '[ task, ... ]', '200, 401'],
              ['POST', '/api/tasks', '{ title, description?, status? }', 'task', '201, 400, 401'],
              ['PUT', '/api/tasks/:id', '{ title?, description?, status? }', 'task', '200, 403, 404, 401'],
              ['DELETE', '/api/tasks/:id', '—', '{ message }', '200, 403, 404, 401'],
            ]
          ),

          h2('1.5 Seguridad Implementada'),
          bullet('HTTPS/TLS 1.3: Todo el tráfico cliente-servidor está cifrado.'),
          bullet('JWT: Tokens firmados con expiración de 24 horas.'),
          bullet('bcrypt: Contraseñas hasheadas con 12 rounds de salt.'),
          bullet('RBAC: Roles "user" (CRUD propio) y "admin" (CRUD global).'),
          bullet('CORS: Restringido al origen del frontend.'),
          bullet('Helmet: Headers HTTP de seguridad contra XSS, clickjacking, MIME sniffing.'),
          bullet('Payload limit: Límite de 10KB en peticiones POST/PUT.'),
          bullet('SQL Injection: Consultas parametrizadas en toda la base de datos.'),

          h2('1.6 Pruebas Realizadas'),
          p('Se implementaron 12 tests unitarios con Jest que cubren:'),
          createTable(
            ['Módulo', 'Cobertura', 'Tests'],
            [
              ['authMiddleware', 'Validación de token JWT (ausente, inválido, expirado, válido)', '5'],
              ['adminMiddleware', 'Control de acceso por rol (user rechazado, admin aceptado)', '2'],
              ['bcrypt', 'Hash de contraseñas, verificación, no revelación', '3'],
              ['JWT', 'Generación de token, integridad de firma', '2'],
            ]
          ),

          // NUEVA PÁGINA - MANUAL DE USUARIO
          new Paragraph({ children: [new PageBreak()] }),
          h1('2. Manual de Usuario'),

          h2('2.1 Introducción'),
          p('TaskFlow es una aplicación web diseñada para ayudarte a organizar tus tareas de manera visual utilizando la metodología Kanban. Con tres columnas (Por Hacer, En Progreso, Terminado), puedes gestionar tu flujo de trabajo de forma intuitiva.'),

          h2('2.2 Requisitos Técnicos'),
          bullet('Navegador web moderno (Chrome, Firefox, Edge, Safari - últimas 2 versiones).'),
          bullet('Conexión a internet.'),
          bullet('Resolución mínima: 320px (responsive).'),

          h2('2.3 Primeros Pasos'),
          h3('Registro de Cuenta'),
          p('1. Abre la aplicación en tu navegador.'),
          p('2. Haz clic en "Regístrate" en la pantalla de inicio de sesión.'),
          p('3. Completa los campos: Nombre, Correo electrónico y Contraseña (mín. 6 caracteres).'),
          p('4. Haz clic en "Crear Cuenta".'),
          p('5. El sistema te autenticará automáticamente y te redirigirá al tablero Kanban.'),
          p('Nota: El primer usuario registrado obtiene rol de administrador.'),

          h3('Inicio de Sesión'),
          p('1. Ingresa tu correo electrónico y contraseña.'),
          p('2. Haz clic en "Iniciar Sesión".'),
          p('3. Serás redirigido al tablero Kanban con tus tareas.'),

          h2('2.4 Uso del Tablero Kanban'),
          h3('Crear una Tarea'),
          p('1. Haz clic en el botón "+ Nueva Tarea" en la barra superior.'),
          p('2. Completa el título (requerido), descripción (opcional) y selecciona el estado inicial.'),
          p('3. Haz clic en "Crear Tarea".'),
          p('4. La tarea aparecerá en la columna correspondiente.'),

          h3('Mover una Tarea entre Columnas'),
          p('1. Haz clic y mantén presionado sobre la tarjeta de la tarea.'),
          p('2. Arrástrala hacia la columna deseada.'),
          p('3. Suelta la tarjeta en la nueva columna.'),
          p('4. El cambio se guarda automáticamente.'),

          h3('Editar una Tarea'),
          p('1. Haz clic en el icono ✏️ en la esquina superior derecha de la tarea.'),
          p('2. Modifica los campos deseados en el modal.'),
          p('3. Haz clic en "Guardar Cambios".'),

          h3('Eliminar una Tarea'),
          p('1. Haz clic en el icono 🗑️ en la esquina superior derecha de la tarea.'),
          p('2. Confirma la eliminación en el cuadro de diálogo.'),
          p('Nota: Solo puedes eliminar tus propias tareas. Los administradores pueden eliminar cualquier tarea.'),

          h2('2.5 Roles de Usuario'),
          createTable(
            ['Rol', 'Permisos'],
            [
              ['Usuario (user)', 'Crear tareas, editar sus tareas, eliminar sus tareas, mover entre columnas'],
              ['Administrador (admin)', 'Todos los permisos de usuario + eliminar tareas de cualquier usuario, ver todas las tareas del sistema'],
            ]
          ),

          h2('2.6 Cerrar Sesión'),
          p('Haz clic en "Salir" en la barra superior derecha. Se limpiará tu sesión y serás redirigido a la pantalla de inicio de sesión.'),

          h2('2.7 Solución de Problemas Comunes'),
          createTable(
            ['Problema', 'Solución'],
            [
              ['No puedo iniciar sesión', 'Verifica que tu correo y contraseña sean correctos. Si olvidaste tu contraseña, crea una nueva cuenta.'],
              ['No veo mis tareas', 'Asegúrate de haber iniciado sesión correctamente. Verifica tu conexión a internet.'],
              ['No puedo eliminar una tarea', 'Solo el propietario o un administrador puede eliminar tareas.'],
              ['La página no carga', 'Verifica tu conexión a internet. Intenta recargar la página.'],
            ]
          ),

          // NUEVA PÁGINA - DOCUMENTACIÓN DE CÓDIGO
          new Paragraph({ children: [new PageBreak()] }),
          h1('3. Documentación del Código Fuente'),

          h2('3.1 Estructura del Proyecto'),
          code('taskflow-kanban/'),
          code('├── backend/'),
          code('│   ├── src/'),
          code('│   │   ├── index.js            # Punto de entrada Express'),
          code('│   │   ├── database.js         # Configuración SQLite'),
          code('│   │   ├── middleware/'),
          code('│   │   │   └── auth.js         # JWT + RBAC middleware'),
          code('│   │   └── routes/'),
          code('│   │       ├── auth.js         # Rutas de autenticación'),
          code('│   │       └── tasks.js        # CRUD de tareas'),
          code('│   └── tests/'),
          code('│       └── auth.test.js        # Tests de autenticación'),
          code('├── frontend/'),
          code('│   └── src/'),
          code('│       ├── api.js              # Cliente HTTP axios'),
          code('│       ├── App.jsx             # Componente raíz + rutas'),
          code('│       ├── main.jsx            # Entry point React'),
          code('│       ├── pages/'),
          code('│       │   ├── Login.jsx       # Login/Registro'),
          code('│       │   └── Dashboard.jsx   # Tablero Kanban'),
          code('│       └── components/'),
          code('│           ├── TaskCard.jsx    # Tarjeta de tarea (drag)'),
          code('│           └── TaskModal.jsx   # Modal crear/editar'),
          code('├── Documentacion/'),
          code('├── scripts/'),
          code('└── README.md'),

          h2('3.2 Convenciones de Código'),
          bullet('JSDoc: Todos los módulos, funciones y componentes están documentados con JSDoc.'),
          bullet('ESLint: El código sigue las convenciones estándar de JavaScript/React.'),
          bullet('Componentes funcionales: Todos los componentes de React son funcionales con hooks.'),
          bullet('Nomenclatura: camelCase para variables y funciones, PascalCase para componentes.'),
          bullet('Separación de responsabilidades: Lógica de negocio en servicios, presentación en componentes.'),

          h2('3.3 Glosario Técnico'),
          createTable(
            ['Término', 'Definición'],
            [
              ['API REST', 'Interfaz de programación que sigue los principios REST (Representational State Transfer)'],
              ['JWT', 'JSON Web Token: estándar para transmitir información de autenticación entre partes'],
              ['RBAC', 'Role-Based Access Control: control de acceso basado en roles'],
              ['Kanban', 'Método visual de gestión de flujo de trabajo originado en Toyota'],
              ['CRUD', 'Create, Read, Update, Delete: las cuatro operaciones básicas de persistencia'],
              ['CI/CD', 'Integración Continua / Despliegue Continuo: automatización de builds y despliegues'],
              ['CDN', 'Content Delivery Network: red de servidores distribuidos para entregar contenido estático'],
            ]
          ),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputDir = path.join(__dirname, '..', 'Documentacion');
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, '05 - Documentación Institucional Completa.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Documento 05 generado: ${outputPath}`);
  console.log(`   Tamaño: ${(buffer.length / 1024).toFixed(1)} KB`);
}

// ===================================================================
// DOCUMENTO 6: Presentación Final
// ===================================================================
async function generarPresentacionFinal() {
  const doc = new Document({
    title: 'Presentación Final - TaskFlow',
    description: 'Diapositivas de presentación del proyecto TaskFlow',
    styles: {
      default: {
        document: { run: { size: 21, font: 'Calibri' }, paragraph: { spacing: { after: 120 } } },
      },
    },
    sections: [
      // PORTADA
      {
        children: [
          new Paragraph({ spacing: { before: 3000 }, children: [] }),
          new Paragraph({
            children: [new TextRun({ text: 'PRESENTACIÓN FINAL', bold: true, size: 36, color: BLUE })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'TaskFlow', bold: true, size: 48, color: BLUE })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Sistema Kanban para Gestión de Tareas Colaborativas', size: 24, color: GRAY })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 600 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Proyecto Integrado — Implementación de Soluciones para Plataformas Web', size: 22, color: DARK })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({ spacing: { before: 1500 }, children: [] }),

          new Paragraph({
            children: [new TextRun({ text: 'Estudiante: Jorge Luis Diaz Cárdenas', size: 22, color: DARK })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Docente: [Nombre del Docente]', size: 22, color: DARK })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: '12 de julio de 2026', size: 22, color: DARK })],
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
      // DIAPOSITIVAS
      {
        children: [
          // ──── DIAPOSITIVA 1 ────
          new Paragraph({ children: [new PageBreak()] }),
          new Paragraph({
            children: [new TextRun({ text: 'Diapositiva 1', bold: true, size: 18, color: GRAY })],
            spacing: { after: 40 },
          }),

          h1('¿Qué es TaskFlow?'),

          p('TaskFlow es una aplicación web basada en la metodología Kanban que permite organizar tareas de forma visual e intuitiva.'),

          h2('¿Qué es Kanban?'),
          p('Kanban es un método visual de gestión de flujo de trabajo originado en Toyota. Su principio fundamental es visualizar el trabajo en tres estados:'),
          bullet('Por Hacer: Tareas pendientes por iniciar.'),
          bullet('En Progreso: Tareas que están siendo trabajadas actualmente.'),
          bullet('Terminado: Tareas completadas.'),

          h2('¿Qué hace TaskFlow?'),
          bullet('Crea, edita y elimina tareas fácilmente.'),
          bullet('Arrastra y suelta tareas entre columnas (drag & drop).'),
          bullet('Inicio de sesión seguro con JWT.'),
          bullet('Control de acceso: usuarios regulares y administradores.'),
          bullet('Diseño responsive: funciona en cualquier dispositivo.'),

          // Espacio para imagen
          new Paragraph({ spacing: { before: 200 }, children: [] }),
          new Paragraph({
            children: [new TextRun({ text: '[INSERTAR IMAGEN: Pantalla de inicio de sesión o tablero Kanban]', italics: true, size: 20, color: '3B82F6' })],
            alignment: AlignmentType.CENTER,
            shading: { type: ShadingType.SOLID, color: 'EFF6FF' },
            spacing: { before: 100, after: 100 },
          }),

          h2('Tecnología Utilizada'),
          createTable(
            ['Componente', 'Tecnología'],
            [
              ['Frontend', 'React + Vite + TailwindCSS'],
              ['Backend', 'Node.js + Express'],
              ['Base de Datos', 'SQLite (PostgreSQL en producción)'],
              ['Autenticación', 'JWT + bcrypt'],
              ['Despliegue', 'Netlify + Render'],
            ]
          ),

          // ──── DIAPOSITIVA 2 ────
          new Paragraph({ children: [new PageBreak()] }),
          new Paragraph({
            children: [new TextRun({ text: 'Diapositiva 2', bold: true, size: 18, color: GRAY })],
            spacing: { after: 40 },
          }),

          h1('Beneficios de Usar TaskFlow'),

          p('TaskFlow transforma la manera en que equipos pequeños y estudiantes gestionan sus tareas diarias. A continuación, los principales beneficios:'),

          h2('Beneficio 1: Organización Visual'),
          p('Con el tablero Kanban, puedes ver de un vistazo el estado de todas tus tareas. No más listas interminables ni correos perdidos. Cada tarea tiene su lugar y su estado es claro.'),

          h2('Beneficio 2: Productividad Mejorada'),
          bullet('Reducción de la sobrecarga cognitiva al externalizar el seguimiento de tareas.'),
          bullet('Transiciones rápidas: arrastrar y soltar es más intuitivo que cambiar estados en formularios.'),
          bullet('Visualización clara de cuellos de botella (tareas estancadas en "En Progreso").'),

          h2('Beneficio 3: Accesible y Gratuito'),
          bullet('Sin costos de licencia.'),
          bullet('Funciona en cualquier navegador moderno.'),
          bullet('Diseño responsive: usable en escritorio, tablet y móvil.'),

          // Espacio para imagen
          new Paragraph({ spacing: { before: 200 }, children: [] }),
          new Paragraph({
            children: [new TextRun({ text: '[INSERTAR IMAGEN: Dashboard con tareas registradas y columnas pobladas]', italics: true, size: 20, color: '3B82F6' })],
            alignment: AlignmentType.CENTER,
            shading: { type: ShadingType.SOLID, color: 'EFF6FF' },
            spacing: { before: 100, after: 100 },
          }),

          h2('Caso de Uso Real'),
          p('Imagina un equipo de 3 estudiantes trabajando en un proyecto final. Con TaskFlow pueden:'),
          bullet('Crear tareas para cada entregable.'),
          bullet('Asignar responsabilidades (cada quien ve sus tareas).'),
          bullet('Mover tareas a "Terminado" cuando completan cada sección.'),
          bullet('El administrador (líder del equipo) supervisa el progreso general.'),

          // ──── PREGUNTAS FRECUENTES ────
          new Paragraph({ children: [new PageBreak()] }),
          new Paragraph({
            children: [new TextRun({ text: 'Preguntas Frecuentes', bold: true, size: 18, color: GRAY })],
            spacing: { after: 40 },
          }),

          h1('Preguntas Frecuentes'),

          h3('¿Necesito instalar algo para usar TaskFlow?'),
          p('No. TaskFlow es una aplicación web. Solo necesitas un navegador moderno y conexión a internet.'),

          h3('¿Puedo usarlo en mi teléfono?'),
          p('Sí. TaskFlow es completamente responsive y se adapta a cualquier tamaño de pantalla.'),

          h3('¿Mis datos están seguros?'),
          p('Sí. Todo el tráfico está cifrado con HTTPS/TLS 1.3. Las contraseñas se almacenan con hash bcrypt. Los tokens JWT expiran después de 24 horas.'),

          h3('¿Cuántos usuarios pueden usar la aplicación?'),
          p('Cualquier persona puede registrarse. Cada usuario ve solo sus tareas, y los administradores pueden gestionar todo el sistema.'),

          h3('¿Puedo compartir tareas con otros usuarios?'),
          p('Actualmente, cada usuario gestiona sus propias tareas. Los administradores pueden ver y gestionar todas las tareas del sistema.'),

          h3('¿Qué pasa si olvido mi contraseña?'),
          p('Por ahora, la recuperación de contraseña no está implementada. Puedes crear una nueva cuenta con un correo diferente.'),

          h3('¿Cómo escalaría TaskFlow para más usuarios?'),
          p('La arquitectura está diseñada para escalar: migración a PostgreSQL, adición de Redis para caché, múltiples instancias del backend con balanceador de carga, y orquestación con Kubernetes si es necesario.'),

          h3('¿TaskFlow es de código abierto?'),
          p('Sí. El código fuente está disponible en GitHub como repositorio público.'),

          // ──── CIERRE ────
          new Paragraph({ children: [new PageBreak()] }),
          new Paragraph({ spacing: { before: 3000 }, children: [] }),
          new Paragraph({
            children: [new TextRun({ text: 'Gracias', bold: true, size: 48, color: BLUE })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),
          new Paragraph({
            children: [new TextRun({ text: '¿Preguntas?', size: 28, color: GRAY })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'TaskFlow — Organiza tu trabajo, visualiza tu progreso.', size: 22, color: DARK, italics: true })],
            alignment: AlignmentType.CENTER,
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [new TextRun({ text: 'Repositorio: https://github.com/jjtddiaz-a11y/taskflow-kanban', size: 20, color: '2563EB' })],
            alignment: AlignmentType.CENTER,
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputDir = path.join(__dirname, '..', 'Documentacion');
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, '06 - Presentacion Final con Demo.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Documento 06 generado: ${outputPath}`);
  console.log(`   Tamaño: ${(buffer.length / 1024).toFixed(1)} KB`);
}

// ===================================================================
// EJECUTAR
// ===================================================================
async function main() {
  await generarDocumentacionInstitucional();
  await generarPresentacionFinal();
  console.log('\n✅ Todos los documentos generados exitosamente.');
}

main().catch(console.error);

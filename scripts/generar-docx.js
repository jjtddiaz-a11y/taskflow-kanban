const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, BorderStyle, WidthType, PageBreak,
  ShadingType, TabStopPosition, TabStopType
} = require('docx');

// Colores institucionales
const BLUE = '1E3A5F';
const LIGHT_BLUE = 'E8F0FE';
const DARK = '1E293B';

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

function diagramBox(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 18, color: '475569', font: 'Consolas' })],
    spacing: { before: 100, after: 100 },
    shading: { type: ShadingType.SOLID, color: 'F1F5F9' },
    indent: { left: 200, right: 200 },
  });
}

const doc = new Document({
  title: 'Entregable 1 - Fundamentos y Análisis Inicial',
  description: 'Proyecto TaskFlow - Implementación de soluciones para plataformas web',
  styles: {
    default: {
      document: {
        run: { size: 21, font: 'Calibri' },
        paragraph: { spacing: { after: 120 } },
      },
    },
  },
  sections: [
    // PORTADA
    {
      children: [
        new Paragraph({ spacing: { before: 4000 }, children: [] }),
        new Paragraph({
          children: [new TextRun({ text: 'PROYECTO INTEGRADO', bold: true, size: 36, color: BLUE })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Implementación de Soluciones para Plataformas Web', size: 28, color: DARK })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 400 },
        }),
        new Paragraph({
          children: [new TextRun({ text: 'TaskFlow', bold: true, size: 48, color: BLUE })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Sistema Kanban para Gestión de Tareas Colaborativas', size: 24, color: '64748B' })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Entregable 1: Fundamentos y Análisis Inicial', bold: true, size: 24, color: DARK })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
        }),
        new Paragraph({ spacing: { before: 2000 }, children: [] }),
        new Paragraph({
          children: [new TextRun({ text: 'Estudiante: Jorge Luis Diaz Cárdenas', size: 22, color: DARK })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Curso: Implementación de Aplicaciones para Plataformas Web', size: 22, color: DARK })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Fecha: 12 de julio de 2026', size: 22, color: DARK })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),
      ],
    },
    // CONTENIDO
    {
      children: [
        // 1. CASO DE NEGOCIO
        h1('1. Caso de Negocio'),
        h2('1.1 Nombre del Proyecto'),
        p('TaskFlow — Sistema Kanban para Gestión de Tareas Colaborativas.'),
        
        h2('1.2 Problema Identificado'),
        p('En entornos de trabajo pequeños (PYMES, startups, equipos educativos), la gestión de tareas suele hacerse de manera informal: listas en papel, archivos compartidos sin control de versiones, o grupos de mensajería donde las tareas se pierden. Herramientas como Trello, Jira o Asana son potentes pero presentan barreras de entrada: costo de suscripción, curva de aprendizaje pronunciada, o funcionalidades excesivas para equipos pequeños.'),
        
        h2('1.3 Solución Propuesta'),
        p('TaskFlow es una aplicación web Kanban ligera que permite:'),
        bullet('Organización visual de tareas en tres columnas: Por Hacer, En Progreso, Terminado.'),
        bullet('Arrastre intuitivo de tareas entre columnas (drag & drop).'),
        bullet('Autenticación segura con cuentas de usuario y roles diferenciados.'),
        bullet('Acceso responsivo desde cualquier dispositivo con navegador web.'),

        h2('1.4 Impacto Social y Empresarial'),
        createTable(
          ['Dimensión', 'Impacto'],
          [
            ['Productividad', 'Reduce el tiempo perdido en coordinar qué está haciendo cada quién'],
            ['Cognitivo', 'Disminuye la sobrecarga mental al externalizar el seguimiento de tareas'],
            ['Económico', 'Cero costo de licencias; solo se paga hosting (gratuito en plan básico)'],
            ['Educativo', 'Ideal para equipos de estudiantes que gestionan proyectos académicos'],
          ]
        ),
        new Paragraph({ spacing: { after: 200 }, children: [] }),

        h2('1.5 Stack Tecnológico'),
        createTable(
          ['Capa', 'Tecnología', 'Justificación'],
          [
            ['Frontend', 'React 18 + Vite + TailwindCSS', 'Rapidez de desarrollo, ecosistema maduro'],
            ['Backend', 'Node.js + Express 4', 'JavaScript unificado, amplia comunidad'],
            ['Base de datos', 'SQLite → PostgreSQL', 'Simplicidad inicial con ruta de migración'],
            ['Autenticación', 'JWT + bcrypt', 'Estándar industrial'],
            ['Despliegue frontend', 'Netlify', 'CDN global, HTTPS automático'],
            ['Despliegue backend', 'Render', 'Plan gratuito, HTTPS nativo'],
            ['CI/CD', 'GitHub Actions', 'Integración nativa con GitHub'],
          ]
        ),

        // 2. ARQUITECTURA
        new Paragraph({ children: [new PageBreak()] }),
        h1('2. Arquitectura Web Cliente-Servidor'),
        h2('2.1 Diagrama de Arquitectura'),
        diagramBox('┌─────────────────────────────────────────────────────────────────┐'),
        diagramBox('│                        USUARIO                                │'),
        diagramBox('│                    (Navegador Web)                            │'),
        diagramBox('└────────────────────────┬────────────────────────────────────────┘'),
        diagramBox('                         │'),
        diagramBox('                   HTTPS / TLS 1.3'),
        diagramBox('                         │'),
        diagramBox('                         ▼'),
        diagramBox('┌─────────────────────────────────────────────────────────────────┐'),
        diagramBox('│                       NETLIFY CDN                              │'),
        diagramBox('│  ● Frontend estático (React + Vite build)                     │'),
        diagramBox('│  ● HTTP/2 + TLS automático                                   │'),
        diagramBox('│  ● Cache de assets en edge                                   │'),
        diagramBox('└────────────────────────┬────────────────────────────────────────┘'),
        diagramBox('                         │'),
        diagramBox('                   HTTPS / REST API'),
        diagramBox('                         │'),
        diagramBox('                         ▼'),
        diagramBox('┌─────────────────────────────────────────────────────────────────┐'),
        diagramBox('│                     RENDER (Backend)                           │'),
        diagramBox('│  ● Express.js API server                                      │'),
        diagramBox('│  ● Middleware: JWT auth, CORS, rate limiting                  │'),
        diagramBox('│  ● Morgan logging centralizado                                │'),
        diagramBox('├─────────────────────────────────────────────────────────────────┤'),
        diagramBox('│  ● SQLite / PostgreSQL                                        │'),
        diagramBox('│    - Tabla: users (id, name, email, password, role)           │'),
        diagramBox('│    - Tabla: tasks (id, title, desc, status, user_id)          │'),
        diagramBox('│    - Relación 1:N usuario → tarea                             │'),
        diagramBox('└────────────────────────────────────────────────────────────────┘'),
        new Paragraph({ spacing: { after: 200 }, children: [] }),

        h2('2.2 Protocolos de Seguridad'),
        createTable(
          ['Componente', 'Mecanismo', 'Descripción'],
          [
            ['Cliente ↔ Red', 'HTTPS (TLS 1.3)', 'Todo el tráfico cifrado en tránsito'],
            ['Frontend → API', 'CORS restringido', 'Solo origen del frontend permitido'],
            ['Autenticación', 'JWT (HS256)', 'Token firmado con expiración de 24h'],
            ['Contraseñas', 'bcrypt (salt 12)', 'Hash con costo computacional ajustable'],
            ['API → BD', 'Consultas parametrizadas', 'Prevención de inyección SQL'],
            ['Headers HTTP', 'Helmet middleware', 'Protección contra XSS, clickjacking, MIME sniffing'],
          ]
        ),

        h2('2.3 Flujo de Peticiones'),
        p('1. El usuario accede desde su navegador a la URL en Netlify.'),
        p('2. Netlify sirve el bundle estático (HTML, CSS, JS) desde su CDN global.'),
        p('3. El usuario inicia sesión: el frontend envía credenciales vía POST al backend en Render.'),
        p('4. El backend valida contra la BD, genera un JWT y lo devuelve.'),
        p('5. El frontend almacena el JWT en localStorage y lo envía en el header Authorization: Bearer <token> en cada petición subsecuente.'),
        p('6. El backend verifica el token con el middleware de autenticación antes de procesar cualquier operación CRUD.'),

        // 3. DIAGRAMAS DE FLUJO
        new Paragraph({ children: [new PageBreak()] }),
        h1('3. Diagramas de Flujo'),
        h2('3.1 Flujo de Autenticación'),
        diagramBox('USUARIO        FRONTEND           BACKEND           BD'),
        diagramBox('  │               │                  │               │'),
        diagramBox('  │── Login/Reg ─►│                  │               │'),
        diagramBox('  │               │── POST /auth ───►│               │'),
        diagramBox('  │               │                  │── Consulta ──►│'),
        diagramBox('  │               │                  │◄── Resultado ─│'),
        diagramBox('  │               │      ┌──────────────────┐        │'),
        diagramBox('  │               │      │ ¿Credenciales     │        │'),
        diagramBox('  │               │      │ válidas?          │        │'),
        diagramBox('  │               │      └───────┬──────────┘        │'),
        diagramBox('  │               │            Sí│   No              │'),
        diagramBox('  │               │◄── JWT ─────┤◄── Error ─────────┤'),
        diagramBox('  │◄── Token ────┤             │                    │'),
        new Paragraph({ spacing: { after: 200 }, children: [] }),
        p('El usuario ingresa email y contraseña. El frontend envía los datos al endpoint /api/auth/login. El backend busca el usuario en la BD, compara el hash con bcrypt, y si coincide genera un JWT con el ID y rol del usuario. Si no coincide, devuelve error 401. El frontend almacena el token y redirige al dashboard.'),

        h2('3.2 Flujo de CRUD de Tareas'),
        p('Desde el dashboard, el usuario puede:'),
        bullet('Crear: Abre un modal, llena título y descripción, presiona "Guardar". El frontend envía POST a /api/tasks con el token JWT.'),
        bullet('Editar: Arrastra una tarea a otra columna (cambio de status) o hace clic para editar título/descripción.'),
        bullet('Eliminar: Solo usuarios con rol admin pueden eliminar tareas de cualquier usuario. Usuarios normales solo eliminan las propias.'),

        h2('3.3 Flujo de Movimiento entre Columnas'),
        p('1. Usuario hace clic y mantiene sobre una tarjeta de tarea.'),
        p('2. Arrastra la tarjeta hacia la columna destino.'),
        p('3. Al soltar, el frontend calcula el nuevo status (por_hacer, en_progreso, terminado).'),
        p('4. Envía PUT /api/tasks/:id con el nuevo status.'),
        p('5. El backend valida que la tarea pertenezca al usuario (o que sea admin).'),
        p('6. Actualiza el registro en la BD y devuelve la tarea actualizada.'),
        p('7. El frontend actualiza el estado local y reordena las columnas.'),

        // 4. WIREFRAMES
        new Paragraph({ children: [new PageBreak()] }),
        h1('4. Wireframes'),
        h2('4.1 Pantalla de Login / Registro'),
        diagramBox('┌──────────────────────────────────────────────┐'),
        diagramBox('│                                              │'),
        diagramBox('│              ◄ TASKFLOW ►                    │'),
        diagramBox('│                                              │'),
        diagramBox('│           Correo electrónico                 │'),
        diagramBox('│           ┌──────────────────────┐          │'),
        diagramBox('│           │                      │          │'),
        diagramBox('│           └──────────────────────┘          │'),
        diagramBox('│                                              │'),
        diagramBox('│           Contraseña                         │'),
        diagramBox('│           ┌──────────────────────┐          │'),
        diagramBox('│           │                      │          │'),
        diagramBox('│           └──────────────────────┘          │'),
        diagramBox('│                                              │'),
        diagramBox('│           ┌──────────────────────┐          │'),
        diagramBox('│           │   INICIAR SESIÓN     │          │'),
        diagramBox('│           └──────────────────────┘          │'),
        diagramBox('│                                              │'),
        diagramBox('│        ¿No tienes cuenta? Regístrate        │'),
        diagramBox('└──────────────────────────────────────────────┘'),
        new Paragraph({ spacing: { after: 200 }, children: [] }),
        p('Elementos clave: Logo en la parte superior, campos de email y contraseña con validación en tiempo real, botón de "Iniciar Sesión" con feedback de carga, enlace para alternar a registro. Diseño centrado y responsive con TailwindCSS.'),

        h2('4.2 Dashboard Kanban'),
        diagramBox('┌─────────────────────────────────────────────────────────────────────┐'),
        diagramBox('│  ☰ TaskFlow                      👤 Jorge L.  ⚙️  🚪            │'),
        diagramBox('├────────────────┬──────────────────────────┬────────────────────────┤'),
        diagramBox('│  POR HACER     │     EN PROGRESO          │     TERMINADO          │'),
        diagramBox('│  ┌──────────┐  │  ┌────────────────────┐  │  ┌──────────────────┐  │'),
        diagramBox('│  │ Tarea 1  │  │  │ Tarea 2            │  │  │ Tarea 3          │  │'),
        diagramBox('│  └──────────┘  │  └────────────────────┘  │  └──────────────────┘  │'),
        diagramBox('│                │                          │                        │'),
        diagramBox('│  + Añadir      │                          │                        │'),
        diagramBox('└────────────────┴──────────────────────────┴────────────────────────┘'),
        new Paragraph({ spacing: { after: 200 }, children: [] }),
        p('Elementos clave: Barra de navegación superior con logo, nombre de usuario y botón de salir. Tres columnas Kanban con scroll independiente. Tarjetas de tarea con título, descripción corta e indicador de progreso. Arrastre suave entre columnas con feedback visual. Botón "Añadir tarea" que abre el modal de creación.'),

        h2('4.3 Modal de Crear/Editar Tarea'),
        diagramBox('┌──────────────────────────────────────────────┐'),
        diagramBox('│  ┌──────────────────────────────────────────┐│'),
        diagramBox('│  │   Crear Tarea                     ✕      ││'),
        diagramBox('│  │                                          ││'),
        diagramBox('│  │  Título                                  ││'),
        diagramBox('│  │  ┌──────────────────────────────────┐    ││'),
        diagramBox('│  │  └──────────────────────────────────┘    ││'),
        diagramBox('│  │                                          ││'),
        diagramBox('│  │  Descripción                             ││'),
        diagramBox('│  │  ┌──────────────────────────────────┐    ││'),
        diagramBox('│  │  └──────────────────────────────────┘    ││'),
        diagramBox('│  │                                          ││'),
        diagramBox('│  │  Estado: [Por Hacer ▼]                   ││'),
        diagramBox('│  │                                          ││'),
        diagramBox('│  │  [Cancelar]    [Guardar]                 ││'),
        diagramBox('│  └──────────────────────────────────────────┘│'),
        diagramBox('└──────────────────────────────────────────────┘'),
        new Paragraph({ spacing: { after: 200 }, children: [] }),
        p('Elementos clave: Overlay semitransparente de fondo (clic fuera cierra el modal), título dinámico "Crear tarea" o "Editar tarea", campos: título (requerido), descripción (opcional), estado (dropdown con 3 opciones: Por Hacer, En Progreso, Terminado). Botones Cancelar y Guardar. Accesibilidad: foco atrapado dentro del modal, tecla ESC para cerrar, roles ARIA.'),

        // 5. JUSTIFICACIÓN TÉCNICA
        new Paragraph({ children: [new PageBreak()] }),
        h1('5. Justificación Técnica'),
        h2('5.1 Escalabilidad en la Nube'),
        createTable(
          ['Componente', 'Estrategia de Escalabilidad'],
          [
            ['Frontend (Netlify)', 'CDN global con caché en edge. Escala horizontalmente de forma automática. Soporta millones de peticiones sin configuración adicional.'],
            ['Backend (Render)', 'Plan básico con escalado vertical. Para producción: balanceador de carga + múltiples instancias.'],
            ['Base de datos', 'SQLite para desarrollo. Migración planeada a PostgreSQL en producción con conexiones pool.'],
            ['Caché', 'Planeado: Redis para caché de consultas frecuentes y rate limiting.'],
          ]
        ),
        new Paragraph({ spacing: { after: 100 }, children: [] }),
        p('Para escalar a miles de usuarios, la arquitectura permite: (a) migrar a PostgreSQL administrado, (b) agregar Redis para caché de sesiones y consultas, (c) replicar instancias del backend detrás de un balanceador de carga, (d) migrar a Kubernetes si se requiere orquestación de contenedores.'),

        h2('5.2 Ciberseguridad'),
        createTable(
          ['Dimensión', 'Medida Implementada'],
          [
            ['Tránsito', 'HTTPS obligatorio con TLS 1.3 (Netlify + Render)'],
            ['Autenticación', 'JWT firmado con clave secreta, expiración de 24h'],
            ['Contraseñas', 'Hash con bcrypt (salt rounds: 12)'],
            ['Autorización', 'RBAC con roles: user (CRUD propio) y admin (CRUD global)'],
            ['API', 'CORS restringido al origen del frontend'],
            ['Base de datos', 'Consultas parametrizadas (prevención de inyección SQL)'],
            ['Headers', 'Helmet middleware para HTTP headers seguros'],
          ]
        ),

        h2('5.3 Cumplimiento de Objetivos del Curso'),
        createTable(
          ['Objetivo del Curso', 'Cobertura en TaskFlow'],
          [
            ['Cloud computing', 'Despliegue en Netlify + Render (PaaS + CDN)'],
            ['DevOps', 'CI/CD con GitHub Actions'],
            ['Seguridad informática', 'JWT, bcrypt, HTTPS, CORS, Helmet, RBAC'],
            ['Accesibilidad digital', 'ARIA roles, navegación por teclado, contraste WCAG AA'],
            ['Metodologías ágiles', 'Sprints representados en commits, planificación iterativa'],
          ]
        ),

        // 6. REFERENCIAS
        new Paragraph({ children: [new PageBreak()] }),
        h1('6. Referencias'),
        new Paragraph({
          children: [
            new TextRun({ text: 'Netlify Documentation. ', size: 20, color: DARK }),
            new TextRun({ text: 'Deploy Modern Web Applications.', size: 20, color: '2563EB', italics: true }),
          ],
          spacing: { after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Render Documentation. ', size: 20, color: DARK }),
            new TextRun({ text: 'Web Services.', size: 20, color: '2563EB', italics: true }),
          ],
          spacing: { after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'JWT.io. ', size: 20, color: DARK }),
            new TextRun({ text: 'JSON Web Tokens.', size: 20, color: '2563EB', italics: true }),
          ],
          spacing: { after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'OWASP. ', size: 20, color: DARK }),
            new TextRun({ text: 'Authentication Cheat Sheet.', size: 20, color: '2563EB', italics: true }),
          ],
          spacing: { after: 80 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'WCAG 2.1. ', size: 20, color: DARK }),
            new TextRun({ text: 'Web Content Accessibility Guidelines.', size: 20, color: '2563EB', italics: true }),
          ],
          spacing: { after: 200 },
        }),
      ],
    },
  ],
});

async function main() {
  const buffer = await Packer.toBuffer(doc);
  const outputDir = path.join(__dirname, '..', 'Documentacion');
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, '01 - Fundamentos y Analisis Inicial.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Documento generado: ${outputPath}`);
  console.log(`   Tamaño: ${(buffer.length / 1024).toFixed(1)} KB`);
}

main().catch(console.error);

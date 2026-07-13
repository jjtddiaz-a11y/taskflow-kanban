const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  HeadingLevel, AlignmentType, WidthType, ShadingType, PageBreak
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
    indent: { left: 400, right: 400 },
  });
}

function stepNum(text) {
  return new Paragraph({
    children: [new TextRun({ text, size: 21, color: DARK, bold: true })],
    spacing: { before: 200, after: 60 },
    numbering: { reference: 'steps', level: 0 },
  });
}

const doc = new Document({
  title: 'Guía de Publicación - TaskFlow',
  description: 'Paso a paso para publicar TaskFlow en GitHub, Netlify y Render',
  styles: {
    default: {
      document: { run: { size: 21, font: 'Calibri' }, paragraph: { spacing: { after: 120 } } },
    },
  },
  numbering: {
    config: [
      {
        reference: 'steps',
        levels: [
          {
            level: 0,
            format: 'decimal',
            text: '%1.',
            alignment: AlignmentType.START,
            style: { paragraph: { indent: { left: 720, hanging: 360 } } },
          },
        ],
      },
    ],
  },
  sections: [
    // PORTADA
    {
      children: [
        new Paragraph({ spacing: { before: 3000 }, children: [] }),
        new Paragraph({
          children: [new TextRun({ text: 'GUÍA DE PUBLICACIÓN', bold: true, size: 36, color: BLUE })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 200 },
        }),
        new Paragraph({
          children: [new TextRun({ text: 'TaskFlow', bold: true, size: 48, color: BLUE })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 100 },
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Paso a paso para publicar en GitHub, Netlify y Render', size: 22, color: GRAY })],
          alignment: AlignmentType.CENTER,
          spacing: { after: 600 },
        }),
        new Paragraph({
          children: [new TextRun({ text: 'Proyecto Integrado — Implementación de Soluciones para Plataformas Web', size: 20, color: DARK })],
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
          children: [new TextRun({ text: '12 de julio de 2026', size: 22, color: DARK })],
          alignment: AlignmentType.CENTER,
        }),
      ],
    },
    // CONTENIDO
    {
      children: [
        h1('1. Introducción'),
        p('Esta guía describe el proceso completo para publicar TaskFlow en tres plataformas: GitHub (control de versiones), Netlify (frontend) y Render (backend). Al finalizar, la aplicación estará disponible en internet y accesible desde cualquier navegador.'),
        
        h1('2. Requisitos Previos'),
        bullet('Tener una cuenta en GitHub (https://github.com)'),
        bullet('Tener una cuenta en Netlify (https://netlify.com)'),
        bullet('Tener una cuenta en Render (https://render.com)'),
        bullet('Tener Git instalado en tu computadora'),
        bullet('Tener Node.js instalado (versión 18 o superior)'),
        bullet('El proyecto TaskFlow completo en tu computadora'),

        h1('3. Publicar en GitHub'),
        h2('Paso 1: Iniciar sesión en GitHub'),
        p('Ve a https://github.com e inicia sesión con tu cuenta. Si no tienes, regístrate gratis.'),

        h2('Paso 2: Crear un nuevo repositorio'),
        bullet('Haz clic en el botón "+" en la esquina superior derecha y selecciona "New repository".'),
        bullet('Nombre del repositorio: taskflow-kanban'),
        bullet('Descripción: "Sistema Kanban para gestión de tareas colaborativas"'),
        bullet('Visibilidad: Público (requerido para el proyecto académico)'),
        bullet('No marcar "Initialize with README" ni ".gitignore" porque ya los tienes'),
        bullet('Haz clic en "Create repository"'),

        h2('Paso 3: Subir el proyecto desde tu computadora'),
        p('Abre la terminal de PowerShell y ejecuta los siguientes comandos:'),
        code('cd C:\\dev\\taskflow-kanban'),
        code('git init'),
        code('git add .'),
        code('git commit -m "feat: primera version completa de TaskFlow"'),
        p('Luego, copia los comandos que GitHub te muestra (reemplaza TU-USUARIO con tu nombre de usuario):'),
        code('git remote add origin https://github.com/TU-USUARIO/taskflow-kanban.git'),
        code('git branch -M main'),
        code('git push -u origin main'),

        h2('Paso 4: Verificar la subida'),
        p('Recarga la página del repositorio en GitHub. Deberías ver todos los archivos del proyecto.'),

        h1('4. Publicar el Backend en Render'),
        h2('Paso 1: Iniciar sesión en Render'),
        p('Ve a https://render.com e inicia sesión (puedes usar tu cuenta de Google o GitHub).'),

        h2('Paso 2: Crear un Web Service'),
        bullet('En el dashboard, haz clic en "New +" y selecciona "Web Service".'),
        bullet('Conecta tu cuenta de GitHub si no lo has hecho.'),
        bullet('Busca y selecciona el repositorio "taskflow-kanban".'),
        bullet('Render detectará automáticamente el proyecto, pero hay que configurarlo:'),

        h2('Paso 3: Configurar el servicio'),
        p('Completa los siguientes campos:'),
        createTable(
          ['Campo', 'Valor'],
          [
            ['Name', 'taskflow-kanban-api'],
            ['Root Directory', 'backend'],
            ['Runtime', 'Node'],
            ['Build Command', 'npm install'],
            ['Start Command', 'npm start'],
            ['Instance Type', 'Free'],
          ]
        ),

        h2('Paso 4: Configurar variables de entorno'),
        p('En la sección "Environment Variables", agrega:'),
        createTable(
          ['Key', 'Value'],
          [
            ['JWT_SECRET', 'taskflow_jwt_secreto_2026_seguro'],
            ['NODE_ENV', 'production'],
            ['CLIENT_URL', 'https://taskflow-kanban.netlify.app (la URL que tendrá el frontend)'],
          ]
        ),

        h2('Paso 5: Crear el servicio'),
        bullet('Haz clic en "Create Web Service".'),
        bullet('Render tardará unos minutos en construir y desplegar.'),
        bullet('Una vez terminado, verás una URL como: https://taskflow-kanban-api.onrender.com'),

        h2('Paso 6: Verificar'),
        p('Abre en tu navegador:'),
        code('https://taskflow-kanban-api.onrender.com/api/health'),
        p('Deberías ver: { "status": "ok", "timestamp": "..." }'),

        h1('5. Publicar el Frontend en Netlify'),
        h2('Paso 1: Iniciar sesión en Netlify'),
        p('Ve a https://netlify.com e inicia sesión (puedes usar tu cuenta de GitHub).'),

        h2('Paso 2: Conectar repositorio'),
        bullet('Haz clic en "Add new site" → "Import an existing project".'),
        bullet('Selecciona "GitHub" como proveedor.'),
        bullet('Busca y selecciona el repositorio "taskflow-kanban".'),

        h2('Paso 3: Configurar el build'),
        p('Completa los siguientes campos:'),
        createTable(
          ['Campo', 'Valor'],
          [
            ['Branch to deploy', 'main'],
            ['Base directory', 'frontend'],
            ['Build command', 'npm install && npm run build'],
            ['Publish directory', 'frontend/dist'],
          ]
        ),

        h2('Paso 4: Configurar variable de entorno'),
        p('Haz clic en "Show advanced" y agrega:'),
        createTable(
          ['Key', 'Value'],
          [
            ['VITE_API_URL', 'https://taskflow-kanban-api.onrender.com (la URL de tu backend en Render)'],
          ]
        ),

        h2('Paso 5: Desplegar'),
        bullet('Haz clic en "Deploy site".'),
        bullet('Netlify construirá y desplegará automáticamente.'),
        bullet('Una vez terminado, verás una URL como: https://taskflow-kanban.netlify.app'),

        h2('Paso 6: Verificar'),
        p('Abre la URL de Netlify en tu navegador. Deberías ver la pantalla de inicio de sesión de TaskFlow.'),

        h1('6. Verificar que todo funciona'),
        p('Realiza las siguientes pruebas desde la URL de Netlify:'),
        bullet('Registrar un nuevo usuario.'),
        bullet('Iniciar sesión con ese usuario.'),
        bullet('Crear una tarea nueva.'),
        bullet('Arrastrar la tarea a otra columna.'),
        bullet('Editar la tarea.'),
        bullet('Cerrar sesión.'),
        bullet('Iniciar sesión nuevamente y verificar que las tareas persisten.'),

        h1('7. Configurar GitHub Actions (CI/CD)'),
        p('Para automatizar las pruebas en cada cambio:'),

        h2('Paso 1: Crear el workflow'),
        p('Crea la carpeta y el archivo:'),
        code('mkdir .github\\workflows'),
        p('Crea el archivo .github\\workflows\\ci.yml con el siguiente contenido:'),

        h2('Paso 2: Contenido del archivo ci.yml'),
        p('```yaml'),
        p('name: CI'),
        p('on: [push, pull_request]'),
        p('jobs:'),
        p('  test:'),
        p('    runs-on: ubuntu-latest'),
        p('    steps:'),
        p('      - uses: actions/checkout@v4'),
        p('      - uses: actions/setup-node@v4'),
        p('        with:'),
        p('          node-version: 20'),
        p('      - run: cd backend && npm install'),
        p('      - run: cd backend && npm test'),
        p('```'),

        h2('Paso 3: Subir a GitHub'),
        code('git add .github/'),
        code('git commit -m "ci: add GitHub Actions workflow"'),
        code('git push'),

        p('Luego ve a la pestaña "Actions" de tu repositorio en GitHub para ver el workflow ejecutándose.'),

        h1('8. URLs Finales (ejemplo)'),
        createTable(
          ['Servicio', 'URL'],
          [
            ['Repositorio GitHub', 'https://github.com/TU-USUARIO/taskflow-kanban'],
            ['Frontend (Netlify)', 'https://taskflow-kanban.netlify.app'],
            ['Backend API (Render)', 'https://taskflow-kanban-api.onrender.com'],
            ['Health Check', 'https://taskflow-kanban-api.onrender.com/api/health'],
          ]
        ),

        h1('9. Solución de Problemas Comunes'),
        createTable(
          ['Problema', 'Solución'],
          [
            ['Error 404 en Netlify', 'Verificar que "Publish directory" sea "frontend/dist"'],
            ['Error CORS en consola', 'Verificar que VITE_API_URL apunte a la URL correcta de Render'],
            ['Build falla en Render', 'Verificar que "Root Directory" sea "backend"'],
            ['No puedo registrarme', 'Verificar que el backend responde en /api/health'],
            ['Las tareas no se guardan', 'Verificar que JWT_SECRET esté configurado en Render'],
          ]
        ),

        h1('10. Checklist de Publicación'),
        bullet('✅ Repositorio creado en GitHub y archivos subidos'),
        bullet('✅ Frontend desplegado en Netlify y accesible'),
        bullet('✅ Backend desplegado en Render y health check responde'),
        bullet('✅ Variables de entorno configuradas en ambos servicios'),
        bullet('✅ Registro e inicio de sesión funcionales'),
        bullet('✅ CRUD de tareas funcionando'),
        bullet('✅ Drag & drop entre columnas'),
        bullet('✅ GitHub Actions CI configurado'),
        bullet('✅ README.md actualizado con URLs de producción'),
      ],
    },
  ],
});

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

async function main() {
  const buffer = await Packer.toBuffer(doc);
  const outputDir = path.join(__dirname, '..', 'Documentacion');
  fs.mkdirSync(outputDir, { recursive: true });
  const outputPath = path.join(outputDir, '04 - Guia de Publicacion y Despliegue.docx');
  fs.writeFileSync(outputPath, buffer);
  console.log(`✅ Guía de publicación generada: ${outputPath}`);
  console.log(`   Tamaño: ${(buffer.length / 1024).toFixed(1)} KB`);
}

main().catch(console.error);

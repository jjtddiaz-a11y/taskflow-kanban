const PptxGenJS = require("pptxgenjs");
const path = require("path");
const fs = require("fs");

const pptx = new PptxGenJS();
pptx.author = "Jorge Luis Diaz Cárdenas";
pptx.title = "TaskFlow - Presentación Final";
pptx.subject = "Proyecto Integrado - Implementación de Soluciones para Plataformas Web";

const AZUL = "1E3A5F";
const GRIS = "64748B";
const OSCURO = "1E293B";
const BLANCO = "FFFFFF";
const CELESTE = "3B82F6";

// ════════════════════════════════════════════════════════════════
// DIAPOSITIVA 1 - PORTADA
// ════════════════════════════════════════════════════════════════
const slide1 = pptx.addSlide();
slide1.background = { color: "F8FAFC" };

slide1.addText("PRESENTACIÓN FINAL", {
  x: 0.5, y: 1.0, w: 9, h: 0.6,
  fontSize: 14, color: GRIS, bold: true,
  align: "center",
});

slide1.addText("TaskFlow", {
  x: 0.5, y: 1.8, w: 9, h: 1.2,
  fontSize: 54, color: AZUL, bold: true,
  align: "center",
});

slide1.addText("Sistema Kanban para Gestión de Tareas Colaborativas", {
  x: 0.5, y: 3.0, w: 9, h: 0.7,
  fontSize: 20, color: GRIS,
  align: "center",
});

slide1.addShape(pptx.ShapeType.rect, {
  x: 3.0, y: 4.0, w: 4, h: 0.05,
  fill: { color: CELESTE },
});

slide1.addText("Proyecto Integrado — Implementación de Soluciones para Plataformas Web", {
  x: 0.5, y: 4.3, w: 9, h: 0.5,
  fontSize: 16, color: OSCURO,
  align: "center",
});

slide1.addText([
  { text: "Estudiante: ", options: { bold: true, fontSize: 16, color: OSCURO } },
  { text: "Jorge Luis Diaz Cárdenas", options: { fontSize: 16, color: OSCURO } },
], {
  x: 0.5, y: 5.3, w: 9, h: 0.5,
  align: "center",
});

slide1.addText("12 de julio de 2026", {
  x: 0.5, y: 5.9, w: 9, h: 0.4,
  fontSize: 14, color: GRIS,
  align: "center",
});

// ════════════════════════════════════════════════════════════════
// DIAPOSITIVA 2 - ¿Qué es TaskFlow?
// ════════════════════════════════════════════════════════════════
const slide2 = pptx.addSlide();
slide2.background = { color: "F8FAFC" };

slide2.addText("¿Qué es TaskFlow?", {
  x: 0.5, y: 0.3, w: 9, h: 0.8,
  fontSize: 32, color: AZUL, bold: true,
});

slide2.addText("TaskFlow es una aplicación web basada en la metodología Kanban que permite organizar tareas de forma visual e intuitiva.", {
  x: 0.5, y: 1.2, w: 9, h: 0.6,
  fontSize: 16, color: OSCURO,
});

slide2.addText("¿Qué es Kanban?", {
  x: 0.5, y: 1.9, w: 9, h: 0.5,
  fontSize: 20, color: AZUL, bold: true,
});

slide2.addText("Método visual de gestión de flujo de trabajo. Organiza tareas en tres estados:", {
  x: 0.5, y: 2.4, w: 9, h: 0.4,
  fontSize: 14, color: OSCURO,
});

slide2.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 2.9, w: 2.5, h: 0.6,
  fill: { color: "E2E8F0" },
  rectRadius: 4,
});
slide2.addText("📋 Por Hacer", {
  x: 0.8, y: 2.9, w: 2.5, h: 0.6,
  fontSize: 13, color: OSCURO, bold: true,
  align: "center", valign: "middle",
});

slide2.addShape(pptx.ShapeType.roundRect, {
  x: 3.7, y: 2.9, w: 2.6, h: 0.6,
  fill: { color: "DBEAFE" },
  rectRadius: 4,
});
slide2.addText("⚙️ En Progreso", {
  x: 3.7, y: 2.9, w: 2.6, h: 0.6,
  fontSize: 13, color: OSCURO, bold: true,
  align: "center", valign: "middle",
});

slide2.addShape(pptx.ShapeType.roundRect, {
  x: 6.7, y: 2.9, w: 2.5, h: 0.6,
  fill: { color: "DCFCE7" },
  rectRadius: 4,
});
slide2.addText("✅ Terminado", {
  x: 6.7, y: 2.9, w: 2.5, h: 0.6,
  fontSize: 13, color: OSCURO, bold: true,
  align: "center", valign: "middle",
});

slide2.addText("Características principales:", {
  x: 0.5, y: 3.8, w: 9, h: 0.5,
  fontSize: 18, color: AZUL, bold: true,
});

slide2.addText([
  { text: "✓ ", options: { color: "22C55E", bold: true } },
  { text: "Crea, edita y elimina tareas fácilmente\n", options: { fontSize: 14, color: OSCURO } },
  { text: "✓ ", options: { color: "22C55E", bold: true } },
  { text: "Arrastra y suelta tareas entre columnas\n", options: { fontSize: 14, color: OSCURO } },
  { text: "✓ ", options: { color: "22C55E", bold: true } },
  { text: "Inicio de sesión seguro con JWT\n", options: { fontSize: 14, color: OSCURO } },
  { text: "✓ ", options: { color: "22C55E", bold: true } },
  { text: "Control de acceso: usuarios y administradores\n", options: { fontSize: 14, color: OSCURO } },
  { text: "✓ ", options: { color: "22C55E", bold: true } },
  { text: "Diseño responsive: funciona en cualquier dispositivo", options: { fontSize: 14, color: OSCURO } },
], {
  x: 0.8, y: 4.3, w: 8.5, h: 2.0,
  lineSpacing: 22,
});

// ════════════════════════════════════════════════════════════════
// DIAPOSITIVA 3 - Captura de pantalla (placeholder)
// ════════════════════════════════════════════════════════════════
const slide3 = pptx.addSlide();
slide3.background = { color: "F8FAFC" };

slide3.addText("Pantalla de Inicio — Login y Registro", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 26, color: AZUL, bold: true,
});

slide3.addShape(pptx.ShapeType.rect, {
  x: 1.0, y: 1.3, w: 8, h: 4.5,
  fill: { color: "E2E8F0" },
  line: { color: "CBD5E1", width: 1.5 },
  rectRadius: 6,
});

slide3.addText("📷", {
  x: 1.0, y: 1.3, w: 8, h: 4.5,
  fontSize: 60, color: GRIS,
  align: "center", valign: "middle",
});

slide3.addText("Pega aquí la captura de pantalla del formulario de inicio de sesión", {
  x: 1.0, y: 4.5, w: 8, h: 0.6,
  fontSize: 13, color: GRIS, italics: true,
  align: "center",
});

slide3.addText("Explica: El usuario ingresa su correo y contraseña para acceder al tablero. También puede registrarse si es nuevo.", {
  x: 0.5, y: 6.0, w: 9, h: 0.5,
  fontSize: 14, color: OSCURO,
});

// ════════════════════════════════════════════════════════════════
// DIAPOSITIVA 4 - Beneficios + Stack
// ════════════════════════════════════════════════════════════════
const slide4 = pptx.addSlide();
slide4.background = { color: "F8FAFC" };

slide4.addText("Beneficios de Usar TaskFlow", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 30, color: AZUL, bold: true,
});

slide4.addText("Organización Visual", {
  x: 0.5, y: 1.1, w: 9, h: 0.5,
  fontSize: 18, color: AZUL, bold: true,
});
slide4.addText("De un vistazo sabes el estado de todas tus tareas. No más listas interminables ni correos perdidos.", {
  x: 0.5, y: 1.6, w: 9, h: 0.5,
  fontSize: 14, color: OSCURO,
});

slide4.addText("Productividad Mejorada", {
  x: 0.5, y: 2.2, w: 9, h: 0.5,
  fontSize: 18, color: AZUL, bold: true,
});
slide4.addText([
  { text: "• ", options: { bold: true } },
  { text: "Reducción de sobrecarga cognitiva\n", options: { fontSize: 14 } },
  { text: "• ", options: { bold: true } },
  { text: "Arrastrar y soltar es más rápido que formularios\n", options: { fontSize: 14 } },
  { text: "• ", options: { bold: true } },
  { text: "Identifica cuellos de botella fácilmente", options: { fontSize: 14 } },
], {
  x: 0.5, y: 2.7, w: 9, h: 1.2,
  color: OSCURO,
  lineSpacing: 22,
});

slide4.addText("Accesible y Gratuito", {
  x: 0.5, y: 4.0, w: 9, h: 0.5,
  fontSize: 18, color: AZUL, bold: true,
});
slide4.addText([
  { text: "• ", options: { bold: true } },
  { text: "Sin costos de licencia\n", options: { fontSize: 14 } },
  { text: "• ", options: { bold: true } },
  { text: "Funciona en cualquier navegador\n", options: { fontSize: 14 } },
  { text: "• ", options: { bold: true } },
  { text: "Responsive: escritorio, tablet y móvil", options: { fontSize: 14 } },
], {
  x: 0.5, y: 4.5, w: 9, h: 1.0,
  color: OSCURO,
  lineSpacing: 22,
});

// ════════════════════════════════════════════════════════════════
// DIAPOSITIVA 5 - Stack Tecnológico
// ════════════════════════════════════════════════════════════════
const slide5 = pptx.addSlide();
slide5.background = { color: "F8FAFC" };

slide5.addText("Stack Tecnológico", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 30, color: AZUL, bold: true,
});

const techData = [
  [{ text: "Componente", options: { bold: true, color: BLANCO, fill: { color: AZUL } } },
   { text: "Tecnología", options: { bold: true, color: BLANCO, fill: { color: AZUL } } }],
  ["Frontend", "React 18 + Vite + TailwindCSS"],
  ["Backend", "Node.js + Express 5"],
  ["Base de Datos", "SQLite / PostgreSQL"],
  ["Autenticación", "JWT + bcrypt"],
  ["Despliegue", "Netlify + Render"],
  ["CI/CD", "GitHub Actions"],
  ["Testing", "Jest (12 tests)"],
];

const rows = techData.map((row, i) => {
  return row.map((cell, j) => {
    const isHeader = i === 0;
    const isEven = i % 2 === 0 && !isHeader;
    return {
      text: typeof cell === "string" ? cell : cell.text,
      options: {
        bold: isHeader,
        fontSize: 14,
        color: isHeader ? BLANCO : OSCURO,
        fill: isHeader ? { color: AZUL } : isEven ? { color: "F1F5F9" } : { color: BLANCO },
        align: "center",
        valign: "middle",
        border: { type: "solid", color: "E2E8F0", pt: 0.5 },
      },
    };
  });
});

slide5.addTable(rows, {
  x: 0.8, y: 1.3, w: 8.4, h: 4.0,
  rowH: [0.5, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45],
  colW: [3.5, 4.9],
});

slide5.addText("Seguridad: HTTPS/TLS 1.3 • bcrypt (salt 12) • RBAC • Consultas parametrizadas", {
  x: 0.5, y: 5.8, w: 9, h: 0.5,
  fontSize: 12, color: GRIS, italics: true,
  align: "center",
});

// ════════════════════════════════════════════════════════════════
// DIAPOSITIVA 6 - Dashboard con tareas (placeholder imagen)
// ════════════════════════════════════════════════════════════════
const slide6 = pptx.addSlide();
slide6.background = { color: "F8FAFC" };

slide6.addText("Dashboard — Tareas en Acción", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 26, color: AZUL, bold: true,
});

slide6.addShape(pptx.ShapeType.rect, {
  x: 1.0, y: 1.2, w: 8, h: 4.0,
  fill: { color: "E2E8F0" },
  line: { color: "CBD5E1", width: 1.5 },
  rectRadius: 6,
});

slide6.addText("📷", {
  x: 1.0, y: 1.2, w: 8, h: 4.0,
  fontSize: 60, color: GRIS,
  align: "center", valign: "middle",
});

slide6.addText("Pega aquí la captura del tablero Kanban con tareas registradas", {
  x: 1.0, y: 4.3, w: 8, h: 0.5,
  fontSize: 13, color: GRIS, italics: true,
  align: "center",
});

slide6.addText("Explica: Las tareas se organizan en 3 columnas. El usuario puede arrastrar tareas entre ellas. Los administradores pueden gestionar todas las tareas.", {
  x: 0.5, y: 5.5, w: 9, h: 0.6,
  fontSize: 14, color: OSCURO,
});

// ════════════════════════════════════════════════════════════════
// DIAPOSITIVA 7 - Caso de uso
// ════════════════════════════════════════════════════════════════
const slide7 = pptx.addSlide();
slide7.background = { color: "F8FAFC" };

slide7.addText("Caso de Uso Real", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 30, color: AZUL, bold: true,
});

slide7.addShape(pptx.ShapeType.roundRect, {
  x: 0.8, y: 1.3, w: 8.4, h: 4.5,
  fill: { color: "EFF6FF" },
  line: { color: CELESTE, width: 1 },
  rectRadius: 8,
});

slide7.addText("🏫 Equipo de 3 estudiantes — Proyecto Final", {
  x: 1.2, y: 1.5, w: 7.5, h: 0.6,
  fontSize: 20, color: AZUL, bold: true,
});

slide7.addText([
  { text: "1. ", options: { bold: true, color: AZUL } },
  { text: "Crean tareas para cada entregable del proyecto\n\n", options: { fontSize: 16, color: OSCURO } },
  { text: "2. ", options: { bold: true, color: AZUL } },
  { text: "Cada estudiante ve sus propias tareas asignadas\n\n", options: { fontSize: 16, color: OSCURO } },
  { text: "3. ", options: { bold: true, color: AZUL } },
  { text: "Mueven tareas a \"Terminado\" al completar cada sección\n\n", options: { fontSize: 16, color: OSCURO } },
  { text: "4. ", options: { bold: true, color: AZUL } },
  { text: "El administrador (líder) supervisa el progreso general", options: { fontSize: 16, color: OSCURO } },
], {
  x: 1.2, y: 2.3, w: 7.5, h: 3.0,
  lineSpacing: 26,
});

slide7.addShape(pptx.ShapeType.roundRect, {
  x: 2.5, y: 5.0, w: 5, h: 0.6,
  fill: { color: "DCFCE7" },
  line: { color: "86EFAC", width: 1 },
  rectRadius: 6,
});
slide7.addText("✅ Resultado: Proyecto entregado a tiempo, tareas visibles para todos", {
  x: 2.5, y: 5.0, w: 5, h: 0.6,
  fontSize: 12, color: "166534", bold: true,
  align: "center", valign: "middle",
});

// ════════════════════════════════════════════════════════════════
// DIAPOSITIVA 8 - Preguntas Frecuentes
// ════════════════════════════════════════════════════════════════
const slide8 = pptx.addSlide();
slide8.background = { color: "F8FAFC" };

slide8.addText("Preguntas Frecuentes", {
  x: 0.5, y: 0.3, w: 9, h: 0.7,
  fontSize: 30, color: AZUL, bold: true,
});

const faqs = [
  { q: "¿Necesito instalar algo?", a: "No. Solo un navegador moderno y conexión a internet." },
  { q: "¿Puedo usarlo en mi teléfono?", a: "Sí. Es completamente responsive." },
  { q: "¿Mis datos están seguros?", a: "HTTPS + bcrypt + JWT. Sí." },
  { q: "¿Puedo compartir tareas?", a: "Cada usuario ve sus tareas. El admin ve todo." },
  { q: "¿Y si olvido mi contraseña?", a: "Por ahora puedes crear una nueva cuenta." },
];

faqs.forEach((faq, i) => {
  const y = 1.2 + i * 1.0;
  slide8.addShape(pptx.ShapeType.roundRect, {
    x: 0.8, y: y, w: 8.4, h: 0.8,
    fill: { color: "FFFFFF" },
    line: { color: "E2E8F0", width: 0.5 },
    rectRadius: 4,
    shadow: { type: "outer", blur: 4, offset: 1, color: "000000", opacity: 0.08 },
  });
  slide8.addText([
    { text: `❓ ${faq.q}`, options: { bold: true, fontSize: 13, color: AZUL } },
    { text: `\n${faq.a}`, options: { fontSize: 12, color: GRIS } },
  ], {
    x: 1.0, y: y + 0.05, w: 8.0, h: 0.7,
    valign: "middle",
  });
});

// ════════════════════════════════════════════════════════════════
// DIAPOSITIVA 9 - Cierre
// ════════════════════════════════════════════════════════════════
const slide9 = pptx.addSlide();
slide9.background = { color: "F8FAFC" };

slide9.addText("Gracias", {
  x: 0.5, y: 2.0, w: 9, h: 1.2,
  fontSize: 54, color: AZUL, bold: true,
  align: "center",
});

slide9.addText("¿Preguntas?", {
  x: 0.5, y: 3.2, w: 9, h: 0.7,
  fontSize: 28, color: GRIS,
  align: "center",
});

slide9.addShape(pptx.ShapeType.rect, {
  x: 3.5, y: 4.2, w: 3, h: 0.05,
  fill: { color: CELESTE },
});

slide9.addText("TaskFlow — Organiza tu trabajo, visualiza tu progreso.", {
  x: 0.5, y: 4.6, w: 9, h: 0.5,
  fontSize: 16, color: OSCURO, italics: true,
  align: "center",
});

slide9.addText("Repositorio: https://github.com/jjtddiaz-a11y/taskflow-kanban", {
  x: 0.5, y: 5.3, w: 9, h: 0.4,
  fontSize: 14, color: CELESTE,
  align: "center",
});

// ════════════════════════════════════════════════════════════════
// GUARDAR
// ════════════════════════════════════════════════════════════════
const outputDir = path.join(__dirname, "..", "Documentacion");
fs.mkdirSync(outputDir, { recursive: true });
const outputPath = path.join(outputDir, "06 - Presentacion Final con Demo.pptx");

pptx.writeFile({ fileName: outputPath }).then(() => {
  const size = fs.statSync(outputPath).size;
  console.log(`✅ PPT generado: ${outputPath}`);
  console.log(`   Tamaño: ${(size / 1024).toFixed(1)} KB`);
  console.log(`   Diapositivas: ${pptx.slides.length}`);
});

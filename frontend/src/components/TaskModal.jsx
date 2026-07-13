/**
 * @file Modal para crear y editar tareas.
 * Incluye soporte de teclado (ESC para cerrar) y
 * atributos ARIA para accesibilidad.
 * 
 * @module components/TaskModal
 */

import { useState, useEffect, useRef } from 'react';

/** Opciones de estado disponibles para las tareas */
const STATUS_OPTIONS = [
  { value: 'por_hacer',   label: 'Por Hacer' },
  { value: 'en_progreso', label: 'En Progreso' },
  { value: 'terminado',   label: 'Terminado' },
];

/**
 * Propiedades del componente TaskModal.
 * 
 * @typedef {Object} TaskModalProps
 * @property {Object|null} task     - Tarea a editar (null para crear nueva)
 * @property {Function}    onSave   - Callback al guardar { title, description, status }
 * @property {Function}    onClose  - Callback al cerrar el modal
 */

/**
 * Modal de creación/edición de tareas.
 * Incluye foco automático en el campo de título y
 * cierre con tecla ESC.
 * 
 * @param {TaskModalProps} props
 * @returns {ReactNode}
 */
export default function TaskModal({ task, onSave, onClose }) {
  /** @type {[Object, Function]} Estado del formulario */
  const [form, setForm] = useState({ title: '', description: '', status: 'por_hacer' });

  /** Referencia al campo de título para auto-foco */
  const titleRef = useRef(null);

  // Inicializar formulario con datos de la tarea (modo edición)
  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description || '',
        status: task.status,
      });
    }
    // Auto-foco en el campo de título
    titleRef.current?.focus();
  }, [task]);

  // Cerrar modal con tecla ESC
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  /**
   * Maneja el envío del formulario.
   * Valida que el título no esté vacío.
   * 
   * @param {Event} e - Evento de submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave(form);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        {/* Encabezado del modal */}
        <div className="flex items-center justify-between mb-6">
          <h2 id="modal-title" className="text-xl font-bold text-slate-800">
            {task ? 'Editar Tarea' : 'Crear Tarea'}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 text-xl transition"
            aria-label="Cerrar modal"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Campo: Título */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="task-title">
              Título
            </label>
            <input
              ref={titleRef}
              id="task-title"
              type="text"
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="¿Qué hay que hacer?"
              aria-label="Título de la tarea"
            />
          </div>

          {/* Campo: Descripción */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="task-desc">
              Descripción
            </label>
            <textarea
              id="task-desc"
              rows={3}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition resize-none"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Descripción opcional..."
              aria-label="Descripción de la tarea"
            />
          </div>

          {/* Campo: Estado */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1" htmlFor="task-status">
              Estado
            </label>
            <select
              id="task-status"
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              value={form.status}
              onChange={(e) => setForm({ ...form, status: e.target.value })}
              aria-label="Estado de la tarea"
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-600 rounded-lg hover:bg-slate-50 transition font-medium"
              aria-label="Cancelar y cerrar"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition font-medium"
              aria-label={task ? 'Guardar cambios de la tarea' : 'Crear nueva tarea'}
            >
              {task ? 'Guardar Cambios' : 'Crear Tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

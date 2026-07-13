/**
 * @file Componente de tarjeta de tarea individual.
 * Soporta arrastrar (drag) para mover entre columnas.
 * 
 * @module components/TaskCard
 */

import { useDrag } from 'react-dnd';

/**
 * Propiedades del componente TaskCard.
 * 
 * @typedef {Object} TaskCardProps
 * @property {Object}  task       - Datos de la tarea
 * @property {number}  task.id    - ID único
 * @property {string}  task.title - Título de la tarea
 * @property {string}  [task.description] - Descripción opcional
 * @property {string}  task.status - Estado actual
 * @property {string}  task.created_at - Fecha de creación ISO
 * @property {Function} onEdit    - Callback al editar
 * @property {Function} onDelete  - Callback al eliminar
 * @property {boolean} canDelete  - Si el usuario puede eliminar esta tarea
 */

/**
 * Componente de tarjeta de tarea con soporte de arrastre (drag & drop).
 * 
 * @param {TaskCardProps} props
 * @returns {ReactNode}
 */
export default function TaskCard({ task, onEdit, onDelete, canDelete }) {
  /** Estado de arrastre para react-dnd */
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'TASK',
      item: { id: task.id },
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    }),
    [task.id]
  );

  return (
    <div
      ref={drag}
      className={`bg-white rounded-lg shadow-sm border border-slate-200 p-4 cursor-grab active:cursor-grabbing transition-all ${
        isDragging ? 'opacity-50 scale-95' : 'hover:shadow-md'
      }`}
      role="listitem"
      aria-label={`Tarea: ${task.title}`}
      draggable
    >
      {/* Encabezado con título y botones de acción */}
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-slate-800 text-sm flex-1">{task.title}</h3>

        <div className="flex gap-1 shrink-0">
          {/* Botón de edición */}
          <button
            onClick={(e) => { e.stopPropagation(); onEdit(); }}
            className="text-slate-400 hover:text-blue-600 text-xs p-1 transition"
            aria-label={`Editar: ${task.title}`}
            title="Editar tarea"
          >
            ✏️
          </button>

          {/* Botón de eliminación (solo si tiene permiso) */}
          {canDelete && (
            <button
              onClick={(e) => { e.stopPropagation(); onDelete(); }}
              className="text-slate-400 hover:text-red-600 text-xs p-1 transition"
              aria-label={`Eliminar: ${task.title}`}
              title="Eliminar tarea"
            >
              🗑️
            </button>
          )}
        </div>
      </div>

      {/* Descripción (resumida a 2 líneas) */}
      {task.description && (
        <p className="text-slate-500 text-xs mt-1.5 line-clamp-2">{task.description}</p>
      )}

      {/* Fecha de creación */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-[10px] text-slate-400">
          {new Date(task.created_at).toLocaleDateString('es-PE')}
        </span>
      </div>
    </div>
  );
}

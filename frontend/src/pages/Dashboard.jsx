/**
 * @file Página principal del Dashboard Kanban.
 * Muestra el tablero con 3 columnas y funcionalidad de arrastrar y soltar.
 * 
 * @module pages/Dashboard
 */

import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import api from '../api';
import TaskCard from '../components/TaskCard';
import TaskModal from '../components/TaskModal';

/** Definición de las columnas del Kanban */
const COLUMNS = [
  { key: 'por_hacer',   label: 'Por Hacer',   color: 'bg-slate-100' },
  { key: 'en_progreso', label: 'En Progreso',  color: 'bg-blue-50' },
  { key: 'terminado',   label: 'Terminado',    color: 'bg-green-50' },
];

/**
 * Componente del Dashboard Kanban.
 * Gestiona el estado de las tareas, la autenticación y las
 * operaciones CRUD a través de la API.
 * 
 * @returns {ReactNode}
 */
export default function Dashboard() {
  /** @type {[Array, Function]} Lista de tareas */
  const [tasks, setTasks] = useState([]);

  /** @type {[Object|null, Function]} Usuario autenticado */
  const [user, setUser] = useState(null);

  /** @type {[boolean, Function]} Control de apertura del modal */
  const [modalOpen, setModalOpen] = useState(false);

  /** @type {[Object|null, Function]} Tarea en edición (null = nueva) */
  const [editingTask, setEditingTask] = useState(null);

  const navigate = useNavigate();

  /**
   * Carga las tareas desde la API.
   */
  const loadTasks = useCallback(async () => {
    try {
      const { data } = await api.get('/api/tasks');
      setTasks(data);
    } catch (err) {
      console.error('Error al cargar tareas:', err);
    }
  }, []);

  // Cargar usuario y tareas al montar el componente
  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) setUser(JSON.parse(u));
    loadTasks();
  }, [loadTasks]);

  /**
   * Cierra la sesión del usuario.
   * Limpia localStorage y redirige al login.
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  /**
   * Mueve una tarea a una columna diferente (drag & drop).
   * 
   * @param {number} taskId    - ID de la tarea
   * @param {string} newStatus - Nuevo estado (por_hacer | en_progreso | terminado)
   */
  const moveTask = async (taskId, newStatus) => {
    try {
      await api.put(`/api/tasks/${taskId}`, { status: newStatus });
      setTasks((prev) =>
        prev.map((t) => (t.id === taskId ? { ...t, status: newStatus } : t))
      );
    } catch (err) {
      console.error('Error al mover tarea:', err);
      loadTasks(); // Revertir en caso de error
    }
  };

  /**
   * Guarda una tarea (crea o actualiza según el modo).
   * 
   * @param {Object} taskData - { title, description, status }
   */
  const handleSave = async (taskData) => {
    try {
      if (editingTask) {
        await api.put(`/api/tasks/${editingTask.id}`, taskData);
      } else {
        await api.post('/api/tasks', taskData);
      }
      setModalOpen(false);
      setEditingTask(null);
      loadTasks();
    } catch (err) {
      console.error('Error al guardar tarea:', err);
    }
  };

  /**
   * Elimina una tarea previa confirmación.
   * 
   * @param {number} taskId - ID de la tarea
   */
  const handleDelete = async (taskId) => {
    if (!confirm('¿Estás seguro de eliminar esta tarea?')) return;
    try {
      await api.delete(`/api/tasks/${taskId}`);
      loadTasks();
    } catch (err) {
      console.error('Error al eliminar tarea:', err);
    }
  };

  /**
   * Componente interno de columna Kanban con soporte de drop.
   * 
   * @param {Object}  props
   * @param {Object}  props.column - Datos de la columna { key, label, color }
   * @param {Array}   props.tasks  - Tareas filtradas para esta columna
   * @returns {ReactNode}
   */
  const Column = ({ column, tasks }) => {
    const [{ isOver }, drop] = useDrop(
      () => ({
        accept: 'TASK',
        drop: (item) => moveTask(item.id, column.key),
        collect: (monitor) => ({ isOver: !!monitor.isOver() }),
      }),
      [column.key, tasks]
    );

    const columnTasks = tasks.filter((t) => t.status === column.key);

    return (
      <div
        ref={drop}
        className={`${column.color} rounded-xl p-4 min-h-[400px] transition-all ${
          isOver ? 'ring-2 ring-blue-400 scale-[1.02]' : ''
        }`}
        role="region"
        aria-label={`Columna ${column.label}`}
      >
        {/* Encabezado de columna */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-slate-700 text-lg">{column.label}</h2>
          <span
            className="bg-white px-2.5 py-0.5 rounded-full text-sm font-medium text-slate-500 shadow-sm"
            aria-label={`${columnTasks.length} tareas`}
          >
            {columnTasks.length}
          </span>
        </div>

        {/* Lista de tareas */}
        <div className="space-y-3" role="list" aria-label="Tareas">
          {columnTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={() => { setEditingTask(task); setModalOpen(true); }}
              onDelete={() => handleDelete(task.id)}
              canDelete={user?.role === 'admin' || task.user_id === user?.id}
            />
          ))}
          {columnTasks.length === 0 && (
            <p className="text-slate-400 text-sm text-center py-8" role="status">
              Arrastra tareas aquí
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-800">
      {/* Barra de navegación superior */}
      <header className="bg-white shadow-md px-6 py-3 flex items-center justify-between" role="banner">
        <h1 className="text-xl font-bold text-slate-800">TaskFlow</h1>

        <nav className="flex items-center gap-4" aria-label="Navegación principal">
          <span className="text-sm text-slate-600">
            {user?.name}
            {user?.role === 'admin' && (
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full ml-2">
                Admin
              </span>
            )}
          </span>

          <button
            onClick={() => { setEditingTask(null); setModalOpen(true); }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-lg text-sm font-medium transition"
            aria-label="Crear nueva tarea"
          >
            + Nueva Tarea
          </button>

          <button
            onClick={handleLogout}
            className="text-slate-500 hover:text-red-600 transition text-sm"
            aria-label="Cerrar sesión"
          >
            Salir
          </button>
        </nav>
      </header>

      {/* Tablero Kanban */}
      <main className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {COLUMNS.map((col) => (
            <Column key={col.key} column={col} tasks={tasks} />
          ))}
        </div>
      </main>

      {/* Modal de crear/editar tarea */}
      {modalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleSave}
          onClose={() => { setModalOpen(false); setEditingTask(null); }}
        />
      )}
    </div>
  );
}

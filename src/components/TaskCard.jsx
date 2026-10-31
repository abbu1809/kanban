import { CalendarDays, MoreHorizontal } from 'lucide-react'
import { useState } from 'react'
import { useTasks } from '../context/TaskContext'

const priorityStyles = {
  High: 'priority-high',
  Medium: 'priority-medium',
  Low: 'priority-low',
}

const nextStatus = { todo: 'progress', progress: 'completed', completed: 'todo' }

export default function TaskCard({ task, onEdit }) {
  const { moveTask, deleteTask } = useTasks()
  const [menuOpen, setMenuOpen] = useState(false)
  const overdue = task.dueDate && task.status !== 'completed' && new Date(`${task.dueDate}T23:59:59`) < new Date()
  return (
    <article className="task-card group">
      <div className="mb-3 flex items-start justify-between gap-3">
        <span className={`priority-pill ${priorityStyles[task.priority]}`}>{task.priority}</span>
        <div className="relative">
          <button className="icon-button opacity-60 transition-opacity group-hover:opacity-100" onClick={() => setMenuOpen((open) => !open)} aria-label="Task actions">
            <MoreHorizontal size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 z-10 w-28 rounded-lg border border-[#e1e6ed] bg-white p-1 shadow-lg">
              <button className="menu-item" onClick={() => { onEdit(task); setMenuOpen(false) }}>Edit</button>
              <button className="menu-item text-[#cf6464]" onClick={() => { deleteTask(task.id); setMenuOpen(false) }}>Delete</button>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-start gap-2">
        <span className={`task-status-dot status-${task.status}`} />
        <h3 className="text-[15px] font-bold leading-5 text-[#293648]">{task.title}</h3>
      </div>
      {task.description && <p className="mt-2 line-clamp-2 text-[13px] leading-5 text-[#8490a0]">{task.description}</p>}
      <div className="mt-5 flex items-center justify-between border-t border-[#edf0f3] pt-3">
        <span className={`flex items-center gap-1.5 text-[11px] font-medium ${overdue ? 'text-[#cc6b61]' : 'text-[#8994a4]'}`}>
          <CalendarDays size={13} /> {task.dueDate ? new Date(`${task.dueDate}T12:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : 'No due date'}
        </span>
        <button className="move-task-button" onClick={() => moveTask(task.id, nextStatus[task.status])}>
          {task.status === 'completed' ? 'Reopen' : 'Move next'} →
        </button>
      </div>
    </article>
  )
}

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { useTasks } from '../context/TaskContext'

const emptyTask = { title: '', description: '', priority: 'Medium', dueDate: '', status: 'todo' }

export default function TaskModal({ mode, task, onClose }) {
  const { addTask, updateTask } = useTasks()
  const [form, setForm] = useState(task || emptyTask)
  const [error, setError] = useState('')
  useEffect(() => {
    const handleKeyDown = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const setField = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  const submit = (event) => {
    event.preventDefault()
    if (!form.title.trim()) {
      setError('Give your task a title before saving.')
      return
    }
    if (mode === 'edit') updateTask({ ...form, title: form.title.trim() })
    else addTask({ ...form, title: form.title.trim() })
    onClose()
  }
  return (
    <div className="fixed inset-0 z-30 flex items-end justify-center bg-[#17212f]/30 p-0 backdrop-blur-[2px] sm:items-center sm:p-4" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="modal-panel w-full max-w-lg rounded-t-2xl bg-white p-6 shadow-2xl sm:rounded-2xl sm:p-7">
        <div className="mb-6 flex items-start justify-between">
          <div>
            <p className="eyebrow">{mode === 'edit' ? 'Update task' : 'New task'}</p>
            <h2 className="mt-2 text-xl font-bold tracking-[-0.03em] text-[#263547]">{mode === 'edit' ? 'Keep the details current.' : 'What needs your attention?'}</h2>
            <p className="mt-1 text-xs text-[#8a95a5]">Add enough detail to make the next step obvious.</p>
          </div>
          <button className="icon-button" onClick={onClose} aria-label="Close"><X size={19} /></button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <label className="field-label">Title <input className={`input mt-1.5 ${error ? 'border-[#d47c73]' : ''}`} value={form.title} onChange={(event) => { setField('title', event.target.value); setError('') }} placeholder="e.g. Prepare sprint notes" autoFocus />{error && <span className="mt-1 block text-xs text-[#c8665e]">{error}</span>}</label>
          <label className="field-label">Description <textarea className="input mt-1.5 min-h-24 resize-y" value={form.description} onChange={(event) => setField('description', event.target.value)} placeholder="A little context goes a long way..." /></label>
          <div className="grid gap-4 sm:grid-cols-3">
            <label className="field-label">Priority <select className="select mt-1.5 w-full" value={form.priority} onChange={(event) => setField('priority', event.target.value)}><option>High</option><option>Medium</option><option>Low</option></select></label>
            <label className="field-label">Due date <input type="date" className="input mt-1.5 w-full" value={form.dueDate} onChange={(event) => setField('dueDate', event.target.value)} /></label>
            <label className="field-label">Status <select className="select mt-1.5 w-full" value={form.status} onChange={(event) => setField('status', event.target.value)}><option value="todo">Todo</option><option value="progress">In Progress</option><option value="completed">Completed</option></select></label>
          </div>
          <div className="mt-7 flex justify-end gap-2 border-t border-[#edf0f3] pt-5">
            <button type="button" className="button-secondary" onClick={onClose}>Cancel</button>
            <button className="button-primary">{mode === 'edit' ? 'Save changes' : 'Create task'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}

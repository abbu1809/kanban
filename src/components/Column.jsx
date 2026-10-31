import { Plus } from 'lucide-react'
import { useState } from 'react'
import { useTasks } from '../context/TaskContext'
import TaskCard from './TaskCard'
import EmptyState from './EmptyState'

export default function Column({ column, tasks, hasFilters, onEdit }) {
  const Icon = column.icon
  const [isAdding, setIsAdding] = useState(false)
  return (
    <section className={`column-shell column-${column.id}`}>
      <div className="flex items-center justify-between px-1 pb-4">
        <div className="flex items-center gap-2.5">
          <span className="column-icon" style={{ color: column.color, backgroundColor: `${column.color}18` }}>
            <Icon size={15} strokeWidth={2.3} />
          </span>
          <h2 className="text-sm font-bold text-[#303c4d]">{column.label}</h2>
          <span className="count-badge">{tasks.length}</span>
        </div>
        <button className="icon-button column-add" aria-label={`Add task to ${column.label}`} onClick={() => setIsAdding(true)}>
          <Plus size={17} />
        </button>
      </div>
      {tasks.length ? (
        <div className="space-y-3">
          {tasks.map((task) => <TaskCard key={task.id} task={task} onEdit={onEdit} />)}
        </div>
      ) : (
        <EmptyState filtered={hasFilters} column={column.label} onAdd={() => setIsAdding(true)} />
      )}
      {isAdding && <QuickAdd status={column.id} onDone={() => setIsAdding(false)} />}
    </section>
  )
}

function QuickAdd({ status, onDone }) {
  const { addTask } = useTasks()
  const [title, setTitle] = useState('')
  const submit = (event) => {
    event.preventDefault()
    if (!title.trim()) return
    addTask({ title: title.trim(), description: '', priority: 'Medium', dueDate: '', status })
    onDone()
  }
  return (
    <form className="mt-3 rounded-xl border border-[#dbe2ea] bg-white p-3 shadow-sm" onSubmit={submit}>
      <input autoFocus className="input mb-2" value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Task title..." />
      <div className="flex justify-end gap-2">
        <button type="button" className="button-small-secondary" onClick={onDone}>Cancel</button>
        <button className="button-small-primary">Add task</button>
      </div>
    </form>
  )
}

import { useMemo, useState } from 'react'
import { CheckCircle2, Circle, Clock3, Plus } from 'lucide-react'
import { TaskProvider, useTasks } from './context/TaskContext'
import Header from './components/Header'
import Toolbar from './components/Toolbar'
import Board from './components/Board'
import TaskModal from './components/TaskModal'

function KanbanApp() {
  const { tasks } = useTasks()
  const currentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date())
  const [query, setQuery] = useState('')
  const [priority, setPriority] = useState('All priorities')
  const [status, setStatus] = useState('All statuses')
  const [modal, setModal] = useState(null)

  const filteredTasks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    return tasks.filter((task) => {
      const matchesQuery = !normalizedQuery || task.title.toLowerCase().includes(normalizedQuery)
      const matchesPriority = priority === 'All priorities' || task.priority === priority
      const matchesStatus = status === 'All statuses' || task.status === status
      return matchesQuery && matchesPriority && matchesStatus
    })
  }, [priority, query, status, tasks])

  return (
    <div className="min-h-screen bg-[#f7f8fa] text-[#17212f]">
      <div className="mx-auto max-w-[1440px] px-5 pb-10 sm:px-8 lg:px-12">
        <Header />
        <main>
          <div className="hero-panel mb-7 flex flex-col gap-7 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow mb-3">
                {currentDate}
              </p>
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-[#17212f] sm:text-4xl">
                Good morning, let&apos;s make progress.
              </h1>
              <p className="mt-2 max-w-md text-sm leading-6 text-[#748093]">
                Keep the important work moving forward, one clear step at a time.
              </p>
            </div>
            <button className="button-primary hero-action self-start sm:self-auto" onClick={() => setModal({ type: 'create' })}>
              <Plus size={18} strokeWidth={2.2} />
              Add task
            </button>
          </div>
          <div className="stats-row">
            <div className="stat-card"><span className="stat-icon stat-icon-todo"><Circle size={16} /></span><span><strong>{tasks.filter((task) => task.status === 'todo').length}</strong><small>To do</small></span></div>
            <div className="stat-card"><span className="stat-icon stat-icon-progress"><Clock3 size={16} /></span><span><strong>{tasks.filter((task) => task.status === 'progress').length}</strong><small>In progress</small></span></div>
            <div className="stat-card"><span className="stat-icon stat-icon-completed"><CheckCircle2 size={16} /></span><span><strong>{tasks.filter((task) => task.status === 'completed').length}</strong><small>Completed</small></span></div>
          </div>
          <Toolbar
            query={query}
            onQueryChange={setQuery}
            priority={priority}
            onPriorityChange={setPriority}
            status={status}
            onStatusChange={setStatus}
          />
          <Board tasks={filteredTasks} hasFilters={Boolean(query || priority !== 'All priorities' || status !== 'All statuses')} onEdit={(task) => setModal({ type: 'edit', task })} />
        </main>
      </div>
      {modal && <TaskModal mode={modal.type} task={modal.task} onClose={() => setModal(null)} />}
    </div>
  )
}

export default function App() {
  return (
    <TaskProvider>
      <KanbanApp />
    </TaskProvider>
  )
}

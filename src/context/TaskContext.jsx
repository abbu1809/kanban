import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const TaskContext = createContext(null)
const STORAGE_KEY = 'quiet-kanban-tasks'

const starterTasks = [
  {
    id: 'welcome-task',
    title: 'Shape the landing page',
    description: 'Turn the rough wireframe into a calm, focused first impression.',
    priority: 'High',
    dueDate: '2026-11-04',
    status: 'todo',
  },
  {
    id: 'research-task',
    title: 'Review user feedback',
    description: 'Pull out the three themes that should inform the next sprint.',
    priority: 'Medium',
    dueDate: '2026-11-06',
    status: 'progress',
  },
  {
    id: 'ship-task',
    title: 'Publish the changelog',
    description: 'Share what changed in the latest release with the team.',
    priority: 'Low',
    dueDate: '2026-11-01',
    status: 'completed',
  },
]

function readTasks() {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : starterTasks
  } catch {
    return starterTasks
  }
}

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState(readTasks)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }, [tasks])

  const addTask = (task) => {
    setTasks((current) => [{ ...task, id: crypto.randomUUID() }, ...current])
  }

  const updateTask = (updatedTask) => {
    setTasks((current) =>
      current.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    )
  }

  const deleteTask = (id) => {
    setTasks((current) => current.filter((task) => task.id !== id))
  }

  const moveTask = (id, status) => {
    setTasks((current) =>
      current.map((task) => (task.id === id ? { ...task, status } : task)),
    )
  }

  const value = useMemo(
    () => ({ tasks, addTask, updateTask, deleteTask, moveTask }),
    [tasks],
  )

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>
}

export function useTasks() {
  const context = useContext(TaskContext)
  if (!context) throw new Error('useTasks must be used inside TaskProvider')
  return context
}

import { Circle, Clock3, CheckCircle2, ListFilter } from 'lucide-react'
import Column from './Column'

const columns = [
  { id: 'todo', label: 'Todo', icon: Circle, color: '#8f9aaa' },
  { id: 'progress', label: 'In progress', icon: Clock3, color: '#d59b43' },
  { id: 'completed', label: 'Completed', icon: CheckCircle2, color: '#54ad8c' },
]

export default function Board({ tasks, hasFilters, onEdit }) {
  return (
    <div className="board-area">
      <div className="board-summary">
        <div>
          <div className="flex items-center gap-2">
            <ListFilter size={15} className="text-[#8b98a9]" />
            <h2 className="text-sm font-bold text-[#344154]">Task overview</h2>
          </div>
          <p className="mt-1 text-xs text-[#8d98a8]">
            {hasFilters ? 'Showing matching tasks across your workflow.' : 'Keep momentum by moving one task at a time.'}
          </p>
        </div>
        <div className="summary-metrics">
          <span><strong>{tasks.length}</strong> visible</span>
          <span className="summary-divider" />
          <span><strong>{tasks.filter((task) => task.status === 'completed').length}</strong> complete</span>
        </div>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        {columns.map((column) => (
          <Column key={column.id} column={column} tasks={tasks.filter((task) => task.status === column.id)} hasFilters={hasFilters} onEdit={onEdit} />
        ))}
      </div>
    </div>
  )
}

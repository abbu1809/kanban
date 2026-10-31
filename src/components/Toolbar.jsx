import { Search, SlidersHorizontal, X } from 'lucide-react'

export default function Toolbar({ query, onQueryChange, priority, onPriorityChange, status, onStatusChange }) {
  const hasFilters = query || priority !== 'All priorities' || status !== 'All statuses'
  return (
    <div className="toolbar-shell mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="search-field">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#98a2b1]" size={17} />
        <input className="input search-input pl-10 pr-10" value={query} onChange={(event) => onQueryChange(event.target.value)} placeholder="Search by task title" aria-label="Search tasks by title" />
        {query && (
          <button className="search-clear" onClick={() => onQueryChange('')} aria-label="Clear search">
            <X size={14} />
          </button>
        )}
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <div className="mr-1 hidden items-center gap-1.5 text-xs font-medium text-[#8994a4] sm:flex">
          <SlidersHorizontal size={14} /> Filter by
        </div>
        <select className="select" value={priority} onChange={(event) => onPriorityChange(event.target.value)} aria-label="Filter by priority">
          <option>All priorities</option>
          <option>High</option><option>Medium</option><option>Low</option>
        </select>
        <select className="select" value={status} onChange={(event) => onStatusChange(event.target.value)} aria-label="Filter by status">
          <option>All statuses</option>
          <option value="todo">Todo</option><option value="progress">In Progress</option><option value="completed">Completed</option>
        </select>
        {hasFilters && (
          <button className="ml-1 inline-flex items-center gap-1 text-xs font-semibold text-[#66758a] hover:text-[#17212f]" onClick={() => { onQueryChange(''); onPriorityChange('All priorities'); onStatusChange('All statuses') }}>
            <X size={14} /> Clear
          </button>
        )}
      </div>
    </div>
  )
}

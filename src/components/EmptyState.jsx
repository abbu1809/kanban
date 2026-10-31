import { Inbox } from 'lucide-react'

export default function EmptyState({ filtered, column, onAdd }) {
  return (
    <div className="empty-state">
      <span className="empty-icon"><Inbox size={20} strokeWidth={1.6} /></span>
      <p className="font-semibold text-[#7f8b9b]">{filtered ? 'No matching tasks' : `Nothing in ${column.toLowerCase()}`}</p>
      <small>{filtered ? 'Try adjusting your filters.' : 'This is a good place for a fresh start.'}</small>
      {!filtered && <button onClick={onAdd}>Add a task</button>}
    </div>
  )
}

import { LayoutGrid } from 'lucide-react'

export default function Header() {
  return (
    <header className="flex items-center justify-between py-6">
      <div className="flex items-center gap-3">
        <div className="brand-mark" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <div>
          <span className="block text-[15px] font-bold leading-4 tracking-[-0.02em]">quiet / kanban</span>
          <span className="hidden text-[10px] font-medium tracking-wide text-[#9aa4b2] sm:block">PERSONAL WORKSPACE</span>
        </div>
      </div>
      <div className="header-right">
        <div className="header-nav">
          <span className="header-nav-active"><LayoutGrid size={14} /> Board</span>
        </div>
        <div className="hidden items-center gap-2 text-xs text-[#8a95a5] sm:flex">
          <span className="save-status-dot" />
          <span>Saved locally</span>
        </div>
      </div>
    </header>
  )
}

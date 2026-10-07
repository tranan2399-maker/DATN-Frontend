export interface ConcessionTabsProps {
  activeTab: string
  // eslint-disable-next-line no-unused-vars
  onSelectTab: (tab: string) => void
}

const TABS = [
  { id: 'all', label: 'Tất cả' },
  { id: 'combo', label: 'Combo ưu đãi' },
  { id: 'single', label: 'Món ăn & Nước' }
]

export function ConcessionTabs({ activeTab, onSelectTab }: ConcessionTabsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
      {TABS.map((tab) => {
        const isActive = activeTab === tab.id
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onSelectTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 ${
              isActive
                ? 'bg-[#E50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.5)]'
                : 'bg-[#18181E] text-[#A8A8B3] border border-white/[0.06] hover:border-white/20 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        )
      })}
    </div>
  )
}

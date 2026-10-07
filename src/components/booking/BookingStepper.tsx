import { Armchair, Popcorn, CreditCard, CheckCircle2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { HoldTimerBadge } from './HoldTimerBadge'
import { TicketType } from '@/store/ticket'
import { useLocalStorage } from '@uidotdev/usehooks'

interface BookingStepperProps {
  currentPath: string
  className?: string
}

const STEPS = [
  { id: 'seat', path: '/purchase/seat', label: 'Chọn ghế', icon: Armchair, stepNumber: 1 },
  { id: 'food', path: '/purchase/food', label: 'Bắp nước', icon: Popcorn, stepNumber: 2 },
  { id: 'payment', path: '/purchase/payment', label: 'Thanh toán', icon: CreditCard, stepNumber: 3 },
  { id: 'result', path: '/result', label: 'Hoàn tất', icon: CheckCircle2, stepNumber: 4 }
]

export function BookingStepper({ currentPath, className = '' }: BookingStepperProps) {
  const navigate = useNavigate()
  const [ticket] = useLocalStorage<TicketType>('ticket')

  const getCurrentStepIndex = () => {
    if (currentPath.includes('/seat')) return 0
    if (currentPath.includes('/food')) return 1
    if (currentPath.includes('/payment')) return 2
    if (currentPath.includes('/result')) return 3
    return 0
  }

  const activeIndex = getCurrentStepIndex()

  const handleStepClick = (targetIndex: number, targetPath: string) => {
    // Only allow navigating back to completed steps
    if (targetIndex < activeIndex) {
      navigate(targetPath)
    }
  }

  return (
    <div className={`w-full bg-[#131317] border border-white/[0.08] rounded-2xl p-4 sm:p-5 shadow-lg ${className}`}>
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Stepper items */}
        <div className="flex items-center gap-2 sm:gap-4 overflow-x-auto pb-1 md:pb-0 scrollbar-none">
          {STEPS.map((step, idx) => {
            const Icon = step.icon
            const isCompleted = idx < activeIndex
            const isActive = idx === activeIndex
            const isClickable = isCompleted

            return (
              <div key={step.id} className="flex items-center gap-2 sm:gap-3 shrink-0">
                <button
                  type="button"
                  disabled={!isClickable}
                  onClick={() => handleStepClick(idx, step.path)}
                  className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-[#E50914] text-white shadow-[0_0_16px_rgba(229,9,20,0.45)]'
                      : isCompleted
                      ? 'bg-[#1F1F24] text-[#ffd484] hover:bg-[#2A2A32] cursor-pointer'
                      : 'bg-white/[0.03] text-[#71717A] cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : isCompleted
                        ? 'bg-[#ffd484]/15 text-[#ffd484]'
                        : 'bg-white/5 text-[#71717A]'
                    }`}
                  >
                    {isCompleted ? <CheckCircle2 className="w-3.5 h-3.5" /> : step.stepNumber}
                  </div>
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline font-headline">{step.label}</span>
                </button>

                {/* Connecting arrow/divider between steps */}
                {idx < STEPS.length - 1 && (
                  <div className="w-4 sm:w-6 h-[1px] bg-white/[0.1] shrink-0" />
                )}
              </div>
            )
          })}
        </div>

        {/* Right side: Countdown timer (if ticket created) */}
        {ticket && ticket.ticket_id && (
          <div className="shrink-0 flex items-center justify-end">
            <HoldTimerBadge />
          </div>
        )}
      </div>
    </div>
  )
}

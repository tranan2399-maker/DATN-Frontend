import { AnimatedPage } from '@/components/AnimatedPage'
import { CheckCircle2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { DigitalTicketStitch } from './DigitalTicketStitch'
import '@/styles/booking-stitch.css'

function ResultPage() {
  const [isNavi, setIsNavi] = useState(false)
  const [ticketData, setTicketData] = useState<any>(null)

  useEffect(() => {
    // Read last completed ticket details if available
    try {
      const saved = localStorage.getItem('lastCompletedTicket')
      if (saved) {
        setTicketData(JSON.parse(saved))
      }
    } catch (e) {
      console.error(e)
    }

    return () => {
      setIsNavi(true)
      if (isNavi) {
        localStorage.removeItem('resultToken')
        localStorage.removeItem('lastCompletedTicket')
      }
    }
  }, [isNavi])

  return (
    <AnimatedPage>
      <div className="booking-stitch min-h-[80vh] flex flex-col items-center justify-center py-12 px-4 sm:px-6">
        <div className="w-full max-w-3xl flex flex-col items-center space-y-8">
          {/* Success Banner */}
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_24px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold font-headline text-white tracking-wide">
              Thanh Toán Thành Công!
            </h2>
            <p className="text-xs sm:text-sm text-[#A8A8B3] max-w-md mx-auto leading-relaxed">
              Cảm ơn bạn đã lựa chọn Dream Cinema. Vé điện tử đã sẵn sàng để quét tại rạp.
            </p>
          </div>

          {/* Stepper with all 4 steps completed */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 text-xs font-semibold text-emerald-400">
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>Suất chiếu</span>
            </div>
            <span className="text-white/20">→</span>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>Ghế ngồi</span>
            </div>
            <span className="text-white/20">→</span>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>Bắp nước</span>
            </div>
            <span className="text-white/20">→</span>
            <div className="flex items-center gap-1.5">
              <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px] font-bold">✓</span>
              <span>Vé điện tử</span>
            </div>
          </div>

          {/* Perforated Digital Ticket */}
          <DigitalTicketStitch ticketData={ticketData} />
        </div>
      </div>
    </AnimatedPage>
  )
}

export default ResultPage

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Loader2, ArrowRight } from 'lucide-react'
import ModalPayMentMB from './ModalPayMentMB'
import { useEffect } from 'react'
import { FULL_SCHEDULE } from '@/utils/constant'
import { toast } from 'react-toastify'

function DialogPayment({
  isLoading,
  dataShowtime
}: {
  isLoading: boolean
  dataShowtime: any
}) {
  useEffect(() => {
    const showtime = Array.isArray(dataShowtime) ? dataShowtime[0] : dataShowtime
    if (showtime?.status === FULL_SCHEDULE || showtime?.destroy) {
      toast.error('Suất chiếu không còn khả dụng', {
        position: 'top-right'
      })
    }
  }, [dataShowtime])

  const showtime = Array.isArray(dataShowtime) ? dataShowtime[0] : dataShowtime
  const isDisabled = Boolean(showtime?.status === FULL_SCHEDULE || showtime?.destroy)

  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          type="button"
          disabled={isDisabled || isLoading}
          className="w-full py-3.5 px-4 rounded-xl stitch-btn-primary flex items-center justify-center gap-2 text-sm font-bold uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin text-white" />
          ) : (
            <>
              <span>Thanh toán VietQR Vietcombank</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl p-0 overflow-hidden bg-transparent border-0 shadow-2xl">
        <ModalPayMentMB />
      </DialogContent>
    </Dialog>
  )
}

export default DialogPayment

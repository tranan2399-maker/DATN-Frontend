import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Loader } from 'lucide-react'
import ModalPayMentMB from './ModalPayMentMB'
import { useEffect } from 'react'
import { FULL_SCHEDULE } from '@/utils/constant'
import { toast } from 'react-toastify'

function DialogPayment({
  isLoading,
  dataShowtime
}: {
  isLoading: boolean
  dataShowtime: { status: string; destroy: boolean }
}) {
  useEffect(() => {
    if (dataShowtime.status == FULL_SCHEDULE || dataShowtime.destroy) {
      toast.error('Showtime is not available', {
        position: 'top-right'
      })
    }
  }, [dataShowtime])
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button disabled={dataShowtime.status == FULL_SCHEDULE || dataShowtime.destroy} className="ticket-btn disabled:opacity-70 bg-primary-movieColor rounded-full text-primary-locationMovie disabled:cursor-not-allowed">
          {isLoading ? <Loader className="animate-spin" /> : 'purchase ticket'}
        </button>
      </DialogTrigger>
      <DialogContent className="xs:max-w-[425px] md:max-w-[625px] sm:max-w-[555px] p-0 overflow-hidden bg-white">
        <ModalPayMentMB />
      </DialogContent>
    </Dialog>
  )
}

export default DialogPayment

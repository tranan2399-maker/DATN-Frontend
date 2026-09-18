import { Separator } from '@/components/ui/separator'
import ProfileBill from './ProfileBill'

export default function ProfileBillPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[19px] font-medium">Lịch sử mua</h3>
        <p className="text-2xl text-muted-foreground ">
          Bạn có thể xem tất cả các giao dịch của bạn tại đây
        </p>
      </div>
      <Separator className="bg-border-borderProfileContain mt-2" />
      <ProfileBill />
    </div>
  )
}

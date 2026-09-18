import { Separator } from '@/components/ui/separator'
import WatchList from './WatchList'

function ProfileWatchListPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[19px] font-medium">Xem sau</h3>
        <p className="text-2xl text-muted-foreground ">
          Bạn có thể xem danh sách xem sau ở đây
        </p>
      </div>
      <Separator className="bg-border-borderProfileContain mt-2" />
      <WatchList />
    </div>
  )
}
export default ProfileWatchListPage

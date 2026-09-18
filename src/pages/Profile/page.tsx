import { Separator } from '@/components/ui/separator'
import { ProfileForm } from './profile-form'

export default function SettingsProfilePage() {
  return (
    <div className="space-y-11">
      <div>
        <h3 className="text-[19px] font-medium">Thông tin cá nhân</h3>
        <p className=" text-muted-foreground text-2xl">
          Đây là những thông tin mà người khác sẽ nhìn thấy bạn trên trang web.
        </p>
      </div>
      <Separator className="bg-border-borderProfileContain mt-2" />
      <ProfileForm />
    </div>
  )
}

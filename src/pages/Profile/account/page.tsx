import { Separator } from '@/components/ui/separator'
import { AccountForm } from './account-form'

export default function SettingsAccountPage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Tài khoản</h3>
        <p className="text-sm text-muted-foreground">
        Cập nhật cài đặt tài khoản của bạn. Đặt ngôn ngữ ưa thích của bạn và
           Múi giờ.
        </p>
      </div>
      <Separator />
      <AccountForm />
    </div>
  )
}

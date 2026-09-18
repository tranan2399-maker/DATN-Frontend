import { Separator } from '@/components/ui/separator'
import { AppearanceForm } from './appearance-form'

export default function SettingsAppearancePage() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[19px] font-medium">Vẻ bề ngoài</h3>
        <p className="text-2xl text-muted-foreground ">
        Tùy chỉnh giao diện của ứng dụng. Tự động chuyển đổi giữa ngày
           và chủ đề ban đêm.
        </p>
      </div>
      <Separator className="bg-border-borderProfileContain mt-2" />
      <AppearanceForm />
    </div>
  )
}

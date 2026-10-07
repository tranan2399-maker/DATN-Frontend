import { Mail, Phone, User, MapPin, ShieldCheck } from 'lucide-react'
import { ContextMain } from '@/context/Context'
import { useContext } from 'react'
import UserDialogConfirm from './UserDialogConfirm'

function UserConfirmPayment() {
  const { userDetail } = useContext(ContextMain)

  return (
    <div className="bg-[#18181E] border border-white/[0.08] rounded-2xl p-5 sm:p-6 mb-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#E50914]/15 border border-[#E50914]/30 flex items-center justify-center text-[#ff8080]">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white font-headline">
              Thông tin người nhận vé
            </h3>
            <p className="text-xs text-[#A8A8B3]">
              Vé điện tử và mã QR vào phòng chiếu sẽ được gửi tới thông tin này
            </p>
          </div>
        </div>

        {userDetail?.message && (
          <div>
            <UserDialogConfirm />
          </div>
        )}
      </div>

      {/* Grid info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 pt-4">
        <div className="bg-[#131317] border border-white/[0.04] rounded-xl p-3 flex items-start gap-3">
          <User className="w-4 h-4 text-[#A8A8B3] mt-0.5 shrink-0" />
          <div className="min-w-0">
            <span className="text-[11px] text-[#71717A] block">Họ và tên</span>
            <span className="text-xs font-semibold text-white truncate block">
              {userDetail?.message?.name ?? 'Khách hàng'}
            </span>
          </div>
        </div>

        <div className="bg-[#131317] border border-white/[0.04] rounded-xl p-3 flex items-start gap-3">
          <Mail className="w-4 h-4 text-[#A8A8B3] mt-0.5 shrink-0" />
          <div className="min-w-0">
            <span className="text-[11px] text-[#71717A] block">Email</span>
            <span className="text-xs font-semibold text-white truncate block">
              {userDetail?.message?.email ?? 'Chưa đăng ký email'}
            </span>
          </div>
        </div>

        <div className="bg-[#131317] border border-white/[0.04] rounded-xl p-3 flex items-start gap-3">
          <Phone className="w-4 h-4 text-[#A8A8B3] mt-0.5 shrink-0" />
          <div className="min-w-0">
            <span className="text-[11px] text-[#71717A] block">Số điện thoại</span>
            <span className="text-xs font-semibold text-white truncate block">
              {userDetail?.message?.mobile ?? 'Chưa cập nhật'}
            </span>
          </div>
        </div>

        <div className="bg-[#131317] border border-white/[0.04] rounded-xl p-3 flex items-start gap-3">
          <MapPin className="w-4 h-4 text-[#A8A8B3] mt-0.5 shrink-0" />
          <div className="min-w-0">
            <span className="text-[11px] text-[#71717A] block">Địa chỉ</span>
            <span className="text-xs font-semibold text-white truncate block">
              {userDetail?.message?.address ?? 'Hà Nội'}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserConfirmPayment

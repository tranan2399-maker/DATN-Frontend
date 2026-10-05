import React from 'react'
import { ShieldAlert } from 'lucide-react'

interface AgeConfirmationDialogProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  ageLimit?: number
}

export const AgeConfirmationDialog: React.FC<AgeConfirmationDialogProps> = ({
  isOpen,
  onClose,
  onConfirm,
  ageLimit = 13
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#14141A] border border-white/[0.1] rounded-2xl shadow-2xl p-5 sm:p-6 space-y-4 text-center">
        <div className="w-14 h-14 rounded-full bg-[#E50914]/20 text-[#E50914] flex items-center justify-center mx-auto border border-[#E50914]/30">
          <ShieldAlert className="w-8 h-8 text-[#E50914]" />
        </div>

        <div className="space-y-1.5">
          <h3 className="font-headline text-lg sm:text-xl font-bold text-white">
            Xác nhận quy định độ tuổi
          </h3>
          <p className="text-xs sm:text-sm text-[#A8A8B3] leading-relaxed">
            Phim này chỉ dành cho khán giả từ đủ{' '}
            <strong className="text-[#E50914]">{ageLimit} tuổi trở lên</strong>. Ban Quản Lý Rạp sẽ kiểm tra giấy tờ tùy thân (CCCD) và từ chối vào phòng chiếu nếu không đủ tuổi quy định.
          </p>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl bg-[#1C1C24] hover:bg-[#252530] text-white text-xs sm:text-sm font-semibold transition-colors border border-white/[0.08]"
          >
            Quay lại
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 rounded-xl bg-[#E50914] hover:bg-[#FF2D3A] active:bg-[#B20710] text-white text-xs sm:text-sm font-bold transition-all shadow-md shadow-[#E50914]/30"
          >
            Tôi đồng ý & Tiếp tục
          </button>
        </div>
      </div>
    </div>
  )
}

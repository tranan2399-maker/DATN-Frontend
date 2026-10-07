import { FoodItemState, FoodType } from '@/Interface/food'
import { Plus, Minus, Popcorn, Sparkles } from 'lucide-react'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { useDispatch, useSelector } from 'react-redux'
import { foodsAction } from '@/store/food'
import { ChangeEventHandler, useState } from 'react'
import { formatVND } from '@/utils'
import { toast } from 'react-toastify'
import { useLocalStorage } from '@uidotdev/usehooks'
import { TicketType } from '@/store/ticket'

function FoodItem({ food }: FoodType) {
  const dispatch = useDispatch()
  const foodStore = useSelector((state: any) => state.foods.foods)
  const [ticket] = useLocalStorage<TicketType>('ticket')
  const [imgError, setImgError] = useState(false)

  const ticketAmount = ticket?.ticketAmount || ticket?.seat?.filter((s) => s.selected)?.length || 1
  const maxAllowed = ticketAmount * 3

  const currentTotalQuantity = (foodStore || [])
    .filter((item: { quantity: number }) => item.quantity > 0)
    .reduce((acc: number, item: { quantity: number }) => acc + item.quantity, 0)

  const isCombo = food.name.toLowerCase().includes('combo') || food.name.toLowerCase().includes('couple')

  const handleChangeQuantity: ChangeEventHandler<HTMLInputElement> = (e): void => {
    const val = parseInt(e.target.value) || 0
    if (val < 0) return

    const diff = val - (food.quantity || 0)
    if (currentTotalQuantity + diff > maxAllowed) {
      toast.error(`Mỗi vé chỉ đặt tối đa 3 món (Tối đa ${maxAllowed} món)`)
      return
    }

    const newFood = {
      ...food,
      quantity: val
    }
    dispatch(foodsAction.onChangeFood(newFood))
  }

  const handleIncrementFood = () => {
    if (currentTotalQuantity >= maxAllowed) {
      toast.error(`Mỗi vé chỉ đặt tối đa 3 món (Tối đa ${maxAllowed} món)`)
      return
    }

    const newFood = {
      name: food.name,
      price: food.price,
      image: food.image,
      _id: food._id,
      quantity: 1
    }

    dispatch(foodsAction.incrementFood(newFood))
  }

  const handleDecrementFood = () => {
    if (!food.quantity || food.quantity <= 0) return

    const newFood = {
      name: food.name,
      price: food.price,
      image: food.image,
      _id: food._id,
      quantity: 1
    }

    dispatch(foodsAction.decrementFood(newFood))
  }

  const isMaxReached = currentTotalQuantity >= maxAllowed

  return (
    <div className="bg-[#18181E] border border-white/[0.08] hover:border-white/20 rounded-2xl overflow-hidden p-4 flex flex-col justify-between transition-all duration-200 group">
      <div>
        {/* Image & Badge Container */}
        <div className="relative w-full h-40 rounded-xl overflow-hidden bg-[#131317] flex items-center justify-center border border-white/5">
          {!imgError && food.image ? (
            <LazyLoadImage
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              src={food.image}
              alt={food.name}
              effect="opacity"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col items-center justify-center text-[#71717A] gap-2">
              <Popcorn className="w-10 h-10 text-[#71717A]" />
              <span className="text-[11px]">Dream Cinema</span>
            </div>
          )}

          {/* Combo Badge */}
          {isCombo && (
            <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md bg-[#E50914] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Sparkles className="w-3 h-3" />
              <span>Tiết kiệm</span>
            </div>
          )}

          {food.quantity > 0 && (
            <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-md bg-white text-black text-xs font-bold shadow-md">
              x{food.quantity}
            </div>
          )}
        </div>

        {/* Item Info */}
        <div className="mt-3.5 space-y-1">
          <h4 className="text-sm font-bold text-white group-hover:text-[#ffd484] transition-colors truncate font-headline" title={food.name}>
            {food.name}
          </h4>
          <div className="flex items-baseline justify-between">
            <span className="text-sm font-bold text-[#ffd484]">
              {formatVND(food.price)}
            </span>
            {food.quantity > 0 && (
              <span className="text-xs text-[#A8A8B3]">
                = {formatVND(food.price * food.quantity)}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stepper Controls */}
      <div className="mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-[#71717A]">Số lượng:</span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleDecrementFood}
            disabled={!food.quantity || food.quantity <= 0}
            className="w-8 h-8 rounded-lg bg-[#24242C] border border-white/10 hover:border-white/30 text-white flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#2C2C36]"
            aria-label="Giảm số lượng"
          >
            <Minus className="w-3.5 h-3.5" />
          </button>

          <input
            type="number"
            min={0}
            max={maxAllowed}
            value={food.quantity || 0}
            onChange={handleChangeQuantity}
            className="w-10 h-8 text-center bg-[#131317] border border-white/10 rounded-lg text-xs font-bold text-white focus:outline-none focus:border-[#E50914]"
            aria-label="Số lượng món"
          />

          <button
            type="button"
            onClick={handleIncrementFood}
            disabled={isMaxReached}
            className="w-8 h-8 rounded-lg bg-[#E50914] text-white hover:bg-[#ff1e27] flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-[0_0_8px_rgba(229,9,20,0.4)]"
            aria-label="Tăng số lượng"
          >
            <Plus className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default FoodItem

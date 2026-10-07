import useAllFood from '@/hooks/useAllFood'
import FoodItem from './FoodItem'
import HashLoader from 'react-spinners/HashLoader'
import { FoodItemState } from '@/Interface/food'
import { useDispatch, useSelector } from 'react-redux'
import { FoodSelector, foodsAction } from '@/store/food'
import { useEffect, useState } from 'react'
import { useLocalStorage } from '@uidotdev/usehooks'
import { TicketType } from '@/store/ticket'
import { useNavigate } from 'react-router-dom'
import { ConcessionTabs } from './ConcessionTabs'
import { Popcorn, ArrowRight, Info } from 'lucide-react'

function FoodCollection() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { data, isLoading } = useAllFood()
  const foods = useSelector((state: FoodSelector) => state.foods.foods)
  const [ticket, setTicket] = useLocalStorage<TicketType>('ticket')
  const [activeTab, setActiveTab] = useState('all')

  useEffect(() => {
    if (!data || data.length === 0) return
    const newData = data.map((f: FoodItemState) => {
      return {
        _id: f._id,
        name: f.name,
        price: f.price,
        image: f.image,
        quantity: 0
      }
    })

    if (ticket?.foods && ticket.foods.length > 0) {
      const combiData = [...ticket.foods]
      dispatch(foodsAction.fetchData(combiData))
      return
    }

    dispatch(foodsAction.fetchData(newData))
  }, [data, dispatch])

  // Skip food handler (Decision B.5: preserve seats, set food to 0, navigate to payment)
  const handleSkipFood = () => {
    if (ticket) {
      // Clear food selection in ticket
      setTicket({
        ...ticket,
        totalFood: 0,
        total: ticket.priceSeat || ticket.total,
        foods: []
      })
    }
    navigate('/purchase/payment')
  }

  const ticketAmount = ticket?.ticketAmount || ticket?.seat?.filter((s) => s.selected)?.length || 1
  const maxAllowedFood = ticketAmount * 3
  const currentTotalQuantity = (foods || [])
    .filter((item: FoodItemState) => item.quantity > 0)
    .reduce((acc: number, item: FoodItemState) => acc + item.quantity, 0)

  // Filter items based on activeTab
  const filteredFoods = (foods || []).filter((food: FoodItemState) => {
    if (activeTab === 'all') return true
    const isCombo = food.name.toLowerCase().includes('combo') || food.name.toLowerCase().includes('couple')
    if (activeTab === 'combo') return isCombo
    if (activeTab === 'single') return !isCombo
    return true
  })

  if (isLoading) {
    return (
      <div className="w-full bg-[#131317] border border-white/[0.08] rounded-2xl p-12 flex flex-col items-center justify-center gap-3">
        <HashLoader size={50} color="#E50914" />
        <p className="text-xs text-[#A8A8B3] animate-pulse">Đang tải danh sách bắp nước...</p>
      </div>
    )
  }

  return (
    <div className="w-full bg-[#131317] border border-white/[0.08] rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl space-y-6">
      {/* Header with Title and Skip button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/[0.06]">
        <div>
          <div className="flex items-center gap-2">
            <Popcorn className="w-5 h-5 text-[#E50914]" />
            <h2 className="text-xl sm:text-2xl font-bold font-headline text-white tracking-wide">
              Combo & Bắp Nước
            </h2>
          </div>
          <p className="text-xs text-[#A8A8B3] mt-1">
            Chọn món bắp nước để trải nghiệm xem phim thêm trọn vẹn
          </p>
        </div>

        {/* Skip button */}
        <button
          type="button"
          onClick={handleSkipFood}
          className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#1E1E24] hover:bg-[#2A2A34] border border-white/10 hover:border-white/20 text-xs font-semibold text-[#A8A8B3] hover:text-white transition-all self-start sm:self-auto"
        >
          <span>Bỏ qua bắp nước</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Info notice badge & Tab filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        <ConcessionTabs activeTab={activeTab} onSelectTab={setActiveTab} />

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#18181E] border border-white/[0.06] text-xs text-[#A8A8B3]">
          <Info className="w-3.5 h-3.5 text-[#ffd484] shrink-0" />
          <span>
            Đã chọn: <strong className="text-white">{currentTotalQuantity}</strong>/{maxAllowedFood} món (Tối đa 3 món/vé)
          </span>
        </div>
      </div>

      {/* Food Grid */}
      {filteredFoods && filteredFoods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredFoods.map((food: FoodItemState) => (
            <FoodItem key={food._id} food={food} />
          ))}
        </div>
      ) : (
        <div className="py-12 text-center text-xs text-[#71717A]">
          Không có sản phẩm nào trong danh mục này.
        </div>
      )}
    </div>
  )
}

export default FoodCollection

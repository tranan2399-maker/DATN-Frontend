import { FoodItemState } from '@/Interface/food'
import { ReactNode } from 'react'
interface TicketListType {
  icon: ReactNode
  title: string
  valueState: FoodItemState[]
  valueStorage: FoodItemState[]
}

const mapDataFood = (data: FoodItemState[]) => {
  return data
    .filter((food) => food.quantity > 0)
    .map((food: { _id: string; name: string; quantity: number }) => (
      <li className="flex justify-end" key={food._id}>
        {food.name} ({food.quantity})
      </li>
    ))
}
function TicketList({ icon, title, valueState, valueStorage }: TicketListType) {
  return (
    <li className="ticket-info-item">
      <div className="ticket-info-category">
        {icon}
        <p>{title}</p>
      </div>

      <div className="ticket-info-val">
        <ul>
          {valueState && valueState.length != 0
            ? mapDataFood(valueState)
            : valueStorage && valueStorage.length != 0
              ? mapDataFood(valueStorage)
              : '--'}
        </ul>
      </div>
    </li>
  )
}

export default TicketList

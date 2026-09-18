import { Label } from '@/components/ui/label'
import { RadioGroupItem } from '@/components/ui/radio-group'
import { getCurrentDay } from '@/utils'
import { useDispatch, useSelector } from 'react-redux'
import { PaymentSelected, TicketState, ticketAction } from '@/store/ticket'


export interface PaymentItemType {
  method: {
    _id: number
    image: string
    cardNumber: number
    value: string
    name: string
  }
  // eslint-disable-next-line no-unused-vars
  setCardSelected: (id: number) => void
  cardSelected: number
}

function PaymentItem({
  method
}: PaymentItemType) {
  const dispatch = useDispatch()
  const { paymentMethod: cardSelected } = useSelector(
    (state: { ticket: TicketState }) => state.ticket.ticket
  )
  const selectedCss = (classCss: string) => {
    return cardSelected?._id == method._id ? classCss : ''
  }
  const choosePaymentMethod = (data: PaymentSelected) => {
    dispatch(ticketAction.choosePayment(data))
  }
  return (
    <div
      className="flex items-center xl:basis-1/3 lg:basis-1/2"
      // onClick={() => setCardSelected(method._id)}
      onClick={() =>
        choosePaymentMethod({ _id: method._id, name: method.name })
      }
    >
      <Label
        htmlFor={method.value}
        className={` overflow-hidden w-full flex flex-col bg-background-secondary rounded-lg py-6 px-5  border-2  border-border-calendarBorder ${selectedCss('border-2 border-primary-movieColor')} `}
      >
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3">
            <div className="bg-white px-3 py-2 overflow-hidden rounded-lg">
              <img src={method.image} alt="" className="object-cover w-16" />
            </div>
            <span
              className={`text-2xl ${selectedCss('text-primary-movieColor')}`}
            >
              ****{method.cardNumber}
            </span>
          </div>
          <RadioGroupItem
            value={method.value}
            id={method.value}
            className="h-8 w-8 text-primary-movieColor border-primary-movieColor"
          />
        </div>
        <div
          className={`text-2xl ms-[56px] mt-2 text-primary-infoMovie  ${selectedCss('text-primary-movieColor')}`}
        >
          {getCurrentDay()}
        </div>
      </Label>
    </div>
  )
}

export default PaymentItem

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import StarRating from '@/components/StarRating'
import { Dispatch, SetStateAction } from 'react'
import { QueryMovie } from '@/api/movie'
const starsRating = [
  { value: '5', stars: [1, 2, 3, 4, 5] },
  { value: '4', stars: [1, 2, 3, 4] },
  { value: '3', stars: [1, 2, 3] },
  { value: '2', stars: [1, 2] },
  { value: '1', stars: [1] }
]
interface FilterRateType {
  query: { rate: string }
  setQuery: Dispatch<SetStateAction<QueryMovie>>
  className: string
  handleCloseSheet?: () => void
}
function FilterRate({
  setQuery,
  query,
  className,
  handleCloseSheet
}: FilterRateType) {
  const handleSelectRate = (rate: string) => {
    setQuery((prev: QueryMovie): QueryMovie => {
      const old = { ...prev }
      return {
        ...old,
        rate
      }
    })
    handleCloseSheet && handleCloseSheet()
  }
  return (
    <Select onValueChange={handleSelectRate} value={query.rate}>
      <SelectTrigger
        className={`w-[165px] bg-transparent rounded-full text-xl font-semibold flex px-10 border-2 border-primary-movieColor ${className}`}
      >
        <SelectValue placeholder="Select rating" />
      </SelectTrigger>
      <SelectContent className=" bg-background-main  p-2 border-primary-movieColor">
        <SelectGroup>
          <SelectItem
            value="0"
            className="bg-background-secondary my-2 flex justify-center text-2xl text-primary-movieColor py-3 rounded-md focus:bg-accent focus:text-accent-foreground"
          >
            Theo đánh giá
          </SelectItem>
          {starsRating.map((rating, index) => {
            return (
              <SelectItem
                key={index}
                value={rating.value}
                className={`bg-background-secondary flex justify-center my-2 px-2  text-2xl text-primary-movieColor py-3 focus:bg-accent focus:text-accent-foreground rounded-md ${query.rate == rating.value ? 'bg-accent text-accent-foreground' : ''}  `}
              >
                <StarRating stars={rating.stars} className="w-7 h-7" />
              </SelectItem>
            )
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default FilterRate

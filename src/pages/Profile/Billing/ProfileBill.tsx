import { CalendarDateRangePicker } from '@/components/react-day-picker'
// import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChangeEventHandler, useEffect, useState } from 'react'

import { DateRange } from 'react-day-picker'
import { addDays } from 'date-fns'
import { useDebounce } from '@uidotdev/usehooks'
import ProfileBillList from './ProfileBillList'
function ProfileBill() {
  const [searchTerm, setSearchTerm] = useState('')
  const [results, setResults] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2024, 1, 20),
    to: addDays(new Date(2024, 3, 20), 30)
  })

  const debouncedSearchTerm = useDebounce(searchTerm, 1000)
  useEffect(() => {
    const searchHN = async () => {
      setIsSearching(true)
      setResults(searchTerm)
      setIsSearching(false)
    }

    searchHN()
  }, [debouncedSearchTerm])

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
    const target = e.target as HTMLInputElement
    setSearchTerm(target.value)
    setIsSearching(true)
  }

  return (
    <>
      <div className="flex gap-4">
        <Input
          placeholder="Enter your bill"
          className="basis-96 text-2xl py-8 border-primary-movieColor"
          onChange={handleChange}
          value={searchTerm}
        />
        <CalendarDateRangePicker date={date} setDate={setDate} className="" />
        {/* <Button className="bg-primary-movieColor text-2xl px-10">Search</Button> */}
      </div>
      <ProfileBillList date={date} results={results} isSearching={isSearching} />
    </>
  )
}

export default ProfileBill

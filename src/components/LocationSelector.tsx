/* eslint-disable no-unused-vars */
import { getAllCinema } from '@/api/cinema'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { useQuery } from '@tanstack/react-query'
import { useState } from 'react'
import HashLoader from 'react-spinners/HashLoader'
interface CinemaType {
  _id: string
  CinemaName: string
  CinemaAdress: string
}

export const LocationSelector = ({
  handleCurrentLocation
}: {
  handleCurrentLocation: (location: string) => void
}) => {
  const [locationTheater, setLocationTheater] = useState<string>(
    '65d30a80a047aeebd3c78c72'
  )
  const { data: dataCinema, isLoading } = useQuery({
    queryKey: ['CINEMA'],
    queryFn: () => getAllCinema()
  })
  if (isLoading) {
    return <HashLoader color="#eb3656" />
  }
  const defaultLocation = dataCinema.find((cinema: CinemaType) => {
    return cinema._id === locationTheater
  })
  const handleOnSelect = (value: string) => {
    setLocationTheater(value)
    handleCurrentLocation(value)
  }

  return (
    <div className="location-select-container ">
      <Select onValueChange={(value: string) => handleOnSelect(value)}>
        <SelectTrigger className="w-52 dark:bg-[#313441] bg-[#ccced8] outline-none py-8 dark:text-[#e6e6e8] text-[black] border-none px-5 text-[1.7rem] rounded-xl">
          <SelectValue placeholder={defaultLocation.CinemaName ?? ''} />
        </SelectTrigger>
        <SelectContent>
          {dataCinema?.map((data: CinemaType) => {
            return (
              <SelectItem
                key={data._id}
                className="text-[1.6rem]"
                value={data._id}
              >
                {data.CinemaName}
              </SelectItem>
            )
          })}
        </SelectContent>
      </Select>

      <p className="selected-location text-primary-movieColor">
      Vị trí:{' '}
        <span className="text-primary-locationMovie">
          {defaultLocation.CinemaAdress ?? ''}
        </span>
      </p>
      <p className="selected-theatre text-primary-movieColor">
      Rạp phim :{' '}
        <span className="text-primary-locationMovie">
          {defaultLocation.CinemaName ?? ''}
        </span>
      </p>
    </div>
  )
}

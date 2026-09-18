import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { QueryMovie } from '@/api/movie'
import { Dispatch, SetStateAction, useState } from 'react'
import { useSelector } from 'react-redux'
interface FilterCountryType {
  status: string
  query: { country: string }
  setQuery: Dispatch<SetStateAction<QueryMovie>>
  className: string
  handleCloseSheet?: ()=>void
}
function FilterCountry({
  query,
  setQuery,
  status,
  className,
  handleCloseSheet
}: FilterCountryType) {
  const movieAll = useSelector(
    (state: { movies: { movies: { status: string; country: string }[] } }) =>
      state.movies.movies
  )
  const [open, setOpen] = useState(false)

  const countryFilter =
    movieAll && movieAll.length > 0
      ? [
          ...new Set(
            movieAll
              ?.filter((movie: { status: string }) => movie.status == status)
              .map((movie: { country: string }) => {
                return movie.country
              })
          )
        ]
      : []
  const handleSelectCountry = (country: string) => {
    setQuery((prev: QueryMovie): QueryMovie => {
      const old = { ...prev }
      return {
        ...old,
        country
      }
    })
    handleCloseSheet && handleCloseSheet()
  }
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-[150px] px-10 justify-between bg-transparent border-2 rounded-full font-semibold ${className}`}
        >
          {query.country !== '0'
            ? countryFilter?.find(
                (country: string) => country === query.country
              )
            : 'Tìm theo quốc gia...'}
          <ChevronsUpDown size={16} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className={`w-[150px] p-0 border-primary-movieColor ${className}`}>
        <Command className="bg-background-main ">
          <CommandInput
            placeholder="Tìm theo quốc gia..."
            className="h-16 text-2xl text-primary-movieColor"
          />
          <CommandList className="bg-background-main">
            <CommandEmpty className="text-primary-movieColor text-2xl flex items-center justify-center p-6">
              Không tìm thấy phim phù hợp
            </CommandEmpty>
            <CommandGroup>
              <CommandItem
                value="0"
                onSelect={(currentValue) => {
                  handleSelectCountry(currentValue)
                  setOpen(false)
                }}
                className={`text-primary-movieColor text-2xl py-3 ps-5 my-2 mx-2 rounded-md bg-background-secondary flex justify-between hover:bg-primary-locationMovie ${query.country === '0' ? 'bg-accent text-accent-foreground' : ''}`}
              >
                Mọi quốc gia
                <Check
                  className={cn(
                    'mr-2 h-6 w-6',
                    query.country === '0' ? 'opacity-100' : 'opacity-0'
                  )}
                />
              </CommandItem>
              {countryFilter.map((country: string, index: number) => (
                <CommandItem
                  className={`text-primary-movieColor text-2xl py-3 ps-5 my-2 mx-2 rounded-md bg-background-secondary flex justify-between hover:bg-primary-locationMovie ${query.country === country ? 'bg-accent text-accent-foreground' : ''}`}
                  key={index}
                  value={country}
                  onSelect={(currentValue) => {
                    handleSelectCountry(currentValue)
                    setOpen(false)
                  }}
                >
                  {country}
                  <Check
                    className={cn(
                      'mr-2 h-6 w-6',
                      query.country === country ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default FilterCountry

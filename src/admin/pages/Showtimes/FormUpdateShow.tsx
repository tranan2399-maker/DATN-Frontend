import { updateShowtimes } from '@/api/showtime'
import { ContextMain } from '@/context/Context'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery,
  useQueryClient
} from '@tanstack/react-query'
import React, { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Flatpickr from 'react-flatpickr'
import { format } from 'date-fns'
import { ChevronsUpDown } from 'lucide-react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import './showtime.css'

import { Button } from '@/components/ui/button'
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
import { getAllMovie } from '@/api/movie'
import { Movie } from '@/admin/types/movie'
import TimePicker from 'react-time-picker'
import {
  checkDateAdded,
  compareTime,
  getDay,
  getHourAndMinute,
  getTimeToShowTime
} from '@/utils'
import Joi from 'joi'
import { joiResolver } from '@hookform/resolvers/joi'
import Loading from '@/admin/components/Loading/Loading'

const showTimeFormSchema = Joi.object({
  movieId: Joi.string().min(2).label('Phim').messages({
    'string.empty': 'Bắt buộc chọn phim'
  }),
  screenRoomId: Joi.string().label('Phòng chiếu').messages({
    'string.empty': 'Bắt buộc chọn phòng chiếu'
  }),
  date: Joi.date().min('now').label('Ngày chiếu').required().messages({
    'date.empty': 'Bắt buộc chọn ngày chiếu',
    'date.min': 'Thời gian {{ #label }} phải lớn hơn hoặc bằng hiện tại'
  }),
  timeFrom: Joi.string().label('Giờ chiếu').required().min(1).messages({
    'string.empty': 'Bắt buộc chọn giờ chiếu',
    'string.base': '{{#label}} bắt buộc là chuỗi'
  }),
  timeTo: Joi.string().allow('')
})
interface FormUpdateShowType {
  timeFrom: string
  timeTo: string
  movieId: { name: string; _id: string; duration: number }
  screenRoomId: { name: string; _id: string }
  date: Date
}
interface ShowType {
  timeFrom: string
  timeTo: string
  date: string
  movieId: string
  screenRoomId: string
}
function FormUpdateShow({ show }: { show: FormUpdateShowType }) {
  const { id = '' } = useParams<{ id: string }>()
  const naviagte = useNavigate()
  const { screenRoom } = useContext<any>(ContextMain)
  const [open] = React.useState(false)

  const queryClient = useQueryClient()
  const { data } = useQuery<Movie[]>({
    queryKey: ['MOVIE'],
    queryFn: getAllMovie
  })
  const { mutate: updateShow, isPending } = useMutation({
    mutationFn: async (data: ShowType) => updateShowtimes(data, id as string),
    onSuccess: () => {
      queryClient.invalidateQueries(['SHOWTIMES'] as InvalidateQueryFilters)

      toast.success('Cập nhật lịch chiếu thành công!')
      naviagte('/admin/showtimes')
    },
    onError: (err: { response: { data: { message: string } } }) => {
      toast.error(`Cập nhật lịch chiếu thất bại! ${err.response.data.message}`)
    }
  })

  const form = useForm({
    resolver: joiResolver(showTimeFormSchema),
    defaultValues: {
      date: show?.date,
      timeFrom: getHourAndMinute(show?.timeFrom),
      timeTo: show?.timeTo,
      movieId: show?.movieId?._id,
      screenRoomId: show?.screenRoomId?._id
    }
  })
  const onSubmit: SubmitHandler<{
    timeFrom: string
    timeTo: string
    movieId: string
    screenRoomId: string
    date: Date
  }> = (data) => {
    const formattedDate = format(data.date!, 'dd-MM-yyyy HH:mm')
    const timeFrom = getDay(formattedDate) + ' ' + data.timeFrom
    if (compareTime(getHourAndMinute(formattedDate), data.timeFrom) == 1) {
      toast.error('Giờ chiếu phải lớn hơn 30 phút hiện tại', {
        position: 'top-right'
      })
      return
    }
    if (checkDateAdded(data.date)) {
      toast.error('Chỉ có thể sửa lịch chiếu trong 2 tháng', {
        position: 'top-right'
      })
      return
    }
    const timeTo =
      getDay(formattedDate) +
      ' ' +
      getTimeToShowTime(data.timeFrom, show?.movieId.duration || 0)

    updateShow({
      ...data,
      timeFrom,
      timeTo,
      date: formattedDate
    })
  }
  if (isPending) return <Loading />

  // Function to log changes
  return (
    <div className=" mx-auto mt-10">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="">
          <div className="w-full border  border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2 gap-y-5">
            <div className=" flex w-full gap-x-5">
              <FormField
                control={form.control}
                name="movieId"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Chọn phim</FormLabel>
                      <FormControl>
                        <Popover open={false}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              onClick={() => {
                                toast.error(
                                  'Không thể chọn phim. Vui lòng tạo lịch chiếu mới'
                                )
                              }}
                              className="justify-between border border-grey-lighter rounded hover:text-white text-sm h-12  min-w-70 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                            >
                              {field.value
                                ? data?.find((movie: { _id: string }) => {
                                    return movie._id === field?.value
                                  })?.name
                                : 'Chọn Phim'}

                              <ChevronsUpDown
                                size={16}
                                className="ml-2 h-4 w-4 shrink-0 opacity-50"
                              />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="p-0">
                            <Command className="dark:bg-boxdark">
                              <CommandInput
                                placeholder="Tìm kiếm phòng chiếu..."
                                className="caret-black dark:caret-white"
                              />
                              <CommandList className=" justify-between">
                                {data?.length === 0 ? (
                                  <CommandEmpty>
                                    Không tìm thấy phim.
                                  </CommandEmpty>
                                ) : (
                                  <CommandGroup>
                                    {data?.map(
                                      (item: { name: string; _id: string }) => (
                                        <CommandItem
                                          className="w-[250px] justify-between text-sm"
                                          key={item._id}
                                          role=" option"
                                          value={item.name}
                                          onSelect={() => {
                                            field.onChange(item._id)
                                          }}
                                        >
                                          <div className="  w-full">
                                            <span className="text-sm lowercase">
                                              {item.name}
                                            </span>
                                          </div>
                                        </CommandItem>
                                      )
                                    )}
                                  </CommandGroup>
                                )}
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={form.control}
                name="screenRoomId"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Chọn phòng</FormLabel>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="justify-between border border-grey-lighter rounded hover:text-white text-sm h-12 w-[250px]  border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                          >
                            {field.value
                              ? screenRoom?.find(
                                  (screen: { _id: string }) =>
                                    screen._id === field.value
                                )?.name
                              : 'Chọn Phòng Chiếu'}

                            <ChevronsUpDown
                              size={16}
                              className="ml-2 h-4 w-4 shrink-0 opacity-50"
                            />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                          <Command className="w-full justify-between dark:bg-boxdark">
                            <CommandInput
                              placeholder="Tìm kiếm phòng chiếu..."
                              className=""
                            />
                            <CommandList className="w-[250px] justify-between">
                              {screenRoom?.length === 0 ? (
                                <CommandEmpty>No country found.</CommandEmpty>
                              ) : (
                                <CommandGroup>
                                  {screenRoom?.map(
                                    (item: { name: string; _id: string }) => (
                                      <CommandItem
                                        className="w-[250px] justify-between text-sm"
                                        key={item._id}
                                        role="option"
                                        value={item.name}
                                        onSelect={() => {
                                          field.onChange(item._id)

                                          // Cập nhật giá trị của screen
                                        }}
                                      >
                                        {item.name}
                                        {/* Thêm hình ảnh nếu cần */}
                                      </CommandItem>
                                    )
                                  )}
                                </CommandGroup>
                              )}
                            </CommandList>
                          </Command>
                        </PopoverContent>
                      </Popover>
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-x-5 ">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-1/2">
                    <FormLabel>Ngày khởi chiếu</FormLabel>
                    <FormControl>
                      <Flatpickr
                        name="date"
                        value={field?.value || ''}
                        options={{
                          dateFormat: 'd-m-Y',
                          enableTime: true,
                          onChange: (selectedDates) => {
                            if (
                              selectedDates[0].getMonth() ==
                                new Date().getMonth() &&
                              selectedDates[0].getDate() == new Date().getDate()
                            ) {
                              const now = new Date()
                              now.setMinutes(now.getMinutes() + 30)
                              field.onChange(now)
                              return
                            }

                            field.onChange(selectedDates[0])
                          }
                        }}
                        className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                        id="grid-first-name"
                        type="text"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeFrom"
                render={({ field }) => {
                  return (
                    <FormItem className="flex flex-col">
                      <FormLabel>Giờ khởi chiếu</FormLabel>
                      <FormControl>
                        <TimePicker
                          // disabled={date == ''}
                          className="w-54 rounded-lg border-[1.5px] border-stroke bg-transparent  text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                          aria-label={true}
                          onChange={field.onChange}
                          value={field?.value}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )
                }}
              />
            </div>
            <Button
              className="middle none center w-full rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}

export default FormUpdateShow

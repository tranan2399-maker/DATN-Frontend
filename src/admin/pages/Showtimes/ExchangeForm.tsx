import { exchangeShowtimes } from '@/api/showtime'
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient
} from '@tanstack/react-query'
import React from 'react'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import { ArrowLeftRight, Loader } from 'lucide-react'

import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import './showtime.css'

import { Button } from '@/components/ui/button'

import { getHourAndMinute, selectCalendar } from '@/utils'
import { Label } from '@/components/ui/label'
import { DialogFooter } from '@/components/ui/dialog'

function ExchangeForm({ shows, setChooseShow }: any) {
  const [open] = React.useState(false)

  const queryClient = useQueryClient()

  const { mutate: updateShow, isPending } = useMutation({
    mutationFn: async (data: any) => exchangeShowtimes(data, shows[0]._id),
    onSuccess: () => {
      queryClient.invalidateQueries(['SHOWTIMES'] as InvalidateQueryFilters)
      toast.success('Cập nhật lịch chiếu thành công!')
      setChooseShow([])
    },
    onError: (err: { response: { data: { message: string } } }) => {
      toast.error(`Cập nhật lịch chiếu thất bại! ${err.response.data.message}`)
      setChooseShow([])
    }
  })
  const handleExchangeShow = () => {
    updateShow({
      _id: shows[1]._id,
      screenRoomId: shows[1].screenRoomId._id,
      movieId: shows[1].movieId._id
    })
  }

  return (
    <div className="flex flex-col">
      <div className=" mx-auto mt-1 flex justify-between items-center gap-1">
        <form className="">
          <div className="w-full border  border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark shadow-md rounded px-4 pt-3 pb-3 mb-4 flex flex-col my-2 gap-y-5">
            <div className=" flex w-full gap-x-5">
              <div className="flex flex-col gap-y-2">
                <Label>Phim</Label>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between border border-grey-lighter rounded hover:text-white text-sm h-12  min-w-50 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                >
                  {shows.length > 0 ? shows[0].movieId.name : ''}
                </Button>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Phòng chiếu</Label>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between border border-grey-lighter rounded hover:text-white text-sm h-12   border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                >
                  {shows.length > 0 ? shows[0].screenRoomId.name : ''}
                </Button>
              </div>
            </div>
            <div className="flex gap-x-5 ">
              <div className="flex flex-col gap-y-2">
                <Label>Ngày khởi chiếu</Label>
                <Button className="rounded-lg border-[1.5px] border-stroke bg-transparent h-full  text-black outline-none transition text-md focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary">
                  {shows.length > 0 ? format(shows[0].date, 'dd-MM-yyyy') : ''}
                </Button>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Giờ khởi chiếu</Label>
                <Button className="rounded-lg border-[1.5px] border-stroke bg-transparent h-full  text-black outline-none transition text-md focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary">
                  {shows.length > 0
                    ? getHourAndMinute(selectCalendar(shows[0]?.timeFrom))
                    : ''}
                </Button>
              </div>
            </div>
            {/* <Button
              className="middle none center w-full rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Submit
            </Button> */}
          </div>
        </form>
        <div>
          <ArrowLeftRight className="text-success" />
        </div>
        <form className="">
          <div className="w-full border  border-gray-200 dark:border-strokedark bg-white dark:bg-boxdark shadow-md rounded px-4 pt-3 pb-3 mb-4 flex flex-col my-2 gap-y-5">
            <div className=" flex w-full gap-x-5">
              <div className="flex flex-col gap-y-2">
                <Label>Phim</Label>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between border border-grey-lighter rounded hover:text-white text-sm h-12  min-w-50 border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                >
                  {shows.length > 0 ? shows[1].movieId.name : ''}
                </Button>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Phòng chiếu</Label>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="justify-between border border-grey-lighter rounded hover:text-white text-sm h-12   border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                >
                  {shows.length > 0 ? shows[1].screenRoomId.name : ''}
                </Button>
              </div>
            </div>
            <div className="flex gap-x-5 ">
              <div className="flex flex-col gap-y-2">
                <Label>Ngày khởi chiếu</Label>
                <Button className="rounded-lg border-[1.5px] border-stroke bg-transparent h-full  text-black outline-none transition text-md focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary">
                  {shows.length > 0 ? format(shows[1].date, 'dd-MM-yyyy') : ''}
                </Button>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label>Giờ khởi chiếu</Label>
                <Button className="rounded-lg border-[1.5px] border-stroke bg-transparent h-full  text-black outline-none transition text-md focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary">
                  {shows.length > 0
                    ? getHourAndMinute(selectCalendar(shows[1]?.timeFrom))
                    : ''}
                </Button>
              </div>
            </div>
            {/* <Button
              className="middle none center w-full rounded-lg bg-pink-500 py-3 px-6 font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
            >
              Submit
            </Button> */}
          </div>
        </form>
      </div>
      <DialogFooter>
        <Button
          onClick={() => setChooseShow([])}
          type="button"
          className="border-[white] border text-white text-md"
        >
          Hủy
        </Button>
        {isPending ? (
          <Button type="submit" className="bg-white text-black text-md">
            <Loader className="animate-spin" />
          </Button>
        ) : (
          <Button
            onClick={handleExchangeShow}
            type="submit"
            className="bg-white text-black text-md"
          >
            Đổi
          </Button>
        )}
      </DialogFooter>
    </div>
  )
}

export default ExchangeForm

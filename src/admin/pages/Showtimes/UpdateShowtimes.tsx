import DefaultLayout from '@/admin/layout/DefaultLayout'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useParams } from 'react-router-dom'

import 'react-time-picker/dist/TimePicker.css'
import 'react-clock/dist/Clock.css'
import './showtime.css'

import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import { useShowtime } from '@/hooks/useShowtime'
import FormUpdateShow from './FormUpdateShow'
import Loading from '@/admin/components/Loading/Loading'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

const UpdateShowtimes = () => {
  const { id = '' } = useParams<{ id: string }>()

  const { data: dataDetailShow, isFetching } = useShowtime(id)
  // if (isFetching) return <Loading />

  return (
    <>
      <DefaultLayout>
        <Breadcrumb
          pageName="Sửa lịch chiếu"
          pageLink="/admin/showtimes"
          pageRetun="Lịch chiếu / Sửa lịch chiếu"
        />
        <Dialog>
          <DialogTrigger asChild>
            <h2 className="flex items-center gap-2 hover:cursor-pointer">
              Lưu ý <Info size={20} />
            </h2>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-[red]">Lưu ý</DialogTitle>
              {/* <DialogDescription>
                Những lưu ý khi thêm lịch chiếu
              </DialogDescription> */}
            </DialogHeader>
            <ul className="w-full ">
              <li className="list-disc text-sm my-1">
                Lịch chiếu được sửa phải lớn hơn 30 phút so với hiện tại
              </li>
              <li className="list-disc text-sm my-1">
                Nếu lịch chiếu đã có người đặt ghế thì không thể sửa
              </li>
              <li className="list-disc text-sm my-1">
                Khi sửa một lịch chiếu, lịch chiếu chỉ được sửa trong vòng 2
                tháng
              </li>
            </ul>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="secondary" className="text-sm">
                  Đóng
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        {!isFetching ? <FormUpdateShow show={dataDetailShow[0]} /> : <Loading />}
      </DefaultLayout>
    </>
  )
}

export default UpdateShowtimes

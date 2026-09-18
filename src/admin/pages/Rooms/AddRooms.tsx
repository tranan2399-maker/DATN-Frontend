import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import DefaultLayout from '@/admin/layout/DefaultLayout'
import FormRooms from './components/FormRoom'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Info } from 'lucide-react'
import { Button } from '@/components/ui/button'

const AddRooms = () => {
  return (
    <DefaultLayout>
      <Breadcrumb
        pageName="Thêm phòng chiếu"
        pageLink="/admin/screeningrooms"
        pageRetun="Thêm phòng chiếu"
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
          </DialogHeader>
          <ul className="w-full ">
            <li className="list-disc text-sm my-1">
              Hãy chọn số ghế một cách hợp lý cho một phòng chiếu
            </li>
            <li className="list-disc text-sm my-1">
              Số ghế của một lịch chiếu phụ thuộc vào số ghế một phòng chiếu
            </li>
            <li className="list-disc text-sm my-1">
              Khi thêm phòng chiếu, hãy chắc chắn thông tin đã được kiểm tra
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
      <div className="flex flex-col gap-10">
        <FormRooms typeForm="ADD" />
      </div>
    </DefaultLayout>
  )
}
export default AddRooms

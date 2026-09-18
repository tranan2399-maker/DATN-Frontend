import DefaultLayout from '@/admin/layout/DefaultLayout'
import Breadcrumb from '@/admin/components/Breadcrumbs/Breadcrumb'
import { Button } from '@/components/ui/button'
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
import ShowtimeApprovalItem from './ShowtimeApprovalItem'

const ShowtimeApproval = () => {
  // Tính toán số trang

  return (
    <>
      <DefaultLayout>
        <Breadcrumb
          pageName="Lịch chiếu cần phê duyệt"
          pageLink="/admin/showtimes/approval"
          pageRetun="Lịch chiếu phê duyệt"
        />
        <Dialog>
          <DialogTrigger asChild>
            <h2 className="flex items-center gap-2 hover:cursor-pointer mb-5">
              Lưu ý <Info size={20} />
            </h2>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle className="text-[red]">Lưu ý</DialogTitle>
            </DialogHeader>
            <ul className="w-full ">
              <li className="list-disc text-sm my-1">
              Lịch chiếu sẽ được quản trị viên kiểm tra và xác nhận.
              </li>
              <li className="list-disc text-sm my-1">
              Sau khi được phê duyệt, lịch chiếu sẽ được công bố và khách hàng có thể tiến hành đặt lịch
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
        <ShowtimeApprovalItem />
        {/* modal */}
      </DefaultLayout>
    </>
  )
}

export default ShowtimeApproval

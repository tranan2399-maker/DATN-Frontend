import Joi from 'joi'
import { PenLine } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger
} from '@/components/ui/dialog'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateClient } from '@/api/auth'
import { toast } from 'react-toastify'
import { ContextAuth, ContextMain } from '@/context/Context'
import { ChangeEventHandler, useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { Button } from '@/components/ui/button'
import BarLoader from 'react-spinners/BarLoader'
import { USERDETAIL } from '@/utils/constant'

const imageSchema = Joi.object({
  avatar: Joi.string().label('avatar').allow('')
})
function UploadImage() {
  const queryClient = useQueryClient()
  const { userDetail } = useContext<ContextAuth>(ContextMain)
  const [file, setFiles] = useState<File[]>([])

  const { mutate, isPending } = useMutation({
    mutationFn: async (user: FormData) => updateClient(user),
    onSuccess() {
      toast.success('Cập nhật hình ảnh thành công ')
      queryClient.invalidateQueries({
        queryKey: [USERDETAIL]
      })
      const dialog = document.querySelector('.close-dialog')
      if (dialog instanceof HTMLElement) {
        // Kiểm tra kiểu hoặc ép kiểu để TypeScript hiểu rằng phần tử có thể được click
        dialog.click()
      }
    },
    onError() {
      toast.error('Cập nhật không thành công, hãy thử lại')
    }
  })

  const form = useForm({
    resolver: joiResolver(imageSchema),
    defaultValues: {
      avatar: ''
    },
    mode: 'onChange'
  })

  const onSubmit = () => {
    const data = new FormData()

    if (!file || file.length == 0) {
      toast.error('Vui lòng chọn một hình ảnh!', {
        position: 'top-right'
      })
      return
    }
    data.set('avatar', file[0])
    mutate(data)
  }
  const handleChangeFile: ChangeEventHandler<HTMLInputElement> = (e): void => {
    const target = e.target as HTMLInputElement
    const filesTarget = target.files
    if (filesTarget) {
      const filesArray = Array.from(filesTarget)
      setFiles(filesArray)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="border-primary-movieColor text-primary-locationMovie border-2 text-2xl space-x-2 rounded-lg px-5">
          <PenLine size={12} />
          <span>Chỉnh sửa</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] xs:max-w-[320px] ">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8 "
            encType="multipart/form-data"
          >
            <FormField
              control={form.control}
              name="avatar"
              render={() => (
                <FormItem>
                  <FormLabel className="text-2xl">Tên</FormLabel>
                  <FormControl>
                    <div className="flex justify-around">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl my-2 mb-5  font-semibold text-primary-movieColor">
                          Tải ảnh
                        </span>
                        <Label
                          htmlFor="picture"
                          className="sm:w-80 sm:h-80 xs:w-52 xs:h-52 text-2xl bg-background-secondary flex justify-center items-center border-primary-movieColor border-dashed border"
                        >
                          Tải lên
                        </Label>
                        <Input
                          id="picture"
                          type="file"
                          onChange={handleChangeFile}
                          className="hidden"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-3xl my-2 mb-5 font-semibold text-primary-movieColor">
                          Ảnh hiện tại
                        </span>
                        <Avatar className="sm:w-80 sm:h-80 xs:w-52 xs:h-52">
                          <AvatarImage
                            src={userDetail.message.avatar}
                            alt="@shadcn"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </div>
                    </div>
                  </FormControl>

                  <FormMessage className="text-xl" />
                </FormItem>
              )}
            />

            <DialogFooter className="">
              <Button
                type="submit"
                className="bg-primary-movieColor text-2xl px-3 py-4 mt-3"
              >
                {isPending ? <BarLoader color="#e6e6e8" /> : 'Save changes'}
              </Button>
              <DialogClose asChild className="close-dialog">
                <Button
                  type="button"
                  className="text-2xl px-10 bg-background-secondary mt-3"
                >
                  Đóng
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}

export default UploadImage

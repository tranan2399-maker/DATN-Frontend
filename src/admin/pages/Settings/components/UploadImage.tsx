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
      toast.success('Chỉnh sửa ảnh thành công!')
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
      toast.error('Tải ảnh thất bại, hãy thử lại !')
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
      toast.error('Vui lòng chọn ảnh bạn muốn!', {
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
        <Button className="border-primary-movieColor text-primary-locationMovie border-2 text-md space-x-2 rounded-lg px-5">
          <PenLine size={12} />
          <span>Chỉnh sửa</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[530px] xs:max-w-[400px] ">
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
                  <FormLabel className="text-xl">
                    Chỉnh sửa ảnh đại diện
                  </FormLabel>
                  <FormControl>
                    <div className="flex justify-around">
                      <div className="flex flex-col items-center">
                        <span className="text-xl my-2 mb-5  font-semibold text-primary-movieColor">
                          Ảnh tải lên
                        </span>
                        <Label
                          htmlFor="picture"
                          className="sm:w-40 sm:h-40 xs:w-30 xs:h-30 text-xl bg-background-secondary flex justify-center items-center border-primary-movieColor border-dashed border"
                        >
                          Tải ảnh lên
                        </Label>
                        <Input
                          id="picture"
                          type="file"
                          onChange={handleChangeFile}
                          className="hidden"
                        />
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-xl my-2 mb-5 font-semibold text-primary-movieColor">
                          Ảnh hiện tại
                        </span>
                        <Avatar className="sm:w-40 sm:h-40 xs:w-30 xs:h-30">
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
                className="bg-primary-movieColor text-md px-2 py-2 mt-2"
              >
                {isPending ? <BarLoader color="#e6e6e8" /> : 'Save changes'}
              </Button>
              <DialogClose asChild className="close-dialog">
                <Button
                  type="button"
                  className="text-md px-6 bg-background-secondary mt-2"
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

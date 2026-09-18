import Joi from 'joi'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PenLine } from 'lucide-react'
import { toast } from 'react-toastify'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { UserUpdateType } from '@/pages/Profile/profile-form'
import { updateClient } from '@/api/auth'
import { ContextMain } from '@/context/Context'
import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { joiResolver } from '@hookform/resolvers/joi'
import { Input } from '@/components/ui/input'
const profileFormSchema = Joi.object({
  name: Joi.string().min(2).max(30).label('Username').messages({
    'string.empty': 'Tên người dùng bắt buộc',
    'string.min': '{{#label}} mphải có ít nhất 2 ký tự',
    'string.max': '{{#label}} chỉ có thể có tối đa 30 ký tự.'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .label('Email')
    .messages({
      'string.empty': 'Email bắt buộc',
      'string.email': '{{#label}} phải là một email hợp lệ'
    }),
  address: Joi.string().label('Address').required().min(4).messages({
    'string.empty': 'Địa chỉ bắt buộc',
    'string.min': '{{#label}} chỉ có thể có tối đa 4 ký tự.'
  }),
  mobile: Joi.number().label('Mobile')
})
function UserDialogConfirm() {
  const { userDetail } = useContext(ContextMain)
  const queryClient = useQueryClient()
  const userUpdate = useMutation({
    mutationFn: async (user: UserUpdateType) => updateClient(user),
    onSuccess() {
      toast.success('Cập nhật thành công ')
      queryClient.invalidateQueries({
        queryKey: ['USERDETAIL']
      })
    },
    onError() {
      toast.error('Cập nhật không thành công, hãy thử lại')
    }
  })
  const defaultValues = {
    name: userDetail.message.name,
    email: userDetail.message.email,
    address: userDetail.message?.address || '',
    mobile: userDetail.message?.mobile || 0
  }
  const form = useForm({
    resolver: joiResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange'
  })

  const onSubmit: SubmitHandler<{
    name: string
    email: string
    address: string
    mobile: string | number
  }> = (data) => {
    userUpdate.mutate({ ...data })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-movieColor px-7 py-3 mt-2 text-2xl">
          <PenLine size={16} className="mr-3" />
          Chỉnh sửa
        </Button>
      </DialogTrigger>
      <DialogContent className="xs:max-w-[415px]  md:max-w-[435px] lg:max-w-[455px] xl:max-w-[475px] p-10">
        <DialogHeader>
          <DialogTitle className="text-3xl text-primary-movieColor">
            Chỉnh sửa thông tin
          </DialogTitle>
          <DialogDescription className="text-2xl">
            Thay đổi thông tin của bạn ở đây. Ấn nút lưu khi bạn hoàn thành
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4 my-1">
                    <FormLabel className="text-right text-2xl text-primary-movieColor font-semibold">
                      Tên:
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="name"
                        {...field}
                        defaultValue="Pedro Duarte"
                        className="col-span-3 text-2xl py-8 px-6 focus-visible:border-primary-movieColor focus-visible:outline-none "
                      />
                    </FormControl>

                    <FormMessage className="text-xl" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4 my-1">
                    <FormLabel className="text-right text-2xl text-primary-movieColor font-semibold">
                      Email:
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        {...field}
                        defaultValue="admin@gmail.com"
                        className="col-span-3 text-2xl py-8 px-6 focus-visible:border-primary-movieColor focus-visible:outline-none "
                      />
                    </FormControl>

                    <FormMessage className="text-xl" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4 my-1">
                    <FormLabel className="text-right text-2xl text-primary-movieColor font-semibold">
                      Địa chỉ:
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        {...field}
                        defaultValue="admin@gmail.com"
                        className="col-span-3 text-2xl py-8 px-6 focus-visible:border-primary-movieColor focus-visible:outline-none "
                      />
                    </FormControl>

                    <FormMessage className="text-xl" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 items-center gap-4 my-1">
                    <FormLabel className="text-right text-2xl text-primary-movieColor font-semibold">
                      Điện thoại:
                    </FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        {...field}
                        defaultValue="admin@gmail.com"
                        className="col-span-3 text-2xl py-8 px-6 focus-visible:border-primary-movieColor focus-visible:outline-none "
                      />
                    </FormControl>

                    <FormMessage className="text-xl" />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="submit" variant={'normal'}>
                    Lưu
                  </Button>
                </DialogClose>
              </DialogFooter>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default UserDialogConfirm

// import { Link } from 'react-router-dom'
// import { zodResolver } from '@hookform/resolvers/zod'
import { joiResolver } from '@hookform/resolvers/joi'
import { useForm, SubmitHandler } from 'react-hook-form'
// import { z } from 'zod'x

import { updateClient } from '@/api/auth'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import Joi from 'joi'
// import { Textarea } from '@/components/ui/textarea'
// import { toast } from '@/registry/new-york/ui/use-toast'
import { toast } from 'react-toastify'
import { ContextAuth, ContextMain } from '@/context/Context'
import { useContext } from 'react'
import { useMutation } from '@tanstack/react-query'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'

export interface UserUpdateType {
  name: string
  email: string
  address: string
  mobile: string | number
  age: number
  sex: string
}

const profileFormSchema = Joi.object({
  name: Joi.string().min(2).max(30).label('Tên').messages({
    'string.empty': 'Bắt buộc ghi tên',
    'string.min': '{{#label}} tối thiểu 2 kí tự.',
    'string.max': '{{#label}} tối đa 30 kí tự.'
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .label('Email')
    .messages({
      'string.empty': 'Bắt buộc ghi email',
      'string.email': '{{#label}} phải là email hợp lệ'
    }),
  address: Joi.string().label('Địa chỉ').required().min(4).messages({
    'string.empty': 'Bắt buộc ghi địa chỉ',
    'string.min': '{{#label}} tối thiểu 4 kí tự.'
  }),
  mobile: Joi.number().label('Điện thoại'),
  age: Joi.number().label('Độ tuổi').required(),
  sex: Joi.string().label('Giới tính').required().messages({
    'string.empty': 'Bắt buộc chọn giới tính'
  })
})

export function ProfileForm() {
  const { userDetail } = useContext<ContextAuth>(ContextMain)
  const userUpdate = useMutation({
    mutationFn: async (user: UserUpdateType) => updateClient(user),
    onSuccess() {
      toast.success('Cập nhật thành công')
    },
    onError() {
      toast.error('Cập nhật không thành công, hãy thử lại')
    }
  })
  const defaultValues = {
    name: userDetail.message.name,
    email: userDetail.message.email,
    address: userDetail.message?.address || '',
    mobile: userDetail.message?.mobile || 0,
    age: userDetail.message?.age || 0,
    sex: userDetail.message?.sex || ''
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
    age: number
    sex: string
  }> = (data) => {
    userUpdate.mutate({ ...data })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Tên:</FormLabel>
              <FormControl>
                <Input
                  placeholder="shadcn"
                  {...field}
                  className="py-7 text-2xl border-border-borderProfileContain"
                />
              </FormControl>
              <FormDescription className="text-xl">
                Cái này là tên hiển thị công khai của bạn. Nó có thể là tên thật
                của bạn hoặc một bút danh
              </FormDescription>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Nhập email..."
                  {...field}
                  className="py-7 text-2xl border-border-borderProfileContain"
                />
              </FormControl>
              <FormDescription className="text-xl">
                Cái này là email hiển thị công khai của bạn
              </FormDescription>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Địa chỉ</FormLabel>
              <FormControl>
                <Input
                  placeholder="đường Nam Từ Liêm Hà Nội"
                  {...field}
                  className="py-7 text-2xl border-border-borderProfileContain"
                />
              </FormControl>
              <FormDescription className="text-xl">
                Cái này là địa chỉ hiển thị công khai của bạn
              </FormDescription>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Điện thoại</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your số  điện..."
                  {...field}
                  className="py-7 text-2xl border-border-borderProfileContain"
                />
              </FormControl>
              <FormDescription className="text-xl">
                Cái này là số điện thoại hiển thị công khai của bạn
              </FormDescription>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Tuổi</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Nhập tuổi của bạn..."
                  {...field}
                  className="py-7 text-2xl border-border-borderProfileContain"
                />
              </FormControl>
              <FormDescription className="text-xl">
                Cái này là số tuổi hiển thị công khai của bạn
              </FormDescription>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sex"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-2xl">Giới tính</FormLabel>
              <FormControl>
                <RadioGroup
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <div className="flex items-center space-x-2 mt-2">
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          value="Nam"
                          className="bg-white h-7 w-7"
                          id="nam"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-2xl">
                        Nam
                      </FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem
                          className="bg-white h-7 w-7"
                          value="Nữ"
                          id="nu"
                        />
                      </FormControl>
                      <FormLabel className="font-normal text-2xl">Nữ</FormLabel>
                    </FormItem>
                  </div>
                </RadioGroup>
              </FormControl>
              <FormDescription className="text-xl">
                Cái này là giới tính hiển thị công khai của bạn
              </FormDescription>
              <FormMessage className="text-xl" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="dark:bg-background-secondary bg-neutral-800 text-2xl px-7 py-4"
        >
          Cập nhật
        </Button>
      </form>
    </Form>
  )
}

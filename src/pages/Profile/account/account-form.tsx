import { zodResolver } from '@hookform/resolvers/zod'
import { CalendarDays, ArrowDownUp, CheckIcon } from 'lucide-react'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { toast } from 'react-toastify'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator
} from '@/components/ui/command'
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
// import { toast } from '@/registry/new-york/ui/use-toast'

// const languages = [
//   { label: 'English', value: 'en' },
//   { label: 'French', value: 'fr' },
//   { label: 'German', value: 'de' },
//   { label: 'Spanish', value: 'es' },
//   { label: 'Portuguese', value: 'pt' },
//   { label: 'Russian', value: 'ru' },
//   { label: 'Japanese', value: 'ja' },
//   { label: 'Korean', value: 'ko' },
//   { label: 'Chinese', value: 'zh' }
// ] as const

const accountFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Tên phải có ít nhất 2 ký tự.'
    })
    .max(30, {
      message: 'Tên không được dài hơn 30 ký tự.'
    }),
  dob: z.date({
    required_error: 'Cần có ngày sinh.'
  }),
  language: z.string({
    required_error: 'Vui lòng chọn một ngôn ngữ.'
  })
})

type AccountFormValues = z.infer<typeof accountFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AccountFormValues> = {
  // name: "Your name",
  // dob: new Date("2023-01-23"),
}

export function AccountForm() {
  const form = useForm<AccountFormValues>({
    resolver: zodResolver(accountFormSchema),
    defaultValues
  })

  function onSubmit(data: AccountFormValues) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   )
    // })
    console.log(data)
    toast.success('Submit', {
      position: 'top-right'
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tên </FormLabel>
              <FormControl>
                <Input placeholder="Your name" {...field} />
              </FormControl>
              <FormDescription>
                Đây là tên sẽ được hiển thị trên hồ sơ của bạn và trong
                email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dob"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngày sinh</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={'outline'}
                      className={cn(
                        'w-[240px] pl-3 text-left font-normal',
                        !field.value && 'text-muted-foreground'
                      )}
                    >
                      {field.value ? (
                        format(field.value, 'PPP')
                      ) : (
                        <span>Chọn một ngày</span>
                      )}
                      <CalendarDays className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date('1900-01-01')
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
              Ngày sinh của bạn được sử dụng để tính tuổi của bạn.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="language"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Ngôn ngữ</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        'w-[200px] justify-between'
                        // !field.value && 'text-muted-foreground'
                      )}
                    >
                      {/* {field.value
                        ? languages.find(
                            (language) => language.value === field.value
                          )?.label
                        : 'Select language'}
                        */}
                      <ArrowDownUp className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      {'vdv'}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Type a command or search..." />
                    <CommandList>
                      <CommandEmpty>Không có kết quả nào được tìm thấy.</CommandEmpty>
                      <CommandGroup heading="Suggestions">
                        <CommandItem>Lịch</CommandItem>
                        <CommandItem>Tìm kiếm biểu tượng cảm xúc</CommandItem>
                        <CommandItem>Máy tính</CommandItem>
                      </CommandGroup>
                      <CommandSeparator />
                      <CommandGroup heading="Settings">
                        <CommandItem>Hồ sơ</CommandItem>
                        <CommandItem>Thanh toán</CommandItem>
                        <CommandItem>Cài đặt</CommandItem>
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
              Đây là ngôn ngữ sẽ được sử dụng trong bảng điều khiển.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Cập nhật tài khoản</Button>
      </form>
    </Form>
  )
}

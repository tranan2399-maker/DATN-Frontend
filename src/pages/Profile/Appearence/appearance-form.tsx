import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Theme, useTheme } from '@/components/theme-provider'
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
// import { toast } from '@/registry/new-york/ui/use-toast'
import { toast } from 'react-toastify'

const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark', 'system'], {
    required_error: 'Please select a theme.'
  })
})

type AppearanceFormValues = z.infer<typeof appearanceFormSchema>

// This can come from your database or API.
const defaultValues: Partial<AppearanceFormValues> = {
  theme: 'light' as Theme
}

export function AppearanceForm() {
  const { setTheme } = useTheme()
  const form = useForm({
    resolver: zodResolver(appearanceFormSchema),
    defaultValues
  })

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function onSubmit(data: any) {
    // toast({
    //   title: 'You submitted the following values:',
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   )
    // })
    setTheme(data.theme)
    toast.success('Success', {
      position: 'top-right'
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="theme"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="text-2xl">chủ đề</FormLabel>
              <FormDescription className="text-2xl">
              Chọn chủ đề cho bảng thông tin.
              </FormDescription>
              <FormMessage />
              <RadioGroup
                onValueChange={field.onChange}
                defaultValue={field.value}
                className="grid max-w-3xl  grid-cols-2 gap-8 pt-2"
              >
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary-movieColor">
                    <FormControl>
                      <RadioGroupItem value="light" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted p-1 hover:border-accent w-[200px]">
                      <div className="space-y-2 rounded-sm bg-[#ecedef] p-2 w-full">
                        <div className="space-y-2 rounded-md bg-white p-2 shadow-sm h-14">
                          <div className="h-4 w-full rounded-lg bg-[#ecedef]" />
                          <div className="h-4 w-full rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm h-14">
                          <div className="h-7 w-7 rounded-full bg-[#ecedef]" />
                          <div className="h-4 w-full rounded-lg bg-[#ecedef]" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-white p-2 shadow-sm h-14">
                          <div className="h-7 w-7 rounded-full bg-[#ecedef]" />
                          <div className="h-4 w-full rounded-lg bg-[#ecedef]" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-2xl text-center font-normal">
                     Sáng
                    </span>
                  </FormLabel>
                </FormItem>
                <FormItem>
                  <FormLabel className="[&:has([data-state=checked])>div]:border-primary-movieColor">
                    <FormControl>
                      <RadioGroupItem value="dark" className="sr-only" />
                    </FormControl>
                    <div className="items-center rounded-md border-2 border-muted bg-popover p-1 hover:bg-accent hover:text-accent-foreground w-[200px]">
                      <div className="space-y-2 rounded-sm bg-slate-950 p-2 w-full">
                        <div className="space-y-2 rounded-md bg-slate-800 p-2 shadow-sm h-14">
                          <div className="h-4 w-full rounded-lg bg-slate-400" />
                          <div className="h-4 w-full rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm h-14">
                          <div className="h-6 w-7 rounded-full bg-slate-400" />
                          <div className="h-4 w-full rounded-lg bg-slate-400" />
                        </div>
                        <div className="flex items-center space-x-2 rounded-md bg-slate-800 p-2 shadow-sm h-14">
                          <div className="h-6 w-7 rounded-full bg-slate-400" />
                          <div className="h-4 w-full rounded-lg bg-slate-400" />
                        </div>
                      </div>
                    </div>
                    <span className="block w-full p-2 text-2xl text-center font-normal">
                  Tối
                    </span>
                  </FormLabel>
                </FormItem>
              </RadioGroup>
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="dark:bg-background-secondary bg-neutral-800 text-2xl px-7 py-4"
        >
        Cập nhật tùy chọn
        </Button>
      </form>
    </Form>
  )
}

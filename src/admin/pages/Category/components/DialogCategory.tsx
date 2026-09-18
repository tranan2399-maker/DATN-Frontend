import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'

import { Category, FormCategoryAdd } from '@/admin/types/category'
import { addCategory, editCategory, getCategoryById } from '@/api/category'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { useState } from 'react'
import { FaEdit, FaPlusCircle } from 'react-icons/fa'
import { toast } from 'react-toastify'

type FormCategoryProps = {
  typeForm: 'ADD' | 'EDIT'
  id?: string
}

export function DialogCategory({ typeForm, id }: FormCategoryProps) {
  const queryClient = useQueryClient()
  const [open, setOpen] = useState(false)

  //get category by id
  const { data: categoryData, isLoading } = useQuery<Category>({
    queryKey: ['CATEGORY', id, open],
    queryFn: async () => {
      const data = await getCategoryById(id as string)

      setFieldValue('name', data?.name)
      return data
    },
    enabled: typeForm === 'EDIT' && !!id
  })

  // mutation react-query
  const { mutate } = useMutation({
    mutationFn: async (bodyData: FormCategoryAdd) => {
      if (typeForm === 'EDIT') return editCategory(bodyData, id as string)
      return addCategory(bodyData)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['CATEGORY'] })
      if (typeForm === 'EDIT') {
        toast.success('Sửa danh mục thành công')
        setOpen(false)
        return
      }
      toast.success('Thêm danh mục thành công')
      setOpen(false)
    },
    onError: () => {
      if (typeForm === 'EDIT') {
        toast.error('Sửa danh mục thất bại')
        return
      }
      toast.error('Thêm danh mục thất bại')
    }
  })

  const {
    values,
    touched,
    errors,
    handleSubmit,
    handleChange,
    handleBlur,
    setFieldValue
  } = useFormik({
    initialValues: {
      name: id ? (categoryData?.name as string) : ''
    },
    validate: (values) => {
      const errors: Partial<FormCategoryAdd> = {}
      if (!values.name) {
        errors.name = 'Yêu cầu tên danh mục'
      }
      return errors
    },
    onSubmit: async (values) => {
      try {
        const bodyData = {
          isDeleteable: categoryData?.isDeleteable,
          name: values.name,
          products: categoryData?.products || []
        }
        mutate(bodyData)
      } catch (error) {
        throw new Error(error as string)
      }
    }
  })

  if (isLoading) return <div>Loading...</div>

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {typeForm == 'ADD' ? (
          <div className="text-center mb-2 flex items-center justify-start">
            <button className="flex items-center justify-center border border-stroke py-2 px-4 rounded-full">
              Thêm <FaPlusCircle size={20} className="ml-4" />
            </button>
          </div>
        ) : (
          <Button variant="outline" className="hover:text-primary">
            <FaEdit size={20} />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>
              {typeForm === 'ADD' ? 'Thêm' : 'Chỉnh sửa'} danh mục
            </DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="p-6.5">
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full ">
                  <label className="mb-2.5 block text-primary">
                    Tên danh mục
                  </label>
                  <input
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    placeholder="Nhập tên danh mục"
                    className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-border-primary"
                  />
                  {touched.name && errors.name && (
                    <div className="text-red-500 text-sm font-bold">
                      {errors.name}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" type="submit">
              {typeForm === 'ADD' ? 'Thêm' : 'Cập nhật'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

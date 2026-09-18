import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { toast } from 'react-toastify'

import { deleteSubComment } from '@/api/comment'

import { useMutation } from '@tanstack/react-query'
import { Loader, Trash } from 'lucide-react'
import { useState } from 'react'
function ButtonDeleteComment({
  comment,
  onSuccess
}: {
  comment: { _id: string }
  onSuccess: () => void
}) {
  const [commentId, setComment] = useState<string>('')
  const { mutate: deleteComment, isPending } = useMutation({
    mutationFn: (id: string) => deleteSubComment(id),
    onSuccess: () => {
      toast.success('Xóa bình luận thành công', {
        position: 'top-right'
      })
      onSuccess && onSuccess()
    },
    onError: () => {
      toast.error('Xóa bình luận thất bại', {
        position: 'top-right'
      })
    }
  })
  const handleDeleteComment = (id: string) => {
    setComment(id)
    deleteComment(id)
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <p className="text-[red] flex justify-center hover:cursor-pointer">
          {isPending && commentId == comment._id ? <Loader /> : <Trash />}
        </p>
      </AlertDialogTrigger>
      <AlertDialogContent className="w-2/6 p-5">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg mb-1 mt-1">
            Xóa bình luận vĩnh viễn ?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm">
            Xóa bình luận này có thể dẫn đến những phản hồi cũng sẽ xóa. Bạn có
            chắc chắn muốn xóa bình luận này vĩnh viễn ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-md px-4 py-1">
            Hủy
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDeleteComment(comment._id)}
            className="bg-primary-movieColor text-md px-4 py-1"
          >
            Tiếp tục
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ButtonDeleteComment

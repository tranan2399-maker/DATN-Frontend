import {
  CommentService,
  deleteComment,
  getCommentByMovie,
  likeComment,
  postCommentByMovie,
  replyCommentByMovie
} from '@/api/comment'
import {
  COMMENT,
  CREATE_COMMENT,
  DELETE_COMMENT,
  LIKE_COMMENT,
  REPLY_COMMENT
} from '@/utils/constant'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

function useComment(id: string) {
  return useQuery({
    queryKey: [COMMENT, id],
    queryFn: () => getCommentByMovie(id)
  })
}
export function useMutationComment(
  action: string,
  onSuccess?: () => void,
  onError?: () => void
) {
  const queryClient = useQueryClient()
  const { mutate, isPending } = useMutation({
    mutationFn: (data: CommentService) => {
      switch (action) {
        case CREATE_COMMENT:
          return postCommentByMovie(data)
        case REPLY_COMMENT:
          return replyCommentByMovie(data)
        case LIKE_COMMENT:
          return likeComment(data)
        case DELETE_COMMENT:
          return deleteComment(data)
        default:
          return replyCommentByMovie(data)
      }
    },
    onSuccess: () => {
      onSuccess && onSuccess()
      queryClient.invalidateQueries({
        queryKey: [COMMENT]
      })
    },
    onError: (err) => {
      onError && onError()
      console.log(err)
    }
  })
  return { mutate, isPending }
}
export default useComment

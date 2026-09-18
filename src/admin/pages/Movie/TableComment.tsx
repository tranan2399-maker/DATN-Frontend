import Loading from '@/admin/components/Loading/Loading'
import { getCommentByMovieAdmin } from '@/api/comment'
import { COMMENT } from '@/utils/constant'
import { useQuery } from '@tanstack/react-query'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { Separator } from '@/components/ui/separator'
import ButtonDeleteComment from './ButtonDeleteComment'
import { useQueryClient } from '@tanstack/react-query'
export interface CommentType {
  _id: string
  movieId: string
  like: UserID[]
  userId: UserID
  content: string
  parentId: null
  createdAt: string
  updatedAt: Date
}

export interface UserID {
  _id: string
  name: string
  avatar: string
}

const TableCommentMovie = ({ movieId }: { movieId: string }) => {
  const queryClient = useQueryClient()
  const { data: dataComment, isLoading } = useQuery({
    queryKey: [COMMENT, movieId],
    queryFn: () => getCommentByMovieAdmin(movieId)
  })
  const onSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: [COMMENT, movieId]
    })
  }
  if (isLoading) {
    return <Loading />
  }
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        Bình luận
      </h4>

      <div className="flex flex-col">
        <div className="grid grid-cols-4 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-[120px_minmax(100px,_1fr)_130px_190px_100px]">
          <div className="p-2 xl:py-5 ">
            <h5 className=" text-sm font-medium uppercase xsm:text-base ">
              Người dùng
            </h5>
          </div>
          <div className="p-2 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Nội dung
            </h5>
          </div>
          <div className="p-2 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Lượt thích
            </h5>
          </div>
          <div className="hidden sm:block p-2 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">
              Thời gian
            </h5>
          </div>
          <div className="block p-2 text-center xl:p-5">
            <h5 className="text-sm font-medium uppercase xsm:text-base">Xóa</h5>
          </div>
        </div>

        {dataComment ? (
          dataComment?.map((comment: CommentType, key: number) => (
            <div
              className={`grid grid-cols-4 sm:grid-cols-[120px_minmax(100px,_1fr)_130px_190px_100px] ${
                key === dataComment.length - 1
                  ? ''
                  : 'border-b border-stroke dark:border-strokedark'
              }`}
              key={key}
            >
              <div className="flex items-center gap-3 p-2.5 xl:p-5">
                <div className="flex-shrink-0 hidden sm:block">
                  <img width={50} src={comment?.userId?.avatar} alt="Brand" />
                </div>
                <p className=" text-black dark:text-white ">
                  {comment?.userId?.name || ''}
                </p>
              </div>

              <div className="flex items-center justify-center p-2 xl:p-5">
                <p className="text-black dark:text-white truncate text-ellipsis">
                  {comment?.content || ''}
                </p>
              </div>

              <div className="flex items-center justify-center p-2 xl:p-5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <p className="text-meta-3 hover:cursor-pointer">
                        {comment?.like?.length || 0}
                      </p>
                    </TooltipTrigger>
                    <TooltipContent>
                      <div className="pt-2 px-2">
                        <h4 className="mb-4 text-sm font-bold leading-none">
                          Thích
                        </h4>
                        {comment &&
                          comment?.like.map((like) => (
                            <>
                              <div key={like._id} className="text-sm">
                                {like?.name || ''}
                              </div>
                              <Separator className="my-2" />
                            </>
                          ))}
                      </div>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="hidden sm:block items-center justify-center p-2  xl:p-5">
                <p className="text-black dark:text-white">
                  {comment?.createdAt || ''}
                </p>
              </div>
              <div className="block items-center justify-center p-2  xl:p-5">
                <ButtonDeleteComment comment={comment} onSuccess={onSuccess} />
              </div>
            </div>
          ))
        ) : (
          <div className="flex justify-center p-3">Không có bình luận</div>
        )}
      </div>
    </div>
  )
}

export default TableCommentMovie

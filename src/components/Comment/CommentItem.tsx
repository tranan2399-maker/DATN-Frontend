/* eslint-disable quotes */
import { format } from 'timeago.js'
import { ChevronRight, ChevronDown, ThumbsUp, Trash } from 'lucide-react'
import Action from '../Action/Action'
import { MyObjectComment } from '@/hooks/useNode'
import { useContext } from 'react'
import { useMutationComment } from '@/hooks/useComment'
import { DELETE_COMMENT, LIKE_COMMENT } from '@/utils/constant'
import { ContextMain } from '@/context/Context'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { Button } from '../ui/button'
import { FaEllipsisVertical } from 'react-icons/fa6'
interface CommentItemType {
  comment: MyObjectComment
  handleNewComment: () => void
  toggleReply: () => void
  // eslint-disable-next-line no-unused-vars

  expand: boolean
}

function CommentItem({
  comment,
  handleNewComment,
  toggleReply,
  expand
}: CommentItemType) {
  const { userDetail } = useContext(ContextMain)
  const { mutate } = useMutationComment(LIKE_COMMENT)
  const { mutate: mutateDelete } = useMutationComment(DELETE_COMMENT)
  const handleLike = () => {
    mutate({
      _id: comment._id,
      userId: userDetail?.message?._id
    })
  }
  const handleDeleteComment = () => {
    mutateDelete({
      _id: comment._id
    })
  }
  return (
    <>
      <div className="group relative flex flex-shrink-0 self-start cursor-pointer">
        <img
          src={comment?.userId?.avatar}
          alt=""
          className="h-8 w-8 md:h-20 md:w-20 xs:h-16 xs:w-16 object-fill rounded-full"
        />
      </div>

      <div className="flex items-center justify-start space-x-2 w-full">
        <div className="block w-full">
          <div className="flex justify-center items-center space-x-2 w-full">
            <div className="bg-background-secondary relative rounded-xl px-5 py-5 pt-4 w-full">
              <div className="font-medium">
                <a
                  href="#"
                  className="hover:underline xs:text-4xl font-semibold"
                >
                  <small>{comment?.userId?.name || 'No name'}</small>
                </a>
              </div>
              <div className="sm:text-2xl xs:text-3xl font-thin">
                {comment?.content}
              </div>
              <Popover>
                <PopoverTrigger asChild>
                  {userDetail?.message?.name === comment?.userId?.name && (
                    <Button className="hover:bg-background-main absolute top-1 right-1">
                      <FaEllipsisVertical />
                    </Button>
                  )}
                </PopoverTrigger>
                <PopoverContent className="w-fit">
                  <Button
                    onClick={handleDeleteComment}
                    className="bg-transparent flex items-center text-background-main p-0"
                  >
                    <Trash size={16} />
                  </Button>
                </PopoverContent>
              </Popover>
            </div>
          </div>
          <div className="flex justify-start items-center sm:text-3xl  xs:text-4xl w-full my-3">
            <div className="font-semibold text-[#babbc0] gap-4 px-2 flex flex-col items-center justify-center space-x-1">
              <div className="font-semibold text-[#babbc0] gap-4 px-2 flex items-center justify-center space-x-1">
                <a className="hover:underline">
                  <small
                    className={`flex ${comment?.like && comment?.like.includes(userDetail?.message?._id) ? 'text-primary-movieColor' : ''}`}
                    onClick={handleLike}
                  >
                    <ThumbsUp size={20} className="mb-2" />
                    <span className="flex items-center mt-1 ms-2">
                      {comment?.like?.length || 0}
                    </span>
                  </small>
                </a>
                <small className="self-center">.</small>
                <a className="hover:underline hover:cursor-pointer flex items-center flex-row">
                  <small className="flex items-center">
                    <Action
                      type={<div className="flex items-center">Phản hồi</div>}
                      className="flex items-center"
                      handleClick={handleNewComment}
                    />
                  </small>
                </a>
                <small className="self-center">.</small>
                <a href="#" className="hover:underline">
                  <small>{format(comment?.createdAt || new Date())}</small>
                </a>
              </div>
              {comment?.comments?.length > 0 && (
                <a className="hover:underline">
                  <small
                    className="flex items-center text-primary-movieColor"
                    onClick={toggleReply}
                  >
                    {expand ? (
                      <ChevronDown size={15} />
                    ) : (
                      <ChevronRight size={15} />
                    )}{' '}
                    {comment.comments.length} Phản hồi
                  </small>
                </a>
              )}
            </div>
          </div>
          {/* ----------------------------------------------------------------------------------- */}
        </div>
      </div>
    </>
  )
}

export default CommentItem

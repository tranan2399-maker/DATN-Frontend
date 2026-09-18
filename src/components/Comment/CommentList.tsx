import FormReply from './FormReply'
import { useState } from 'react'
// type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement>
import { MyObjectComment } from '@/hooks/useNode'
import CommentItem from './CommentItem'

// import { ContextMain } from '@/context/Context'
interface CommentListType {
  highestCommentId: string
  commentCount: number

  isLoading: boolean
  comment: {
    id?: number
    _id?: string
    content: string
    like: string[]
    comments: MyObjectComment[]
  }
  movieId: string
}

const CommentList = ({
  commentCount,
  isLoading,
  highestCommentId,
  comment,
  movieId
}: CommentListType) => {
  const [showInput, setShowInput] = useState<boolean>(false)
  const [expand, setExpand] = useState<boolean>(false)
  // const [input, setInput] = useState('')
  const handleNewComment = () => {
    setShowInput(!showInput)
    setExpand(true)
  }

  const toggleReply = () => {
    setExpand(!expand)
  }
  const cancleReply = () => {
    setShowInput(false)
  }

  if (isLoading) {
    return <div>loading</div>
  }

  return (
    <>
      {
        // eslint-disable-next-line quotes
        <div
          className={
            comment._id == highestCommentId
              ? 'hidden'
              : 'flex flex-row items-start justify-start  w-full h-auto  space-x-2'
          }
        >
          <CommentItem
            comment={comment}
            handleNewComment={handleNewComment}
            toggleReply={toggleReply}
            expand={expand}
          />
        </div>
      }
      <div
        key={comment._id}
        className={comment._id !== highestCommentId ? 'sm:ms-24 xs:ms-16' : ''}
        style={{
          display: expand || comment._id === highestCommentId ? 'block' : 'none'
        }}
      >
        {showInput && (
          <FormReply
            movieId={movieId}
            comment={comment}
            cancleReply={cancleReply}
            setExpand={setExpand}
            setShowInput={setShowInput}
          />
        )}
        {comment?.comments?.map((cmnt: MyObjectComment) => {
          return (
            <CommentList
              commentCount={commentCount}
              isLoading={isLoading}
              highestCommentId={highestCommentId}
              key={cmnt._id}
              comment={cmnt}
              movieId={movieId}
            />
          )
        })}
      </div>
    </>
  )
}

export default CommentList

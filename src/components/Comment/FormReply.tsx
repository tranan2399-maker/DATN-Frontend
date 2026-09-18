import { Loader, SendHorizontal, X } from 'lucide-react'
import { useContext, useState } from 'react'
import { Button } from '../ui/button'
import { MyObjectComment } from '@/hooks/useNode'
import { useMutationComment } from '@/hooks/useComment'
import { REPLY_COMMENT } from '@/utils/constant'
import { ContextMain } from '@/context/Context'

type ChangeEvent = React.ChangeEvent<HTMLTextAreaElement>
interface MyComponentProps {
  movieId: string
  // eslint-disable-next-line no-unused-vars
  comment: MyObjectComment
  // eslint-disable-next-line no-unused-vars
  setExpand: (arg0: boolean) => void
  // eslint-disable-next-line no-unused-vars
  setShowInput: (arg0: boolean) => void
  // eslint-disable-next-line no-unused-vars

  cancleReply: () => void
}
const FormReply = ({
  cancleReply,
  comment,
  setExpand,
  setShowInput,
  movieId
}: MyComponentProps) => {
  const { userDetail } = useContext(ContextMain)
  const [inputState, setInputState] = useState('')
  const { mutate, isPending } = useMutationComment(REPLY_COMMENT)
  const handleChange = (e: ChangeEvent) => {
    const target = e.target
    const value = target.value
    setInputState(value)
  }
  const handleClick = () => {
    setExpand(true)
    // handleInsertNode(comment._id, inputState, 0)
    mutate({
      movieId,
      parentId: comment._id,
      content: inputState,
      like: [],
      userId: userDetail.message._id
    })
    setShowInput(false)
    setInputState('')
  }
  return (
    <div className="flex flex-row h-full  space-x-2 space-y-2 mt-1 mb-5">
      <div className="group relative flex flex-shrink-0 self-start cursor-pointer pt-2">
        <img
          src={userDetail.message.avatar}
          alt=""
          className="h-8 w-8 md:w-20 md:h-20 xs:h-16 xs:w-16 object-fill rounded-full"
        />
      </div>
      <div className="flex items-center justify-center space-x-2 w-full">
        <div className="block w-full">
          <div className="bg-background-secondary  rounded-xl px-5 py-6 w-full">
            <div className="flex  w-full">
              <small className="hover:underline xs:text-3xl font-semibold mr-3">
                {comment?.userId?.name || 'No name'}
              </small>
              <div className="sm:text-2xl xs:text-3xl font-thin w-full flex items-center break-all">
                <textarea
                  className="w-full outline-none bg-transparent resize-none sm:text-3xl "
                  placeholder="Text here..."
                  onChange={handleChange}
                  value={inputState}
                  rows={2}
                ></textarea>
              </div>
              {isPending ? (
                <button className="px-5 flex items-center hover:cursor-pointer hover:opacity-60 disabled:opacity-45 disabled:cursor-not-allowed">
                  <Loader className="animate-spin" />
                </button>
              ) : (
                <button
                  className="px-5 flex items-center hover:cursor-pointer hover:opacity-60 disabled:opacity-45 disabled:cursor-not-allowed"
                  onClick={handleClick}
                >
                  <SendHorizontal
                    className="text-primary-movieColor"
                    size={20}
                  />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Button
        onClick={cancleReply}
        className="bg-background-secondary px-10 rounded-lg sm:block xs:hidden sm:text-2xl text-primary-movieColor font-semibold max-h-none  hover:opacity-80 hover:text-red-500"
      >
        Hủy
      </Button>
      <Button
        onClick={cancleReply}
        className="bg-background-secondary px-10 rounded-lg sm:hidden xs:block sm:text-2xl text-primary-movieColor font-semibold max-h-none  hover:opacity-80 hover:text-red-500"
      >
        <X size={20} />
      </Button>
    </div>
  )
}

export default FormReply

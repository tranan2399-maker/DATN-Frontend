import { ChangeEvent, useContext, useState } from 'react'
import { Loader } from 'lucide-react'
import { SendHorizontal } from 'lucide-react'
import { ContextMain } from '@/context/Context'
import { useMutationComment } from '@/hooks/useComment'
import { CREATE_COMMENT } from '@/utils/constant'
interface MyComponentProps {
  movieId: string
  commentCount: number
}

const FormComment = ({ movieId, commentCount }: MyComponentProps) => {
  const [input, setInput] = useState('')
  const { userDetail } = useContext(ContextMain)
  const isValid =
    input.toString().length > 0 && !input.toString().startsWith(' ')

  const { mutate, isPending } = useMutationComment(CREATE_COMMENT)
  const addComment = () => {
    mutate({
      content: input,
      userId: userDetail.message._id,
      movieId: movieId,
      like: [],
      empty: commentCount <= 0 ? true : false
    })
    setInput('')
  }
  const handleChange = (e: ChangeEvent): void => {
    const target = e.target as HTMLInputElement
    setInput(target?.value)
  }

  return (
    <div className="group flex flex-row  mb-4 ">
      <img
        src={userDetail.message.avatar}
        alt="Your Avatar"
        className="w-8 h-8 md:h-20 md:w-20 xs:h-16 xs:w-16 rounded-full mr-2"
      />
      <textarea
        className="bg-background-secondary w-full py-4 group-focus-within:border-primary-movieColor px-5 border text-3xl border-r-0 rounded-xl rounded-r-none focus:outline-none"
        placeholder="Thêm bình luận..."
        style={{ resize: 'none' }}
        rows={3}
        value={input}
        onChange={handleChange}
      ></textarea>
      <div className="bg-background-secondary  group-focus-within:border-primary-movieColor border-r-[1px] border-t-[1px]  rounded-r-lg border-b-[1px] flex justify-center items-center md:w-60 xs:w-72">
        {isPending ? (
          <button
            className="ml-2  md:px-9 md:py-4 lg:px-10 lg:py-5 disabled:cursor-not-allowed disabled:opacity-40 sm:px-10 xs:py-4 xs:px-9 sm:py-5 bg-primary-movieColor text-primary-white md:text-3xl sm:text-4xl xs:text-3xl text rounded-lg font-semibold"
            type="button"
          >
            <Loader className="animate-spin" />
          </button>
        ) : (
          <button
            type="submit"
            onClick={addComment}
            disabled={!isValid}
            className="ml-2 md:px-9 md:py-4 lg:px-10 lg:py-5 disabled:cursor-not-allowed disabled:opacity-40 sm:px-10 xs:py-4 xs:px-9 sm:py-5 bg-primary-movieColor text-primary-white md:text-3xl sm:text-4xl xs:text-3xl text rounded-lg font-semibold"
          >
            <SendHorizontal size={20} />
          </button>
        )}
      </div>
    </div>
  )
}

export default FormComment

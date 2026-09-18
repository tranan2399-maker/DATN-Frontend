/* eslint-disable no-unused-vars */
import { signin, signinWithGoogle } from '@/api/auth'

import { FormValues } from '@/pages/modals/LoginModal'
import { SIGN_IN, SIGN_IN_GOOGLE, USERDETAIL } from '@/utils/constant'
export interface MutationSign {
  data: { Accesstoken: string }
}
import { useMutation, useQueryClient } from '@tanstack/react-query'
export interface ErrorMutation{response : { data : {message : string}}}

function useMutationSign(
  action: string,
  onSuccess?: (response: MutationSign) => void,
  onError?: (err: ErrorMutation) => void
) {
  const queryClient = useQueryClient()
  const { mutate, isPending, mutateAsync } = useMutation({
    mutationFn: (data: FormValues) => {
      switch (action) {
        case SIGN_IN:
          return signin(data)
        case SIGN_IN_GOOGLE:
          return signinWithGoogle(data)
        default:
          return signin(data)
      }
    },
    onSuccess: (response) => {
      onSuccess && onSuccess(response)
      queryClient.invalidateQueries({
        queryKey: [USERDETAIL]
      })
    },
    onError: (err: ErrorMutation) => {
      onError && onError(err)
    }
  })
  return { mutate, isPending, mutateAsync }
}
export default useMutationSign

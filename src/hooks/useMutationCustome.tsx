// import { useMutation, useQueryClient } from '@tanstack/react-query'
// import { createPayment } from '@/api/payment'

// function useMutationCustom({ onSuccess, onError, action }: any) {
//   const queryClient = useQueryClient()
//   const { isSuccess, data } = useMutation({
//     mutationFn: ()=>createPayment,
//     onSuccess: () => {
//       onSuccess && onSuccess()

//       queryClient.invalidateQueries({ queryKey: [`${action}`] })
//     },
//     onError: () => {
//       onError && onError()
//     }
//   })
//   if (data && data.data) {
//     window.location.replace(data?.data)
//   }

//   return { isSuccess, data }
// }

// export default useMutationCustom

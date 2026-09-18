import { deleteUser, getDetailUserClient, updateUser } from '@/api/auth'
import React, { createContext, useState } from 'react'
import {
  InvalidateQueryFilters,
  useMutation,
  useQuery
} from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { APPROVAL_SHOW, SHOWTIMES_ADMIN, USERDETAIL } from '@/utils/constant'
import { useQueryClient } from '@tanstack/react-query'
import { TicketType } from '@/store/ticket'
import { useLocalStorage } from '@uidotdev/usehooks'
import { DELETE_TICKET } from '@/utils/constant'
import useTicket from '@/hooks/useTicket'
import {
  CreateShowtimes,
  DeleteShowtimes,
  DetailShowtimes,
  RestoreShowtime,
  deleteSoft,
  getAllShowTimes,
  getAllSoft,
  updateShowtimes
} from '@/api/showtime'
import { getAllMovie, getAllScreenRoom } from '@/api/movie'
import { useNavigate } from 'react-router-dom'

export interface ContextAuth {
  userDetail: {
    message: {
      avatar: string
      cart: []
      confirmPassword: string
      createdAt: string
      email: string
      isBlocked: false
      name: string
      password: string
      roleIds: string
      updatedAt: string
      wishlist: []
      __v: number
      _id: string
      address: string
      mobile: number
      age: number
      sex: string
    }
  }
  isLogined: boolean
  // eslint-disable-next-line no-unused-vars
  setIsLogined: (state: boolean) => void
  isLoading: boolean
  logout: () => void
}

export const ContextMain = createContext<ContextAuth>({
  userDetail: {
    message: {
      avatar: '',
      cart: [],
      confirmPassword: '',
      createdAt: '',
      email: '',
      isBlocked: false,
      name: '',
      password: '',
      roleIds: '',
      updatedAt: '',
      wishlist: [],
      __v: 0,
      _id: '',
      address: '',
      mobile: 0,
      age: 15,
      sex: ''
    }
  },
  isLogined: false,
  setIsLogined: () => {},
  isLoading: false,
  logout: () => {}
})

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  const { mutate } = useTicket(DELETE_TICKET)
  const navigate = useNavigate()
  const [ticket] = useLocalStorage<TicketType>('ticket')
  const queryClient = useQueryClient()
  const [isLogined, setIsLogined] = useState(
    !!localStorage.getItem('Accesstoken')
  )
  const { data: userDetail, isLoading } = useQuery({
    queryKey: [USERDETAIL],
    queryFn: async () => {
      const token = localStorage.getItem('Accesstoken')
      if (token) {
        const { data } = await getDetailUserClient()

        return data
      }
      return token
    }
  })

  // eslint-disable-next-line no-unused-vars
  const logout = () => {
    if (ticket && ticket.ticket_id) {
      mutate({
        ticket_id: ticket.ticket_id
      })
    }
    localStorage.removeItem('Accesstoken')
    queryClient.invalidateQueries({
      queryKey: [USERDETAIL]
    })
    setTimeout(() => {
      localStorage.removeItem('ticket')
      localStorage.removeItem('countdown')
    }, 1000)
    navigate('/')
    setIsLogined(false)
    toast.success('Đăng xuất thành công')
  }

  const userUpdate = useMutation({
    mutationFn: async (user) => await updateUser(user),
    onSuccess() {
      toast.success('Update Successfully ')
    },
    onError() {
      toast.error('Update faile, try again !')
    }
  })
  const removeUser = useMutation({
    mutationFn: async (id: any) => await deleteUser(id),
    onSuccess() {
      queryClient.invalidateQueries(['USERS'] as InvalidateQueryFilters)
      toast.success('Xóa người dùng thành công')
    },
    onError() {
      toast.error('Xóa người dùng thất bại')
    }
  })

  const { data: allShowTimes } = useQuery({
    queryKey: [SHOWTIMES_ADMIN],
    queryFn: async () => {
      try {
        const response = await getAllShowTimes()

        return response.data.response
      } catch (error) {
        throw new Error(error as string)
      }
    }
  })

  const showTimeSoft = useQuery({
    queryKey: ['SHOWTIME_SOFT'],
    queryFn: () => getAllSoft()
  })

  const { mutateAsync: addShowtime } = useMutation({
    mutationFn: async (showtime) => await CreateShowtimes(showtime),
    onSuccess() {
      // queryClient.invalidateQueries(['SHOWTIMES'] as InvalidateQueryFilters)
      queryClient.invalidateQueries({
        queryKey: [APPROVAL_SHOW]
      })

      navigate('/admin/showtimes/approval')
    }
  })
  const { mutate: removeShowtime } = useMutation({
    mutationFn: async (id) => await DeleteShowtimes(id),
    onSuccess() {
      queryClient.invalidateQueries([SHOWTIMES_ADMIN] as InvalidateQueryFilters)
      toast.success('Xóa lịch chiếu thành công ')
    },
    onError() {
      toast.error('Xóa thất bại. Hãy thử lại !')
    }
  })

  const removeShowtimeSoft = useMutation({
    mutationFn: async (id) => await deleteSoft(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['SHOWTIME_SOFT']
      })
      queryClient.invalidateQueries({
        queryKey: [SHOWTIMES_ADMIN]
      })
      toast.success('Xóa mềm lịch chiếu thành công !')
    },
    onError() {
      toast.error('Xóa thất bại, thử lại !')
    }
  })
  const restoreShowtime = useMutation({
    mutationFn: async (id) => RestoreShowtime(id),
    onSuccess() {
      queryClient.invalidateQueries({
        queryKey: ['SHOWTIME_SOFT']
      })
      queryClient.invalidateQueries({
        queryKey: [SHOWTIMES_ADMIN]
      })
      toast.success('Khôi phục lịch chiếu thành công')
    },
    onError() {
      toast.error('Khôi phục thất bại !')
    }
  })
  const detailShowtime = useMutation({
    mutationFn: async (id) => await DetailShowtimes(id),
    onSuccess() {
      toast.success('Update lịch chiếu thành công <3 ')
    },
    onError() {
      toast.error('Update faile, try again !')
    }
  })
  const editShowtimes = useMutation({
    mutationFn: async (data: any) => {
      const { showtime, id } = data
      try {
        const result = await updateShowtimes(showtime, id as string)
        return result
      } catch (error) {
        throw new Error(error as string)
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['SHOWTIMES'] as InvalidateQueryFilters)

      toast.success('Update lịch chiếu thành công <3')
    },
    onError: () => {
      toast.error('Update failed, try again!')
    }
  })

  const AllMovie = useMutation({
    mutationFn: async () => getAllMovie()
  })
  const { data: screenRoom } = useQuery({
    queryKey: ['ROOMS'],
    queryFn: getAllScreenRoom
  })

  const values = {
    isLogined,
    setIsLogined,
    userDetail,
    userUpdate,
    isLoading,
    logout,
    detailShowtime,
    allShowTimes,

    removeUser,
    addShowtime,
    removeShowtime,
    editShowtimes,
    AllMovie,
    screenRoom,
    removeShowtimeSoft,
    showTimeSoft,
    restoreShowtime
  }
  return <ContextMain.Provider value={values}>{children}</ContextMain.Provider>
}

export default ContextProvider

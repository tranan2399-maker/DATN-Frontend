import ProfileBillItem from './ProfileBillItem'
import { TicketBill } from '@/Interface/ticket'
import { useQuery } from '@tanstack/react-query'
import HashLoader from 'react-spinners/HashLoader'
import { getAllTicketByUser } from '@/api/ticket'
import { ContextMain } from '@/context/Context'
import { useContext } from 'react'
import { DateRange } from 'react-day-picker'
interface ProfileBillListType{
    date : DateRange | undefined,
    results: string,
    isSearching: boolean
}

function ProfileBillList({ date, results, isSearching }: ProfileBillListType) {
  const {
    userDetail: {
      message: { _id }
    }
  } = useContext(ContextMain)
  const { data: dataBill, isLoading } = useQuery({
    queryKey: [
      'bill',
      {
        ...date,
        _q: results,
        _id
      }
    ],
    queryFn: () =>
      getAllTicketByUser({
        ...date,
        _q: results,
        _id
      })
  })
  const override = {
    display: 'block',
    margin: '9.6rem auto'
  }
  if (isLoading || isSearching) {
    return <HashLoader cssOverride={override} size={60} color="#eb3656" />
  }
  return (
    <>
      {dataBill &&
        dataBill?.map((bill: TicketBill) => {
          return <ProfileBillItem key={bill._id} data={bill} />
        })}
    </>
  )
}

export default ProfileBillList

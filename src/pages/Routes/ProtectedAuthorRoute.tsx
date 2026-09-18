import { ContextMain } from '@/context/Context'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedAuthorized({
  redirectPath = '/',
  children
}: {
  redirectPath?: string
  children: React.ReactNode
}) {
  const { userDetail, isLoading } = useContext(ContextMain)

  if (isLoading) {
    return false
  }

  if (
    userDetail &&
    userDetail.message &&
    Object.keys(userDetail.message).length > 0
  ) {
    return children
  }

  return !userDetail && <Navigate to={redirectPath} replace />
}

export default ProtectedAuthorized

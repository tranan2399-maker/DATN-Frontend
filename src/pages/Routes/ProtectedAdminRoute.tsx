import { ContextMain } from '@/context/Context'
import { ROLE_ADMIN } from '@/utils/constant'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
function ProtectedAdminRoute({
  children,
  redirectPath
}: {
  redirectPath: string
  children: React.ReactNode
}) {
  const { userDetail, isLoading } = useContext(ContextMain)

  if (isLoading) {
    return false
  }

  if (
    userDetail &&
    userDetail.message &&
    userDetail.message.roleIds === ROLE_ADMIN
  ) {
    return children
  }

  return <Navigate to={redirectPath} replace />
}

export default ProtectedAdminRoute

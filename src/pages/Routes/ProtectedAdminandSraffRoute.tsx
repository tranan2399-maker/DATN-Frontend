import { ContextMain } from '@/context/Context'
import { ROLE_ADMIN, ROLE_STAFF } from '@/utils/constant'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
function ProtectedAdminAndStaffRoute({
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
    userDetail.message.roleIds === ROLE_ADMIN || 
    userDetail &&
    userDetail.message &&
    userDetail.message.roleIds === ROLE_STAFF 
  ) {
    return children
  }
  return <Navigate to={redirectPath} replace />
}

export default ProtectedAdminAndStaffRoute

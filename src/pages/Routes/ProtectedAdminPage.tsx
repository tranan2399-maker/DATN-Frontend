import { ContextMain } from '@/context/Context'
import { ROLE_ADMIN, ROLE_STAFF } from '@/utils/constant'
import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
function ProtectedAdminPage({
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
    [ROLE_ADMIN, ROLE_STAFF].includes(userDetail.message.roleIds)
  ) {
    return children
  }

  return <Navigate to={redirectPath} replace />
}

export default ProtectedAdminPage

import { Navigate } from 'react-router-dom'

function ProtectedResultPage({
  redirectPath = '/',
  children
}: {
  redirectPath?: string
  children: React.ReactNode
}) {
  const resultToken = localStorage.getItem('resultToken')

  if (resultToken) {
    return children
  }

  return <Navigate to={redirectPath} replace />
}

export default ProtectedResultPage

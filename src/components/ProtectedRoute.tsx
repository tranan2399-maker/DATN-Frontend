import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ condition }:any) => {
  return <>{condition ? <Outlet /> : <Navigate to="/" />}</>
}

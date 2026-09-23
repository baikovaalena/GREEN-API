import { useAuth } from '@entities/auth'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to="/registration" replace />
  }

  return <Outlet />
}

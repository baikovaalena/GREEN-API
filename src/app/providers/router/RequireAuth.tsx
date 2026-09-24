import { useAppSelector } from '@app/store'
import { selectCredentials } from '@entities/auth'
import { Navigate, Outlet } from 'react-router-dom'

export const RequireAuth = () => {
  const credentials = useAppSelector(selectCredentials)

  if (!credentials) {
    return <Navigate to="/registration" replace />
  }

  return <Outlet />
}

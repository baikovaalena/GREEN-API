import { useSelector } from 'react-redux'
import { authSlice } from '../model/authSlice'

export const useAuth = () => {
  const credentials = useSelector(authSlice.selectors.selectCredentials)
  const isAuthenticated = useSelector(authSlice.selectors.selectIsAuthenticated)

  return { credentials, isAuthenticated }
}

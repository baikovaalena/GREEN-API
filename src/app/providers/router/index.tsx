import { RegistrationPage } from '@pages/registration/ui/RegistrationPage'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
  {
    path: '*',
    element: <Navigate to="/registration" replace />,
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}

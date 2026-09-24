import { HomePage } from '@pages/home/ui/HomePage'
import { RegistrationPage } from '@pages/registration/ui/RegistrationPage'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { RequireAuth } from './RequireAuth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/home" replace />,
  },
  {
    element: <RequireAuth />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
    ],
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}

import { HomePage } from '@pages/home/ui/HomePage'
import { RegistrationPage } from '@pages/registration/ui/RegistrationPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/home',
    element: <HomePage />,
  },
  {
    path: '/registration',
    element: <RegistrationPage />,
  },
])

export const AppRouter = () => {
  return <RouterProvider router={router} />
}

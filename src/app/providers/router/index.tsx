import { ChatPage } from '@pages/chat'
import { HomePage } from '@pages/home/ui/HomePage'
import { RegistrationPage } from '@pages/registration/ui/RegistrationPage'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'

const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: '/home',
        element: <HomePage />,
      },
      {
        path: '/chat/:chatId',
        element: <ChatPage />,
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

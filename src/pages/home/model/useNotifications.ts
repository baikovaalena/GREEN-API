import { useAppDispatch, useAppSelector } from '@app/store'
import { selectCredentials } from '@entities/auth'
import {
  chatApi,
  useDeleteNotificationMutation,
  useReceiveNotificationMutation,
} from '@shared/api'
import { useEffect } from 'react'

export const useNotifications = () => {
  const credentials = useAppSelector(selectCredentials)
  const dispatch = useAppDispatch()
  const [receiveNotification] = useReceiveNotificationMutation()
  const [deleteNotification] = useDeleteNotificationMutation()

  useEffect(() => {
    if (!credentials) {
      return
    }

    let active = true
    let request: ReturnType<typeof receiveNotification> | null = null

    const poll = async () => {
      while (active) {
        try {
          request = receiveNotification(credentials)
          const notification = await request.unwrap()

          if (!active || !notification) {
            continue
          }

          const chatId =
            notification.body.senderData?.chatId ?? notification.body.chatId

          if (chatId) {
            dispatch(
              chatApi.util.invalidateTags([{ type: 'History', id: chatId }]),
            )
          }

          await deleteNotification({
            ...credentials,
            receiptId: notification.receiptId,
          }).unwrap()
        } catch {
          if (active) {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
        }
      }
    }

    void poll()

    return () => {
      active = false
      request?.abort()
    }
  }, [credentials, deleteNotification, dispatch, receiveNotification])
}

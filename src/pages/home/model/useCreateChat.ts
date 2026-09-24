import { useAppSelector } from '@app/store'
import { selectCredentials } from '@entities/auth'
import { useCheckAccountMutation } from '@shared/api'
import { useState, type FormEvent } from 'react'
import type { IChatItem } from './types'

export const useCreateChat = () => {
  const credentials = useAppSelector(selectCredentials)
  const [checkAccount, { isLoading }] = useCheckAccountMutation()
  const [phone, setPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [chats, setChats] = useState<IChatItem[]>([])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const normalizedPhone = phone.replace(/\D/g, '')

    if (!credentials || !normalizedPhone) {
      return
    }

    try {
      const response = await checkAccount({
        ...credentials,
        phoneNumber: Number(normalizedPhone),
      }).unwrap()

      if (!response.exist || !response.chatId) {
        setErrorMessage('У этого номера нет телеграм')
        return
      }

      const { chatId } = response

      setChats((currentChats) => {
        if (currentChats.some((chat) => chat.chatId === chatId)) {
          return currentChats
        }

        return [
          ...currentChats,
          { chatId, phone: normalizedPhone, messages: [] },
        ]
      })
      setPhone('')
      setErrorMessage('')
    } catch {
      setErrorMessage('Не удалось получить chatId')
    }
  }

  return {
    chats,
    errorMessage,
    handleSubmit,
    isLoading,
    phone,
    setPhone,
  }
}

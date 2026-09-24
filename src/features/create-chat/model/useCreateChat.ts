import { useAppSelector } from '@app/store'
import type { IChat } from '@entities/chat'
import { selectCredentials } from '@entities/auth'
import { useCheckAccountMutation } from '@shared/api'
import { useState, type FormEvent } from 'react'

export const useCreateChat = (onCreate: (chat: IChat) => void) => {
  const credentials = useAppSelector(selectCredentials)
  const [checkAccount, { isLoading }] = useCheckAccountMutation()
  const [phone, setPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

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

      onCreate({
        chatId: response.chatId,
        phone: normalizedPhone,
      })
      setPhone('')
      setErrorMessage('')
    } catch {
      setErrorMessage('Не удалось получить chatId')
    }
  }

  return {
    errorMessage,
    handleSubmit,
    isLoading,
    phone,
    setPhone,
  }
}

import { useAppDispatch } from '@app/store'
import { useAuth } from '@entities/auth'
import { addChat } from '@entities/chat'
import { useCheckAccountMutation } from '@/shared/api/authApi'
import { useState, type FormEvent } from 'react'

const normalizePhone = (phone: string) => phone.replace(/\D/g, '')

export const useCreateChat = () => {
  const dispatch = useAppDispatch()
  const { credentials } = useAuth()
  const [checkAccount, { isLoading }] = useCheckAccountMutation()
  const [phone, setPhone] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const phoneNumber = normalizePhone(phone)

    if (!credentials || !phoneNumber) {
      setErrorMessage('Введите номер телефона')
      return
    }

    try {
      const response = await checkAccount({
        ...credentials,
        phoneNumber: Number(phoneNumber),
      }).unwrap()

      if (!response.exist || !response.chatId) {
        setErrorMessage('На этот номер не зарегистрирован Telegram')
        return
      }

      const { chatId, username } = response

      dispatch(addChat({ chatId, phoneNumber, username }))
      setPhone('')
      setErrorMessage('')
    } catch {
      setErrorMessage('Не удалось создать чат')
    }
  }

  return { phone, setPhone, errorMessage, isLoading, handleSubmit }
}

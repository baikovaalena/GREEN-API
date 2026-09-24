import { useAppSelector } from '@app/store'
import { selectCredentials } from '@entities/auth'
import { useSendMessageMutation } from '@shared/api'
import { useState, type FormEvent } from 'react'

export const useSendMessage = (chatId: string) => {
  const credentials = useAppSelector(selectCredentials)
  const [sendMessage, { isLoading }] = useSendMessageMutation()
  const [text, setText] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const message = text.trim()

    if (!credentials || !chatId || !message) {
      return
    }

    try {
      await sendMessage({
        ...credentials,
        chatId,
        message,
      }).unwrap()

      setText('')
      setErrorMessage('')
    } catch {
      setErrorMessage('Не удалось отправить сообщение')
    }
  }

  return {
    errorMessage,
    handleSubmit,
    isLoading,
    setText,
    text,
  }
}

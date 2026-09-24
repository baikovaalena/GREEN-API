import { useAppSelector } from '@app/store'
import type { IMessage } from '@entities/chat'
import { selectCredentials } from '@entities/auth'
import { useSendMessageMutation } from '@shared/api'
import { useState, type FormEvent } from 'react'

export const useSendMessage = (
  chatId: string,
  onSent: (message: IMessage) => void,
) => {
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
      const response = await sendMessage({
        ...credentials,
        chatId,
        message,
      }).unwrap()

      onSent({ id: response.idMessage, text: message })
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

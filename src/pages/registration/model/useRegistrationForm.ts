import { useAppDispatch } from '@app/store'
import { setCredentials } from '@entities/auth'
import { useLoginMutation } from '@shared/api'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRegistrationForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isLoading, error }] = useLoginMutation()
  const [idInstance, setIdInstance] = useState<number | null>(null)
  const [apiTokenInstance, setApiTokenInstance] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!idInstance || !apiTokenInstance) {
      return
    }

    try {
      await login({ id: idInstance, token: apiTokenInstance }).unwrap()
      dispatch(setCredentials({ id: idInstance, token: apiTokenInstance }))
      navigate('/home')
    } catch {
      setErrorMessage('Не удалось выполнить вход')
    }
  }

  return {
    apiTokenInstance,
    error,
    errorMessage,
    handleSubmit,
    idInstance,
    isLoading,
    setApiTokenInstance,
    setErrorMessage,
    setIdInstance,
  }
}

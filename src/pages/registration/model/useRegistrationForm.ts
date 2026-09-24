import { useAppDispatch } from '@app/store'
import { setCredentials } from '@entities/auth'
import { useLoginMutation } from '@shared/api'
import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

export const useRegistrationForm = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isLoading }] = useLoginMutation()
  const [idInstance, setIdInstance] = useState<number | null>(null)
  const [apiTokenInstance, setApiTokenInstance] = useState<string | null>(null)
  const [isError, setIsError] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!idInstance || !apiTokenInstance) {
      return
    }

    setIsError(false)

    try {
      const { stateInstance } = await login({
        id: idInstance,
        token: apiTokenInstance,
      }).unwrap()

      if (stateInstance !== 'authorized') {
        setIsError(true)
        return
      }

      dispatch(setCredentials({ id: idInstance, token: apiTokenInstance }))
      navigate('/home')
    } catch {
      setIsError(true)
    }
  }

  return {
    apiTokenInstance,
    handleSubmit,
    idInstance,
    isError,
    isLoading,
    setApiTokenInstance,
    setIdInstance,
  }
}

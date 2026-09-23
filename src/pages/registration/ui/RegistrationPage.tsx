import {
  Button,
  Input as TelegramInput,
  List,
  Section,
  Title,
} from '@telegram-apps/telegram-ui'
import styles from './RegistrationPage.module.scss'
import { useAppDispatch } from '@app/store'
import { setCredentials } from '@entities/auth'
import { useLoginMutation } from '@/shared/api/authApi'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export const RegistrationPage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [login, { isLoading, error }] = useLoginMutation()
  const [idInstance, setIdInstance] = useState<number | null>(null)
  const [apiTokenInstance, setApiTokenInstance] = useState<string | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

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

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <List>
          <Title level="1" weight="1" className={styles.title}>
            Регистрация
          </Title>

          <Section header="Данные аккаунта">
            <TelegramInput
              header="IdInstance"
              type="number"
              placeholder="Введите idInstance"
              value={idInstance ?? ''}
              onChange={(event) => {
                setIdInstance(
                  event.target.value === '' ? null : Number(event.target.value),
                )
              }}
              autoComplete="username"
            />
            <TelegramInput
              header="ApiTokenInstance"
              type="password"
              placeholder="Введите apiTokenInstance"
              value={apiTokenInstance ?? ''}
              onChange={(event) => {
                setApiTokenInstance(
                  event.target.value === '' ? null : event.target.value,
                )
              }}
              autoComplete="current-password"
            />
          </Section>

          <p className={styles.error}>
            {error && errorMessage ? 'Не удалось выполнить вход' : ''}
          </p>

          <Button type="submit" size="l" stretched mode="filled">
            Войти
          </Button>
        </List>
      </form>
    </div>
  )
}

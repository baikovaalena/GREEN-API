import {
  Button,
  Input as TelegramInput,
  List,
  Section,
  Title,
} from '@telegram-apps/telegram-ui'
import styles from './RegistrationPage.module.scss'
import { useLoginMutation } from '@/shared/api/authApi'
import { useState } from 'react'

export const RegistrationPage = () => {
  const [login, { isLoading, error }] = useLoginMutation()
  const [idInstance, setIdInstance] = useState<number | null>(null)
  const [apiTokenInstance, setApiTokenInstance] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!idInstance || !apiTokenInstance) {
      return
    }

    login({ id: idInstance, token: apiTokenInstance })
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
            {error ? 'Не удалось выполнить вход' : ''}
          </p>

          <Button type="submit" size="l" stretched mode="filled">
            Войти
          </Button>
        </List>
      </form>
    </div>
  )
}

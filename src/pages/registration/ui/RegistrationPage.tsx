import { type FormEvent, useState } from 'react'
import {
  Button,
  Input as TelegramInput,
  List,
  Section,
  Title,
} from '@telegram-apps/telegram-ui'
import styles from './RegistrationPage.module.scss'

export const RegistrationPage = () => {
  const [id, setId] = useState('')
  const [token, setToken] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  const isSubmitDisabled = !id.trim() || !token.trim()

  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <List>
          <Title level="1" weight="1" className={styles.title}>
            Регистрация
          </Title>

          <Section header="Данные аккаунта">
            <TelegramInput
              header="Id"
              placeholder="Введите id"
              value={id}
              onChange={(event) => setId(event.target.value)}
              autoComplete="username"
            />
            <TelegramInput
              header="Token"
              type="password"
              placeholder="Введите token"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              autoComplete="current-password"
            />
          </Section>

          <Button
            type="submit"
            size="l"
            stretched
            mode="filled"
            disabled={isSubmitDisabled}
          >
            Войти
          </Button>
        </List>
      </form>
    </div>
  )
}

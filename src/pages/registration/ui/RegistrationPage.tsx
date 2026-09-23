import {
  Button,
  Input as TelegramInput,
  List,
  Section,
  Title,
} from '@telegram-apps/telegram-ui'
import styles from './RegistrationPage.module.scss'

export const RegistrationPage = () => {
  return (
    <div className={styles.page}>
      <form className={styles.form} onSubmit={() => {}}>
        <List>
          <Title level="1" weight="1" className={styles.title}>
            Регистрация
          </Title>

          <Section header="Данные аккаунта">
            <TelegramInput
              header="IdInstance"
              type="number"
              placeholder="Введите idInstance"
              value={''}
              onChange={() => {}}
              autoComplete="username"
            />
            <TelegramInput
              header="ApiTokenInstance"
              type="password"
              placeholder="Введите apiTokenInstance"
              value={''}
              onChange={() => {}}
              autoComplete="current-password"
            />
          </Section>

          <p className={styles.error}></p>

          <Button type="submit" size="l" stretched mode="filled">
            "Войти"
          </Button>
        </List>
      </form>
    </div>
  )
}

import {
  Button,
  Cell,
  Input as TelegramInput,
  List,
  Section,
  Title,
} from '@telegram-apps/telegram-ui'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'
import styles from './HomePage.module.scss'
import { useAppDispatch, useAppSelector } from '@app/store'
import { clearChats, selectChats } from '@entities/chat'
import type { ILoginRequest } from '@/shared/api/types'
import { useCreateChat } from '../model/useCreateChat'

export const HomePage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const credentials = location.state as ILoginRequest | null

  const dispatch = useAppDispatch()
  const chats = useAppSelector(selectChats)
  const { phone, setPhone, errorMessage, isLoading, handleSubmit } =
    useCreateChat(credentials)

  if (!credentials) {
    return <Navigate to="/registration" replace />
  }

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <form onSubmit={handleSubmit}>
          <List>
            <Title level="1" weight="1" className={styles.title}>
              Создайте новый чат
            </Title>

            <Section header="Добавить чат">
              <TelegramInput
                type="tel"
                placeholder="Введите номер телефона"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                autoComplete="tel"
              />
            </Section>

            {errorMessage && <p className={styles.error}>{errorMessage}</p>}

            <Button
              type="submit"
              size="l"
              stretched
              mode="filled"
              loading={isLoading}
            >
              Создать чат
            </Button>

            {chats.length > 0 && (
              <Section header="Чаты">
                {chats.map((chat) => (
                  <Cell
                    key={chat.chatId}
                    subtitle={chat.username ?? `chatId: ${chat.chatId}`}
                    description="Перейти в чат"
                    onClick={() => {
                      navigate(`/chat/${chat.chatId}`, { state: credentials })
                    }}
                  >
                    +{chat.phoneNumber}
                  </Cell>
                ))}
              </Section>
            )}

            <Button
              type="button"
              size="l"
              stretched
              mode="outline"
              onClick={() => {
                dispatch(clearChats())
                navigate('/registration', { replace: true })
              }}
            >
              Выйти
            </Button>
          </List>
        </form>
      </div>
    </div>
  )
}

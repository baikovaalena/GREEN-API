import {
  Button,
  Cell,
  Input as TelegramInput,
  List,
  Section,
  Title,
} from '@telegram-apps/telegram-ui'
import { useCreateChat } from '../model/useCreateChat'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  const { chats, errorMessage, handleSubmit, isLoading, phone, setPhone } =
    useCreateChat()

  return (
    <div className={styles.page}>
      <div className={styles.layout}>
        <div className={styles.content}>
          <form onSubmit={handleSubmit} className={styles.form}>
            <List>
              <Title level="1" weight="1" className={styles.title}>
                Создайте новый чат
              </Title>
              <p className={styles.subtitle}>
                Введите номер телефона, чтобы получить chatId и добавить чат в
                список.
              </p>

              <Section header="Номер телефона">
                <TelegramInput
                  placeholder="Введите номер телефона"
                  type="tel"
                  value={phone}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Section>

              {errorMessage && <p className={styles.error}>{errorMessage}</p>}

              <Button
                type="submit"
                size="l"
                stretched
                mode="filled"
                loading={isLoading}
                className={styles.submitButton}
              >
                Получить chatId
              </Button>
            </List>
          </form>
        </div>

        <aside className={styles.sidebar}>
          <List>
            <div className={styles.sidebarHeader}>
              <Title level="2" weight="2" className={styles.sidebarTitle}>
                Чаты
              </Title>
              <p className={styles.chatCount}>
                {chats.length > 0 ? `${chats.length} в списке` : 'Пока пусто'}
              </p>
            </div>

            <Section>
              {chats.length > 0 ? (
                chats.map((chat) => (
                  <Cell
                    key={chat.chatId}
                    subtitle={`chatId: ${chat.chatId}`}
                    description={`messages: ${chat.messages.length}`}
                  >
                    +{chat.phone}
                  </Cell>
                ))
              ) : (
                <Cell subtitle="Добавленные чаты появятся здесь">
                  Нет активных чатов
                </Cell>
              )}
            </Section>
          </List>
        </aside>
      </div>
    </div>
  )
}

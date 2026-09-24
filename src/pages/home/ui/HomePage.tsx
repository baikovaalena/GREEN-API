import { ChatList, MessageList } from '@entities/chat'
import { CreateChatForm } from '@features/create-chat'
import { LogoutButton } from '@features/logout'
import { SendMessageForm } from '@features/send-message'
import { Button, Caption, Placeholder, Title } from '@telegram-apps/telegram-ui'
import { useChatHistory } from '../model/useChatHistory'
import { useChats } from '../model/useChats'
import { useNotifications } from '../model/useNotifications'
import styles from './HomePage.module.scss'

export const HomePage = () => {
  useNotifications()

  const { activeChat, chats, handleCreate, handleSelect } = useChats()
  const { isError, isLoading, messages } = useChatHistory(
    activeChat?.chatId ?? null,
  )

  return (
    <div className={styles.page} data-chat-open={activeChat ? '' : undefined}>
      <aside className={styles.sidebar}>
        <CreateChatForm onCreate={handleCreate} />
        <ChatList
          chats={chats}
          activeChatId={activeChat?.chatId ?? null}
          onSelect={handleSelect}
        />
        <LogoutButton />
      </aside>

      <section className={styles.chat}>
        {activeChat ? (
          <>
            <header className={styles.header}>
              <Button
                className={styles.back}
                mode="plain"
                size="s"
                onClick={() => handleSelect(null)}
              >
                Чаты
              </Button>
              <div>
                <Title level="3" weight="2">
                  {activeChat.name || `+${activeChat.phone}`}
                </Title>
                <Caption level="1" className={styles.chatId}>
                  chatId: {activeChat.chatId}
                </Caption>
              </div>
            </header>
            {isLoading ? (
              <Placeholder className={styles.empty} header="Загрузка..." />
            ) : isError && messages.length === 0 ? (
              <Placeholder
                className={styles.empty}
                header="Не удалось загрузить историю"
              />
            ) : (
              <MessageList messages={messages} />
            )}
            <SendMessageForm chatId={activeChat.chatId} />
          </>
        ) : (
          <Placeholder
            className={styles.empty}
            header="Выберите чат"
            description="Создайте чат по номеру телефона или откройте его из списка"
          />
        )}
      </section>
    </div>
  )
}

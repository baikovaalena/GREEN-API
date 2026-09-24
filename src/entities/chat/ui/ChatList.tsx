import { Avatar, Cell, List, Section } from '@telegram-apps/telegram-ui'
import type { IChat } from '../model/types'
import styles from './ChatList.module.scss'

interface ChatListProps {
  activeChatId: string | null
  chats: IChat[]
  onSelect: (chatId: string) => void
}

export const ChatList = ({ activeChatId, chats, onSelect }: ChatListProps) => {
  return (
    <List className={styles.list}>
      <Section header="Чаты">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <Cell
              key={chat.chatId}
              className={
                chat.chatId === activeChatId ? styles.active : undefined
              }
              before={<Avatar size={40} acronym={chat.phone.slice(-2)} />}
              subtitle={chat.messages.at(-1)?.text ?? `chatId: ${chat.chatId}`}
              onClick={() => onSelect(chat.chatId)}
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
  )
}

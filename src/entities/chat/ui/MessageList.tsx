import { Placeholder, Text } from '@telegram-apps/telegram-ui'
import type { IMessage } from '../model/types'
import styles from './MessageList.module.scss'

interface MessageListProps {
  messages: IMessage[]
}

export const MessageList = ({ messages }: MessageListProps) => {
  if (messages.length === 0) {
    return (
      <div className={styles.empty}>
        <Placeholder
          header="Нет сообщений"
          description="Напишите первое сообщение в этом чате"
        />
      </div>
    )
  }

  return (
    <div className={styles.list}>
      {messages.map((message) => (
        <Text
          key={message.id}
          className={
            message.direction === 'incoming' ? styles.incoming : styles.outgoing
          }
        >
          {message.text}
        </Text>
      ))}
    </div>
  )
}

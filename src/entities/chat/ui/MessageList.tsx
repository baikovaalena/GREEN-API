import { Placeholder, Text } from '@telegram-apps/telegram-ui'
import { useEffect, useRef } from 'react'
import type { IMessage } from '../model/types'
import styles from './MessageList.module.scss'

interface MessageListProps {
  messages: IMessage[]
}

export const MessageList = ({ messages }: MessageListProps) => {
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const list = listRef.current

    if (list) {
      list.scrollTop = list.scrollHeight
    }
  }, [messages])

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
    <div ref={listRef} className={styles.list}>
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

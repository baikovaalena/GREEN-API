import type { IChat, IMessage } from '@entities/chat'
import { useState } from 'react'

export const useChats = () => {
  const [chats, setChats] = useState<IChat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)

  const activeChat = chats.find((chat) => chat.chatId === activeChatId) ?? null

  const handleCreate = (chat: IChat) => {
    setChats((currentChats) => {
      if (currentChats.some((item) => item.chatId === chat.chatId)) {
        return currentChats
      }

      return [...currentChats, chat]
    })
    setActiveChatId(chat.chatId)
  }

  const handleSent = (message: IMessage) => {
    if (!activeChatId) {
      return
    }

    setChats((currentChats) =>
      currentChats.map((chat) =>
        chat.chatId === activeChatId
          ? { ...chat, messages: [...chat.messages, message] }
          : chat,
      ),
    )
  }

  return {
    activeChat,
    chats,
    handleCreate,
    handleSelect: setActiveChatId,
    handleSent,
  }
}

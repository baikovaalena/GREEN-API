import type { IChat } from '@entities/chat'
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

  return {
    activeChat,
    chats,
    handleCreate,
    handleSelect: setActiveChatId,
  }
}

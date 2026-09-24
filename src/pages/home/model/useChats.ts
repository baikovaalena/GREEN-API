import { useAppSelector } from '@app/store'
import { selectCredentials } from '@entities/auth'
import type { IChat } from '@entities/chat'
import { useGetChatsQuery } from '@shared/api'
import { skipToken } from '@reduxjs/toolkit/query/react'
import { useState } from 'react'

export const useChats = () => {
  const credentials = useAppSelector(selectCredentials)
  const { data = [] } = useGetChatsQuery(credentials ?? skipToken)
  const [createdChats, setCreatedChats] = useState<IChat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)

  const apiChats: IChat[] = data.map((chat) => ({
    chatId: chat.chatId,
    name: chat.name || chat.username,
    phone: chat.phoneNumber ? String(chat.phoneNumber) : '',
  }))
  const chats = [
    ...createdChats,
    ...apiChats.filter(
      (chat) => !createdChats.some((created) => created.chatId === chat.chatId),
    ),
  ]
  const activeChat = chats.find((chat) => chat.chatId === activeChatId) ?? null

  const handleCreate = (chat: IChat) => {
    setCreatedChats((currentChats) => {
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

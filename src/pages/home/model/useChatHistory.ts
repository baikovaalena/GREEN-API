import { useAppSelector } from '@app/store'
import type { IMessage } from '@entities/chat'
import { selectCredentials } from '@entities/auth'
import { useGetChatHistoryQuery } from '@shared/api'
import { skipToken } from '@reduxjs/toolkit/query/react'

const HISTORY_COUNT = 100

const getMessageText = (message: {
  caption?: string
  extendedTextMessage?: { text?: string }
  textMessage?: string
  typeMessage: string
}) =>
  message.textMessage ||
  message.extendedTextMessage?.text ||
  message.caption ||
  message.typeMessage

export const useChatHistory = (chatId: string | null) => {
  const credentials = useAppSelector(selectCredentials)
  const { data, isError, isLoading } = useGetChatHistoryQuery(
    credentials && chatId
      ? { ...credentials, chatId, count: HISTORY_COUNT }
      : skipToken,
  )

  const messages: IMessage[] = (data ?? []).map((message) => ({
    id: message.idMessage,
    text: getMessageText(message),
    direction: message.type,
  }))

  return {
    isError,
    isLoading,
    messages,
  }
}

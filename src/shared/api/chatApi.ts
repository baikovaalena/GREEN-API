import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'
import type {
  IChatHistoryMessage,
  ICheckAccountRequest,
  ICheckAccountResponse,
  IGetChatHistoryRequest,
  ISendMessageRequest,
  ISendMessageResponse,
} from './types'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery,
  tagTypes: ['History'],
  endpoints: (builder) => ({
    checkAccount: builder.mutation<ICheckAccountResponse, ICheckAccountRequest>(
      {
        query: ({ id, token, phoneNumber }) => ({
          url: `/waInstance${id}/checkAccount/${encodeURIComponent(token)}`,
          method: 'POST',
          body: { phoneNumber },
        }),
      },
    ),
    sendMessage: builder.mutation<ISendMessageResponse, ISendMessageRequest>({
      query: ({ id, token, chatId, message }) => ({
        url: `/waInstance${id}/sendMessage/${encodeURIComponent(token)}`,
        method: 'POST',
        body: { chatId, message },
      }),
      invalidatesTags: (_result, _error, { chatId }) => [
        { type: 'History', id: chatId },
      ],
    }),
    getChatHistory: builder.query<
      IChatHistoryMessage[],
      IGetChatHistoryRequest
    >({
      query: ({ id, token, chatId, count }) => ({
        url: `/waInstance${id}/getChatHistory/${encodeURIComponent(token)}`,
        method: 'POST',
        body: { chatId, count },
      }),
      transformResponse: (messages: IChatHistoryMessage[]) =>
        [...messages].reverse(),
      providesTags: (_result, _error, { chatId }) => [
        { type: 'History', id: chatId },
      ],
    }),
  }),
})

export const {
  useCheckAccountMutation,
  useGetChatHistoryQuery,
  useSendMessageMutation,
} = chatApi

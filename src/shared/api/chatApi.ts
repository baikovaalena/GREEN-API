import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'
import type {
  ICheckAccountRequest,
  ICheckAccountResponse,
  ISendMessageRequest,
  ISendMessageResponse,
} from './types'

export const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery,
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
    }),
  }),
})

export const { useCheckAccountMutation, useSendMessageMutation } = chatApi

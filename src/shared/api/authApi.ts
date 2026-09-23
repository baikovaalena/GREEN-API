import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'
import type {
  ICheckAccountRequest,
  ICheckAccountResponse,
  ILoginRequest,
  ILoginResponse,
} from './types'

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILoginRequest>({
      query: ({ id, token }) => ({
        url: `/waInstance${id}/getStateInstance/${encodeURIComponent(token)}`,
        method: 'GET',
      }),
    }),
    checkAccount: builder.mutation<ICheckAccountResponse, ICheckAccountRequest>(
      {
        query: ({ id, token, phoneNumber }) => ({
          url: `/waInstance${id}/checkAccount/${encodeURIComponent(token)}`,
          method: 'POST',
          body: { phoneNumber },
        }),
      },
    ),
  }),
})

export const { useLoginMutation, useCheckAccountMutation } = authApi

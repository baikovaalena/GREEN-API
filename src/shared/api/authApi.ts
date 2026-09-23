import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from './baseQuery'
import type { ILoginRequest, ILoginResponse } from './types'

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
  }),
})

export const { useLoginMutation } = authApi

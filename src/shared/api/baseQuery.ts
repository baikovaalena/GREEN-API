import { fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_API_URL ?? 'https://4100.api.green-api.com',
  credentials: 'omit',
  prepareHeaders: (headers) => {
    headers.set('Content-Type', 'application/json')
    return headers
  },
})

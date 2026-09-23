import { authSlice } from '@entities/auth'
import { chatSlice } from '@entities/chat'
import { configureStore } from '@reduxjs/toolkit'
import { authApi } from '@shared/api'

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [authSlice.name]: authSlice.reducer,
    [chatSlice.name]: chatSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
})

store.subscribe(() => {
  localStorage.setItem('chats', JSON.stringify(store.getState().chat.chats))
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

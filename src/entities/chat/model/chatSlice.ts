import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { IChat, IChatState } from './types'

const getInitialState = (): IChatState => {
  try {
    return {
      chats: JSON.parse(localStorage.getItem('chats') ?? '[]') as IChat[],
    }
  } catch {
    return { chats: [] }
  }
}

const saveChats = (chats: IChat[]) => {
  try {
    localStorage.setItem('chats', JSON.stringify(chats))
  } catch {
    // localStorage может быть недоступен (приватный режим и т.п.) — молча игнорируем
  }
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState: getInitialState,
  reducers: {
    addChat: (state, action: PayloadAction<IChat>) => {
      const isExist = state.chats.some(
        (chat) => chat.chatId === action.payload.chatId,
      )

      if (!isExist) {
        state.chats.push(action.payload)
        saveChats(state.chats)
      }
    },
    clearChats: (state) => {
      state.chats = []
      saveChats(state.chats)
    },
  },
  selectors: {
    selectChats: (state) => state.chats,
  },
})

export const { addChat, clearChats } = chatSlice.actions
export const { selectChats } = chatSlice.selectors

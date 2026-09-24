import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { ILoginRequest } from '@shared/api'

const CREDENTIALS_KEY = 'credentials'

const readCredentials = (): ILoginRequest | null => {
  try {
    const raw = localStorage.getItem(CREDENTIALS_KEY)
    return raw ? (JSON.parse(raw) as ILoginRequest) : null
  } catch {
    return null
  }
}

const saveCredentials = (credentials: ILoginRequest | null) => {
  try {
    if (credentials) {
      localStorage.setItem(CREDENTIALS_KEY, JSON.stringify(credentials))
      return
    }

    localStorage.removeItem(CREDENTIALS_KEY)
  } catch (error) {
    console.error('Failed to save credentials', error)
  }
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    credentials: readCredentials(),
  },
  reducers: {
    setCredentials: (state, action: PayloadAction<ILoginRequest>) => {
      state.credentials = action.payload
      saveCredentials(action.payload)
    },
    logout: (state) => {
      state.credentials = null

      try {
        localStorage.clear()
      } catch (error) {
        console.error('Failed to clear storage', error)
      }
    },
  },
  selectors: {
    selectCredentials: (state) => state.credentials,
  },
})

export const { setCredentials, logout } = authSlice.actions
export const { selectCredentials } = authSlice.selectors

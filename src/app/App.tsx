import { AppRoot } from '@telegram-apps/telegram-ui'
import { AppRouter, StoreProvider } from './providers'

export const App = () => {
  return (
    <StoreProvider>
      <AppRoot>
        <AppRouter />
      </AppRoot>
    </StoreProvider>
  )
}

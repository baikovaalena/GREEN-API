import { AppRouter, StoreProvider } from './providers'

export const App = () => {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  )
}

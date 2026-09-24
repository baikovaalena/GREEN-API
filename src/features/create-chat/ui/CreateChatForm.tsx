import { Button, Input, List, Section } from '@telegram-apps/telegram-ui'
import type { IChat } from '@entities/chat'
import { useCreateChat } from '../model/useCreateChat'
import styles from './CreateChatForm.module.scss'

interface CreateChatFormProps {
  onCreate: (chat: IChat) => void
}

export const CreateChatForm = ({ onCreate }: CreateChatFormProps) => {
  const { errorMessage, handleSubmit, isLoading, phone, setPhone } =
    useCreateChat(onCreate)

  return (
    <form onSubmit={handleSubmit}>
      <List>
        <Section header="Новый чат">
          <Input
            placeholder="Номер телефона"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
          />
        </Section>

        {errorMessage && <p className={styles.error}>{errorMessage}</p>}

        <Button
          type="submit"
          size="m"
          stretched
          mode="filled"
          loading={isLoading}
        >
          Создать чат
        </Button>
      </List>
    </form>
  )
}

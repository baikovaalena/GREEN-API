import { Button, Input } from '@telegram-apps/telegram-ui'
import { useSendMessage } from '../model/useSendMessage'
import styles from './SendMessageForm.module.scss'

interface SendMessageFormProps {
  chatId: string
}

export const SendMessageForm = ({ chatId }: SendMessageFormProps) => {
  const { errorMessage, handleSubmit, isLoading, setText, text } =
    useSendMessage(chatId)

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        className={styles.field}
        placeholder="Сообщение"
        value={text}
        onChange={(event) => setText(event.target.value)}
      />
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
      <Button
        type="submit"
        size="m"
        mode="filled"
        loading={isLoading}
        disabled={!text.trim()}
      >
        Отправить
      </Button>
    </form>
  )
}

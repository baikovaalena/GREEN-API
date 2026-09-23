import { useParams } from 'react-router-dom'

export const ChatPage = () => {
  const { chatId } = useParams<{ chatId: string }>()

  return <div>{chatId}</div>
}

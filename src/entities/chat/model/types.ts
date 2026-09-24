export interface IMessage {
  id: string
  text: string
  direction: 'incoming' | 'outgoing'
}

export interface IChat {
  chatId: string
  name?: string
  phone: string
}

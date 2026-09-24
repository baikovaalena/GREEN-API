export interface IMessage {
  id: string
  text: string
  direction: 'incoming' | 'outgoing'
}

export interface IChat {
  chatId: string
  phone: string
}

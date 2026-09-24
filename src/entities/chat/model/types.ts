export interface IMessage {
  id: string
  text: string
}

export interface IChat {
  chatId: string
  phone: string
  messages: IMessage[]
}

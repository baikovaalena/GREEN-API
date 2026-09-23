export interface IChat {
  chatId: string
  phoneNumber: string
  username?: string
}

export interface IChatState {
  chats: IChat[]
}

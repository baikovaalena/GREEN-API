export type InstanceStatus =
  'notAuthorized' | 'authorized' | 'blocked' | 'starting' | 'sleepMode'

export interface ILoginRequest {
  id: number
  token: string
}

export interface ICheckAccountRequest extends ILoginRequest {
  phoneNumber: number
}

export interface ICheckAccountResponse {
  exist: boolean
  chatId?: string
  fromCache?: boolean
}

export interface ILoginResponse {
  stateInstance: InstanceStatus
}

export interface ISendMessageRequest extends ILoginRequest {
  chatId: string
  message: string
}

export interface ISendMessageResponse {
  idMessage: string
}

export interface IGetChatHistoryRequest extends ILoginRequest {
  chatId: string
  count: number
}

export interface IGetChatsResponse {
  chatId: string
  name: string
  type: string
  phoneNumber: number
  username: string
}

export interface IChatHistoryMessage {
  type: 'incoming' | 'outgoing'
  idMessage: string
  timestamp: number
  typeMessage: string
  textMessage?: string
  caption?: string
  extendedTextMessage?: {
    text?: string
  }
}

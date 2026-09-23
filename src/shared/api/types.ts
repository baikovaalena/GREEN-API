export type InstanceStatus =
  'notAuthorized' | 'authorized' | 'blocked' | 'starting' | 'sleepMode'

export interface ILoginRequest {
  id: number
  token: string
}

export interface ILoginResponse {
  stateInstance: InstanceStatus
}

export interface ICheckAccountRequest extends ILoginRequest {
  phoneNumber: number
}

export interface ICheckAccountResponse {
  exist: boolean
  chatId?: string
  username?: string
  phoneNumber?: number
  fromCache?: boolean
}

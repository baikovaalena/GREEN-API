export type InstanceStatus =
  'notAuthorized' | 'authorized' | 'blocked' | 'starting' | 'sleepMode'

export interface ILoginRequest {
  id: number
  token: string
}

export interface ILoginResponse {
  stateInstance: InstanceStatus
}

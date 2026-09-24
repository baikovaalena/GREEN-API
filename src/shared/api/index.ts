export { baseQuery } from './baseQuery'
export { authApi, useLoginMutation } from './authApi'
export { chatApi, useCheckAccountMutation, useSendMessageMutation } from './chatApi'
export type {
  ICheckAccountRequest,
  ICheckAccountResponse,
  ILoginRequest,
  ILoginResponse,
  ISendMessageRequest,
  ISendMessageResponse,
  InstanceStatus,
} from './types'

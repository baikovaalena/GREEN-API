export { baseQuery } from './baseQuery'
export { authApi, useLoginMutation } from './authApi'
export {
  chatApi,
  useCheckAccountMutation,
  useGetChatHistoryQuery,
  useSendMessageMutation,
} from './chatApi'
export type {
  IChatHistoryMessage,
  ICheckAccountRequest,
  ICheckAccountResponse,
  IGetChatHistoryRequest,
  ILoginRequest,
  ILoginResponse,
  ISendMessageRequest,
  ISendMessageResponse,
  InstanceStatus,
} from './types'

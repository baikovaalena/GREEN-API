export { baseQuery } from './baseQuery'
export { authApi, useLoginMutation } from './authApi'
export {
  chatApi,
  useCheckAccountMutation,
  useGetChatHistoryQuery,
  useGetChatsQuery,
  useSendMessageMutation,
} from './chatApi'
export type {
  IChatHistoryMessage,
  ICheckAccountRequest,
  ICheckAccountResponse,
  IGetChatHistoryRequest,
  IGetChatsResponse,
  ILoginRequest,
  ILoginResponse,
  ISendMessageRequest,
  ISendMessageResponse,
  InstanceStatus,
} from './types'

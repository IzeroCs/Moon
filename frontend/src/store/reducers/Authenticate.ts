export type IAuthenticateModel = {
  isAuthentic: boolean
}

export type IAuthenticateState = {
  readonly isAuthentic: boolean
}

const initialState: IAuthenticateState = {
  isAuthentic: false
}

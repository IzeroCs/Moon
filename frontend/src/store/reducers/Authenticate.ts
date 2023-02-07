import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../Store"

export type AuthenticateState = {
  isAuthentic: boolean
}

const initialState: AuthenticateState = {
  isAuthentic: false
}

export const Authenticate = createSlice({
  name: "Authenticate",
  initialState,
  reducers: {

  }
})

export const AuthenticateSelector = {
  isAuthentic: (state: RootState) => state.Authenticate.isAuthentic
}
export default Authenticate.reducer

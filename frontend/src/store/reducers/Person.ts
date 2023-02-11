import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { RootState } from "../Store"

export type PersonState = {
  isAuthentic: boolean
  accessToken: string
  refreshToken: string
}

const initialState: PersonState = {
  isAuthentic: false,
  accessToken: "",
  refreshToken: ""
}

export const Person = createSlice({
  name: "Authenticate",
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<{ access: string, refresh: string}>) => {
      const accessToken = action.payload.access
      const refreshToken = action.payload.refresh

      state.accessToken = accessToken
      state.refreshToken = refreshToken
      state.isAuthentic = accessToken.length > 0 &&
        refreshToken.length > 0
    }
  }
})

export const PersonSelector = {
  isAuthentic: (state: RootState) => state.Person.isAuthentic,
  accessToken: (state: RootState) => state.Person.accessToken,
  refreshToken: (state: RootState) => state.Person.refreshToken
}

export const PersonAction = {
  setToken: Person.actions.setToken
}

export default Person.reducer

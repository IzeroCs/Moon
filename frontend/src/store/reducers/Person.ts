import { createSlice } from "@reduxjs/toolkit"
import { RootState } from "../Store"

export type PersonState = {
  isAuthentic: boolean
}

const initialState: PersonState = {
  isAuthentic: false
}

export const Person = createSlice({
  name: "Authenticate",
  initialState,
  reducers: {

  }
})

export const PersonSelector = {
  isAuthentic: (state: RootState) => state.Person.isAuthentic
}
export default Person.reducer

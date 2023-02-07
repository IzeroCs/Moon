import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import Authenticate from "./reducers/Authenticate"

export const Store = configureStore({
  reducer: {
    Authenticate
  }
})

export type AppDispatch = typeof Store.dispatch
export type RootState = ReturnType<typeof Store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, RootState, unknown, Action<string>
>

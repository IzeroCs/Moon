import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import Person from "./reducers/Person"

export const Store = configureStore({
  reducer: {
    Person
  }
})

export type AppDispatch = typeof Store.dispatch
export type RootState = ReturnType<typeof Store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType, RootState, unknown, Action<string>
>

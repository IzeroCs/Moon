import { createStore, Store } from "vuex"
import { Types } from "./types/Types"

export declare type StoreTypes = Store<Types>
export const store = createStore<Types>({
  state: {
    isAuthentic: false,
    authenticate: {
      isAuthentic: false
    }
  },
  getters: {
  },
  mutations: {
    updateAuthentic(state, authentic) {
      state.isAuthentic = authentic
    }
  },
  actions: {
  },
  modules: {
  }
})

export function useStore() {
  return store
}

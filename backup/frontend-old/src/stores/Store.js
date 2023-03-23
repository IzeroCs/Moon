import { createStore } from "vuex"
import Authenticate from "./Authenticate"

export default createStore({
    modules: {
        authenticate: Authenticate
    },

    state() {
        return {
            isLogin: false
        }
    },

    mutations: {
        pushLogin(state, isLogin) {
            state.isLogin = isLogin
        }
    }
})

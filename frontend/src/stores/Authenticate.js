export const MODULE_NAMESPACE = "authenticate"
export const UPDATE_AUTHENTIC_MUTATION = namespaceTypes("updateAuthentic")

function namespaceTypes(name) {
    return MODULE_NAMESPACE + "/" + name
}

export default {
    namespaced: true,
    state() {
        return {
            isAuthentic: false
        }
    },

    mutations: {
        updateAuthentic(state, isAuthentic) {
            state.isAuthentic = isAuthentic
        }
    }
}

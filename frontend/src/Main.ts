import { createApp } from 'vue'
import App from "./App.vue"
import { store as Store } from "./store/Store"
import SocketConnect from "./socket/Connect"

SocketConnect.getInstance(Store)
    .connect()

createApp(App)
    .use(Store)
    .mount('#app')

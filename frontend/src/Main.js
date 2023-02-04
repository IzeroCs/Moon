import { createApp } from "vue"
import App from "./App.vue"
import Store from "./stores/Store"
import SocketConnect from "@/socket.io/Connect"

const app = createApp(App)
const socket = SocketConnect(Store)

app.use(Store)
app.mount("#app")

import { io } from "socket.io-client"
import Authenticate from "./Authenticate"

const socket = io({
    host: "127.0.0.1",
    port: "3030",
    withCredentials: true
})

socket.on("connect", () => {
    console.log("Connected")
    socket.emit("login", { username: "admin", password: "admin" })
})

export default function(store) {
    const authenticate = Authenticate(socket, store)

    return {
        authenticate
    }
}

import { io } from "socket.io-client"

const socket = io({
    host: "127.0.0.1",
    port: "3030",
    withCredentials: true
})

export default function() {
    socket.on("connect", () => {
        console.log("Connected")
    })

    return { socket }
}

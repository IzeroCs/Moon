import IOClient, { Socket } from "socket.io-client"
import { StoreTypes } from "@/store/Store"

export default class SocketConnect {
    private static _instance: SocketConnect
    private _store: StoreTypes
    private _io: Socket

    private constructor(store: StoreTypes) {
        this._store = store
        this._io = IOClient({
            host: "127.0.0.1",
            port: "3030",
            withCredentials: true,
            autoConnect: false
        })
    }

    public static getInstance(store?: StoreTypes) {
        if (typeof SocketConnect._instance === "undefined" &&
            typeof store !== "undefined"
        ) { SocketConnect._instance = new SocketConnect(store) }

        return SocketConnect._instance
    }

    public connect() {
        this._io.connect()
        this._io.on("connect", () => {
            console.log("Connected")
            setTimeout(() => {
                this._store.commit("updateAuthentic", true)
                console.log("Display on")
                setTimeout(() => {
                    this._store.commit("updateAuthentic", false)
                    console.log("Display off")
                }, 3000)
            }, 3000)
        })
    }
}

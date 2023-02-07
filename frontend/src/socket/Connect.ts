import { Socket, io as SocketIO } from "socket.io-client"

export default class SocketConnect {
  private static _instance: SocketConnect
  private _io: Socket

  private constructor() {
    this._io = SocketIO({
      autoConnect: false,
      host: "127.0.0.1",
      port: "3030",
      withCredentials: true
    })
  }

  public static getInstance(): SocketConnect {
    if (typeof SocketConnect._instance === "undefined")
      SocketConnect._instance = new SocketConnect()

    return SocketConnect._instance
  }

  public connect() {
    this._middleware()
    this._events()
    this._io.connect()
  }

  private _middleware() {

  }

  private _events() {

  }
}

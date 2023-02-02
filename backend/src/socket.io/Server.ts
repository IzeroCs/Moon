import express from "express"
import http from "http"
import SocketIO from "socket.io"
import Logger from "../utils/Logger"

const logger = Logger.create("SocketIOServer")

export default class SocketServer {
    private static _instance: SocketServer

    private _app: express.Application
    private _http: http.Server
    private _server: SocketIO.Server
    private _port: number = 3030

    private constructor() {
        this._app = express()
        this._http = http.createServer(this._app)
        this._server = new SocketIO.Server(this._http, {
            cors: {
                origin: "*:*",
                methods: ["GET", "POST"],
                credentials: true
            },
            allowRequest(req, fn) { fn(null, true) }
        })

        logger.debug("Express application initialize")
        logger.debug("Socket server initialize")

        this._middleware()
        this._events()
    }

    public static getInstance(): SocketServer {
        if (typeof SocketServer._instance === "undefined")
            SocketServer._instance = new SocketServer()

        return SocketServer._instance
    }

    public listen() {
        this._events()
        this._http.listen(this._port, () => logger
            .crit("Listen server port: " + this._port))
    }

    public get app(): express.Application { return this._app }
    public get http(): http.Server { return this._http }
    public get server(): SocketIO.Server { return this._server }
    public get port(): number { return this._port }

    private _middleware() {}

    private _events() {
        this._server.engine.on("connection_error", (err: any) => {
            logger.err("Connection error: " + err.message)
        })

        this._server.on("connection", client => {
            logger.info("Client connection: " + client.id)

            client.on("login", (args) => {
                console.log("Login", args)
            })

            client.on("disconnect", () => logger
                .notice("Client disconnect: " + client.id))
        })
    }
}

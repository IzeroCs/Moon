import {
    attachControllers,
    ERROR_MIDDLEWARE
} from "@decorators/express"
import express, {
    NextFunction,
    Request,
    Response
} from "express"
import { Container } from "@decorators/di"
import cors from "cors"
import Logger from "../utils/Logger"
import Result, { ErrorType, Status } from "../utils/Result"
import Security from "../utils/Security"
import Person from "./Person"
import File from "./File"
import i18n from "../Locale"

const logger = Logger.create("Api")

export default class Api {
    private static _instance: Api
    private _app: express.Application

    private constructor() {
        this._app = express()
    }

    public static getInstance(): Api {
        if (typeof Api._instance === "undefined")
            Api._instance = new Api()

        return Api._instance
    }

    public async attach() {
        logger.debug("Attach controller")
        this._middleware()
        await attachControllers(this._app, [Person, File])
        this._error()
    }

    public listen() {
        this._app.listen(3030, () => logger.crit("Listen port :3030"))
    }

    private _middleware() {
        this._app.use(express.urlencoded({ extended: true }))
        this._app.use(express.json())
        this._app.use(cors({
            origin: "*"
        }))
        this._app.use(Security.middlewareUserAgent)
    }

    private _error() {
        this._app.use("*", (req, res) => {
            logger.err("NotFound - 404: " + req.originalUrl)
            res.send(Result.createString({
                status: Status.NotFound,
                message: i18n.__("router_not_found", req.originalUrl),
                errorType: ErrorType.RouterNotFound
            }))
        })

        Container.provide([
            { provide: ERROR_MIDDLEWARE, useValue: (err: Error,
                req: Request, res: Response, next: NextFunction
            ) => {
                logger.err(String(err.message + "\n"), err.stack)
                res.send(Result.createString({
                    status: Status.InternalServerError,
                    message: i18n.__("internal_server_error"),
                    errorType: ErrorType.SystemError
                }))
            } }
        ])
    }
}

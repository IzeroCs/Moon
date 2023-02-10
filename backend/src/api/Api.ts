import { attachControllers, ERROR_MIDDLEWARE } from "@decorators/express"
import express, { NextFunction, Request, Response } from "express"
import { Container } from "@decorators/di"
import Logger from "../utils/Logger"
import Result, { Status } from "../utils/Result"
import Person from "./Person"
import File from "./File"

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
    }

    private _error() {
        this._app.use("*", (req, res) => {
            logger.err("NotFound - 404: " + req.url)
            res.send(Result.createString(Status.NotFound))
        })

        Container.provide([
            { provide: ERROR_MIDDLEWARE, useValue: (err: Error,
                req: Request, res: Response, next: NextFunction
            ) => {
                logger.err(String(err.message + "\n"), err.stack)
                res.send(Result.createString(Status.InternalServerError))
            } }
        ])
    }
}

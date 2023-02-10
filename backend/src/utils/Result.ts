import { Response } from "express"

export enum Status {
    Ok = 200,
    Created = 201,
    NoContent = 204,
    NotModified = 304,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    MethodNotAllow = 405,
    GoneResource = 410,
    UnsupportedMediaType = 415,
    UnprocessableEntity = 422,
    TooManyRequests = 429,
    InternalServerError = 500
}

export default class Result {
    private _status: Status
    private _data: any
    private _message: string

    public constructor(status: Status, message: string = "", data?: any) {
        this._status = status
        this._data = data
        this._message = message

        if (typeof this._message === "undefined" || this._message.length <= 0)
            this._message = this._messageByStatus()
    }

    public static create(status: Status, message: string = "", data?: any): Result {
        return new Result(status, message, data)
    }

    public static createString(status: Status, message: string = "", data?: any): string {
        return new Result(status, message, data).toString()
    }

    public static sendValidate(res: Response,
        ...validates: Array<string | boolean>
    ): Promise<boolean> {
        return this.sendValidateStatus(res, Status.UnprocessableEntity, ...validates)
    }

    public static async sendValidateStatus(res: Response, status: Status,
        ...validates: Array<string | boolean>
    ): Promise<boolean> {
        for (let i = 0; i < validates.length; ++i) {
            const entry = validates[i]

            if (entry !== true) {
                const result = this.createString(status, String(entry))
                res.status(status).send(result)
                return Promise.reject(result)
            }
        }

        return Promise.resolve(true)
    }

    public static async sendUnauthorized<T>(res: Response, msg: string,
        condition: any | null | T
    ): Promise<T> {
        if (typeof condition === "undefined" || condition === null) {
            const result = this.createString(Status.Unauthorized, msg)
            res.status(Status.Unauthorized).send(result)
            return Promise.reject(result)
        }

        return Promise.resolve(condition)
    }

    public static sendForbidden(res: Response, msg: string = "") {
        res.status(Status.Forbidden).send(this
            .createString(Status.Forbidden, msg))
    }

    public static async sendOK(res: Response, msg: string, data?: any) {
        const result = this.createString(Status.Ok, msg, data)
        res.status(Status.Ok).send(result)
        return Promise.resolve(data)
    }

    public get status(): Status { return this._status }
    public get data(): any { return this._data }
    public get message(): string { return this._message }

    public isOK(): boolean {
        return this._status == Status.Ok || this._status == Status.Created
    }

    public toString() {
        return JSON.stringify({
            status: this._status,
            data: this._data,
            message: this._message
        })
    }

    private _messageByStatus(): string {
        switch (this.status) {
            case Status.Ok:
                return "OK"
            case Status.Created:
                return "Created"
            case Status.NotModified:
                return "Not Modified"
            case Status.BadRequest:
                return "Bad Request"
            case Status.NoContent:
                return "NoContent"
            case Status.Unauthorized:
                return "Unauthorized"
            case Status.Forbidden:
                return "Forbidden"
            case Status.NotFound:
                return "Not Found"
            case Status.MethodNotAllow:
                return "Method Not Allow"
            case Status.GoneResource:
                return "Gone Resource"
            case Status.UnsupportedMediaType:
                return "Unsupported Media Type"
            case Status.UnprocessableEntity:
                return "Unprocessable Entity"
            case Status.TooManyRequests:
                return "TooMany Requests"
            case Status.InternalServerError:
                return "Internal Server Error"
            default:
                return "Unknown"
        }
    }
}

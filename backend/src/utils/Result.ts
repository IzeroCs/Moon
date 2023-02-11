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

export enum ErrorType {
    Empty = "",
    TokenExpired = "TOKEN_EXPIRED",
    TokenInvalid = "TOKEN_INVALID",
    TokenRequired = "TOKEN_REQUIRED",
    BodyValidate = "BODY_VALIDATE",
    SystemError = "SYSTEM_ERROR",
    RouterNotFound = "ROUTER_NOT_FOUND",
    AuthenticateInvalid = "AUTHENTICATE_INVALID"
}

type ResultOptions = {
    status: Status,
    message?: string
    data?: any,
    errorType?: ErrorType
}

type ResultMessageDataOptions = {
    message: string,
    data?: any
}

type ResultStatusErrorTypeOptions = {
    status: Status,
    errorType?: ErrorType
}

type ResultMessageErrorTypeOptions = {
    message: string,
    errorType?: ErrorType
}

export default class Result {
    private _status: Status
    private _data: any
    private _message: string
    private _errorType: ErrorType

    public constructor(options: ResultOptions) {
        this._status = options.status
        this._data = options.data
        this._message = options.message || ""
        this._errorType = options.errorType || ErrorType.Empty

        if (typeof this._message === "undefined" || this._message.length <= 0)
            this._message = this._messageByStatus()
    }

    public static create(options: ResultOptions): Result {
        return new Result(options)
    }

    public static createString(options: ResultOptions): string {
        return new Result(options).toString()
    }

    public static sendValidate(res: Response,
        ...validates: Array<string | boolean>
    ): Promise<boolean> {
        return this.sendValidateStatus(res, {
            status: Status.UnprocessableEntity,
            errorType: ErrorType.BodyValidate
        }, ...validates)
    }

    public static async sendValidateStatus(res: Response, options: ResultStatusErrorTypeOptions,
        ...validates: Array<string | boolean>
    ): Promise<boolean> {
        const status = options.status
        const errorType = options.errorType

        for (let i = 0; i < validates.length; ++i) {
            const message = validates[i]

            if (message !== true && typeof message === "string") {
                const result = this.createString({ status, message, errorType })
                res.status(status).send(result)
                return Promise.reject(result)
            }
        }

        return Promise.resolve(true)
    }

    public static sendUnauthorized(res: Response, options: ResultMessageErrorTypeOptions) {
        res.status(Status.Unauthorized).send(this
            .createString({
                status: Status.Unauthorized,
                message: options.message,
                errorType: options.errorType
            }))
    }

    public static async sendUnauthorizedCondition<T>(res: Response,
        options: ResultMessageErrorTypeOptions, condition: any | null | T
    ): Promise<T> {
        if (typeof condition === "undefined" || condition === null) {
            const result = this.createString({
                status: Status.Unauthorized,
                message: options.message,
                errorType: options.errorType
            })

            res.status(Status.Unauthorized).send(result)
            return Promise.reject(result)
        }

        return Promise.resolve(condition)
    }

    public static sendForbidden(res: Response, options: ResultMessageErrorTypeOptions) {
        res.status(Status.Forbidden).send(this
            .createString({
                status: Status.Forbidden,
                message: options.message,
                errorType: options.errorType
            }))
    }

    public static sendInternalServerError(res: Response, options: ResultMessageErrorTypeOptions) {
        res.status(Status.InternalServerError).send(this
            .createString({
                status: Status.InternalServerError,
                message: options.message,
                errorType: options.errorType || ErrorType.SystemError
            }))
    }

    public static async sendOK(res: Response, options: ResultMessageDataOptions) {
        const result = this.createString({
            status: Status.Ok,
            message: options.message,
            data: options.data
        })

        res.status(Status.Ok).send(result)
        return Promise.resolve(options.data)
    }

    public get status(): Status { return this._status }
    public get data(): any { return this._data }
    public get message(): string { return this._message }
    public get errorType(): ErrorType { return this.errorType }

    public isOK(): boolean {
        return this._status == Status.Ok || this._status == Status.Created
    }

    public toString() {
        return JSON.stringify({
            status: this._status,
            data: this._data,
            message: this._message,
            errorType: this._errorType
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

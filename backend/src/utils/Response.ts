export enum Status {
    Ok = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    MethodNotAllow = 405,
    InternalServerError = 500
}

export default class Response {
    private _status: Status
    private _data: any
    private _message: string

    public constructor(status: Status, message: string = "", data?: any) {
        this._status = status
        this._data = data
        this._message = message

        if (status != Status.Created && status != Status.Ok &&
            (typeof this._message === "undefined" || this._message.length <= 0)
        ) this._message = this._messageByStatus()
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
            message: this._data
        })
    }

    private _messageByStatus(): string {
        switch (this.status) {
            case Status.BadRequest:
                return "Bad Request"
            case Status.Unauthorized:
                return "Unauthorized"
            case Status.Forbidden:
                return "Forbidden"
            case Status.MethodNotAllow:
                return "Method Not Allow"
            case Status.InternalServerError:
                return "Internal Server Error"
            default:
                return "Unknown"
        }
    }
}

import axios, { AxiosError, AxiosResponse } from "axios"
import { Store } from "../store/Store"
import i18next from "../i18next"
import Person from "./Person"
import { Tokens } from "./Hooks"
import { PersonAction } from "../store/reducers/Person"

export const AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:3030/api"
})

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

export abstract class Result {
  status: Status = Status.Ok
  message: string = ""
  data: any = {}
  errorType: ErrorType = ErrorType.Empty
}

export function setupAxios() {
  AxiosInstance.interceptors.request.use(async (config) => {
    const accessToken = Store.getState().Person.accessToken
    if (accessToken.length > 0)
      config.headers["Authorization"] = "Bearer " + accessToken
    return config
  }, (err) => Promise.reject(err))

  AxiosInstance.interceptors.response.use((res) => {
    return res
  }, async (err) => {
    if (axios.isAxiosError(err) && err.response?.data) {
      const result: Result = err.response?.data

      if (result.status === Status.Unauthorized) {
        const accessToken = Store.getState().Person.accessToken
        const refreshToken = Store.getState().Person.refreshToken
        const newAccessToken = await Person.refresh(accessToken, refreshToken)

        console.log(newAccessToken.data.data.accessToken)
      }
    }

    // return Promise.reject(err)
  })
}

export namespace AxiosHandler {
  export function response<T = Result>(callback:
    (res: T, axios: AxiosResponse<T>) => void
  ) {
    return (axios: AxiosResponse<T>) => {
      if (typeof axios.data === "undefined")
        return Promise.reject(i18next.t("axios_err_data"))
      callback(axios.data, axios)
    }
  }

  export function error<T = Result>(callback:
    (res: Result, err: Error | AxiosError<T>) => void
  ) {
    return (err: Error | AxiosError<T>) => {
      if (axios.isAxiosError(err)) {
        callback(err.response?.data, err)
      } else {
        const message = err.message || String(err)
        callback({
          status: Status.InternalServerError,
          message, data: {}, errorType: ErrorType.Empty
        }, err)
      }
    }
  }
}

export default AxiosInstance

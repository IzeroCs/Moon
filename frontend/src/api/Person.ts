import { Result, AxiosInstance } from "./Axios"

export interface LoginResult extends Result {
  data: {
    accessToken: string
    refreshToken: string
  }
}

export interface RefreshResult extends Result {
  data: {
    accessToken: string
  }
}

export default class Person {
  static login(username: string, password: string) {
    return AxiosInstance.post<LoginResult>("/person/login", {
      username, password
    })
  }

  static refresh(accessToken: string, refreshToken: string) {
    return AxiosInstance.post<RefreshResult>("/person/refresh", {
      access_token: accessToken,
      refresh_token: refreshToken
    })
  }
}

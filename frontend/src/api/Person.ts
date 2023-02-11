import axios from "axios"
import { Result } from "./Handler"

export interface LoginResult extends Result {
  data: {
    accessToken: string
    refreshToken: string
  }
}

export default class Person {
  static login(username: string, password: string) {
    return axios.post<LoginResult>("/api/person/login", {
      username, password
    })
  }
}

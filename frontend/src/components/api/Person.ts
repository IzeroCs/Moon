import axios from "axios"

export default class Person {
  static login(username: string, password: string) {
    return axios.post("/api/login", {
      username, password
    })
  }
}

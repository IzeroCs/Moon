import secureStorage from "react-secure-storage"

const ACCESS_TOKEN_KEY = "access_token"
const REFRESH_TOKEN_KEY = "refresh_token"

export namespace Tokens {
  export const getAccess = (): string => {
    const token = secureStorage.getItem(ACCESS_TOKEN_KEY)
    if (token === null || typeof token !== "string")
      return ""
    return token
  }

  export const setAccess = (value: string) => secureStorage.setItem(ACCESS_TOKEN_KEY, value)
  export const removeAccess = () => secureStorage.removeItem(ACCESS_TOKEN_KEY)

  export const getRefresh = (): string => {
    const token = secureStorage.getItem(REFRESH_TOKEN_KEY)
    if (token === null || typeof token !== "string")
      return ""
    return token
  }

  export const setRefresh = (value: string) => secureStorage.setItem(REFRESH_TOKEN_KEY, value)
  export const removeRefresh = () => secureStorage.removeItem(REFRESH_TOKEN_KEY)
}

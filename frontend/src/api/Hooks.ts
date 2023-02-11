import { useSessionStorage } from "react-storage-complete"

export const useSessionAccessToken = () => useSessionStorage<string>("access_token")
export const useSessionRefreshToken = () => useSessionStorage<string>("refresh_token")

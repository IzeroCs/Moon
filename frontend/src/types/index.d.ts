import { StoreTypes } from "@/store/Store"

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $store: StoreTypes
  }
}

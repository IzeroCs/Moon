import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import reportWebVitals from "./reportWebVitals"
import App from "./components/App"
import { Store } from "./store/Store"
import { setupAxios } from "./api/Axios"
import "./i18next"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

setupAxios()
root.render(<React.StrictMode>
  <Provider store={Store}>
    <App />
  </Provider>
</React.StrictMode>)

reportWebVitals()

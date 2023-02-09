import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import axios from "axios"
import reportWebVitals from "./reportWebVitals"
import App from "./components/App"
import { Store } from "./store/Store"
import "./i18next"

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
)

axios.defaults.baseURL = "http://127.0.0.1:3030"

root.render(<React.StrictMode>
  <Provider store={Store}>
    <App />
  </Provider>
</React.StrictMode>)

reportWebVitals()

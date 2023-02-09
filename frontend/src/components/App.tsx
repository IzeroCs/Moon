import React, { useState, useEffect } from "react"
import Navigation from "./widget/Navigation"
import DesktopGrid from "./app/DesktopGrid"
import FileStation from "./app/FileStation"
import Login from "./app/Login"
import { useAppSelector } from "../store/Hooks"
import { PersonSelector } from "../store/reducers/Person"
import "../sass/app.scss"

const App: React.FC = () => {
  const isAuthentic = useAppSelector(PersonSelector.isAuthentic)
  const [windowHeight, setWindowHeight] = useState(document
    .documentElement.clientHeight)

  useEffect(() => {
    function dispatchResize() {
      setWindowHeight(document.documentElement.clientHeight)
    }

    window.addEventListener("resize", dispatchResize)
    return () => window.removeEventListener("resize", dispatchResize)
  })

  return <div
    className="bg-cover"
    style={{ height: windowHeight + "px" }}
  >
    {isAuthentic && <Navigation />}
    <div className="bg-overlay"></div>
    <div className="container-wrapper" style={{ color: "white" }}>
      {isAuthentic && <DesktopGrid />}
      {isAuthentic && <FileStation />}
      {!isAuthentic && <Login />}
    </div>
  </div>
}
export default App

import React, { useState, useEffect } from "react"
import Navigation from "./widget/Navigation"
import DesktopGrid from "./app/DesktopGrid"
import FileStation from "./app/FileStation"
import "../sass/app.scss"

const App: React.FC = () => {
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
    <Navigation />
    <div className="bg-overlay"></div>
    <div className="container-wrapper">
      <DesktopGrid />
      <FileStation />
    </div>
  </div>
}
export default App

import React, { useState, useEffect } from "react"
import Navigation from "./widget/Navigation"
import DesktopGrid from "./app/DesktopGrid"
import FileStation from "./app/FileStation"
import Login from "./app/Login"
import { useAppDispatch, useAppSelector } from "../store/Hooks"
import { PersonSelector, PersonAction } from "../store/reducers/Person"
import { Tokens } from "../api/Hooks"
import "../sass/app.scss"

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const isAuthentic = useAppSelector(PersonSelector.isAuthentic)
  const [isShow, setShow] = useState(false)
  const [windowHeight, setWindowHeight] = useState(document
    .documentElement.clientHeight)

  useEffect(() => {
    function dispatchResize() {
      setWindowHeight(document.documentElement.clientHeight)
    }

    dispatch(PersonAction.setToken({
      access: Tokens.getAccess(),
      refresh: Tokens.getRefresh()
    }))

    setShow(true)
    window.addEventListener("resize", dispatchResize)
    return () => window.removeEventListener("resize", dispatchResize)
  }, [dispatch])

  return <div
    className="bg-cover"
    style={{ height: windowHeight + "px" }}
  >
    {isShow && isAuthentic && <Navigation />}
    <div className="bg-overlay"></div>
    <div className="container-wrapper" style={{ color: "white" }}>
      {isShow && isAuthentic && <DesktopGrid />}
      {isShow && isAuthentic && <FileStation />}
      {isShow && !isAuthentic && <Login />}
    </div>
  </div>
}
export default App

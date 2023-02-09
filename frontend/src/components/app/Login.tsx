import React, { useRef, useState } from "react"
import classNames from "classnames"
import {
  InputGroup,
  InputPassword,
  InputText
} from "../widget/Input"
import { ButtonIcon } from "../widget/Button"
import Person from "../api/Person"
import { useTranslation } from "react-i18next"

const Login: React.FC<React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    const [error, setError] = useState("")
    const { t } = useTranslation()

    const usernameRef = useRef<HTMLDivElement>(null)
    const passwordRef = useRef<HTMLDivElement>(null)

    function onButtonClick(event: any) {
      if (usernameRef.current !== null &&
        passwordRef.current != null &&
        event.target != null) {
        // const usernameElement = usernameRef.current
        // const passwordElement = passwordRef.current
        // const buttonElement: HTMLButtonElement = event.target

        // usernameElement.classList.add("disabled")
        // passwordElement.classList.add("disabled")
        // buttonElement.classList.add("logging")

        Person.login("admin", "admin")
          .then(res => { console.log(res) })
          .catch(err => {
            if (err.code && err.code === "ERR_NETWORK")
              setError(t("axios_err_network")!!)
          })
      }
    }

    return <div className={classNames("login-wrapper",
      props.className)}
    >
      <div className="login-box">
        <h1 className="login-title">Izerocs-Moon</h1>
        <form className="login-form">
          <span className="login-error">{error}</span>
          <InputGroup className="login-input-group">
            <InputText
              className="login-input-field"
              icon="ic-user-outline"
              name="username"
              value="admin"
              placeholder="Username"
              ref={usernameRef} />
            <InputPassword
              className="login-input-filed"
              icon="ic-security-outline"
              name="password"
              value="admin"
              placeholder="Password"
              ref={passwordRef} />
          </InputGroup>
          <ButtonIcon
            className="login-button"
            icon="ic-arrow-next"
            aria-label="Login button"
            onClick={onButtonClick} />
        </form>
      </div>
    </div>
  }

export default Login

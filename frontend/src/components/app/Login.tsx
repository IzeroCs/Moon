import React, { useRef, useState } from "react"
import classNames from "classnames"
import {
  InputGroup,
  InputPassword,
  InputText
} from "../widget/Input"
import { ButtonIcon } from "../widget/Button"
import Person from "../../api/Person"
import { useTranslation } from "react-i18next"
import { AxiosHandler } from "../../api/Axios"
import { PersonAction } from "../../store/reducers/Person"
import { useAppDispatch } from "../../store/Hooks"
import { Tokens } from "../../api/Hooks"

const Login: React.FC<React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    const [error, setError] = useState("")
    const [inputDisable, setInputDisable] = useState(false)
    const { t } = useTranslation()
    const dispatch = useAppDispatch()

    const usernameRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    function onButtonClick() {
      const username = usernameRef.current
      const password = passwordRef.current

      if (username === null || password === null)
        return

      setInputDisable(true)
      setTimeout(() => {
        Person.login(username.value, password.value)
          .then(AxiosHandler.response((res) => {
            Tokens.setAccess(res.data.accessToken)
            Tokens.setRefresh(res.data.refreshToken)
            dispatch(PersonAction.setToken({
              access: res.data.accessToken,
              refresh: res.data.refreshToken
            }))
          })).catch(AxiosHandler.error((res) => {
            setError(res.message)
          })).finally(() => {
            setInputDisable(false)
          })
      }, 500)
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
              className={classNames({
                "login-input-field": true,
                "disabled": inputDisable
              })}
              icon="ic-user-outline"
              name="username"
              value="admin"
              placeholder={t("login_input_username")}
              ref={usernameRef} />
            <InputPassword
              className={classNames({
                "login-input-field": true,
                "disabled": inputDisable
              })}
              icon="ic-security-outline"
              name="password"
              value="admin"
              placeholder={t("login_input_password")}
              ref={passwordRef} />
          </InputGroup>
          <ButtonIcon
            className={classNames({
              "login-button": true,
              "logging": inputDisable
            })}
            icon="ic-arrow-next"
            ariaLabel={t("login_button")}
            onClick={onButtonClick} />
        </form>
      </div>
    </div>
  }

export default Login

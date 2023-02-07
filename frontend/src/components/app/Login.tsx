import React from "react"
import classNames from "classnames"
import { InputGroup, InputPassword, InputText } from "../widget/Input"

const Login: React.FC<React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    return <div className={classNames("login-wrapper",
      props.className)}
    >
      <div className="login-box">
        <h1 className="login-title">Izerocs-Moon</h1>
        <form className="login-form">
          <InputGroup className="login-input-group">
            <InputText
              className="login-input-field"
              icon="ic-user-outline"
              name="username"
              placeholder="Username" />
            <InputPassword
              className="login-input-filed"
              icon="ic-security-outline"
              name="password"
              placeholder="Password" />
          </InputGroup>
        </form>
      </div>
    </div>
  }

export default Login

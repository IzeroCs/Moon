import React from "react"
import classNames from "classnames"
import { isIconPath } from "../../utils/File"

interface InputProps extends React.HTMLAttributes<HTMLDivElement> {
  name?: string
  icon?: string
  placeholder?: string
}

type InputFieldProps = {
  type: string
}

const InputGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    return <div className="input-group">{props.children}</div>
  }

const InputField: React.FC<InputProps & InputFieldProps> =
  (props) => {
    return <div className={classNames("input-field", props.className)}>
      {props.icon && isIconPath(props.icon) ?
        <img src={props.icon} alt={props.placeholder} className="input-field-icon path" /> : props.icon &&
        <span className={classNames("icomoon", "input-field-icon", props.icon)}></span>}

      <input
        type={props.type}
        name={props.name}
        className={classNames("input", "input-field-" + props.type)}
        placeholder={props.placeholder} />
    </div>
  }

const InputText: React.FC<InputProps> =
  (props) => <InputField type="text" {...props} />

const InputPassword: React.FC<InputProps &
  React.HTMLAttributes<HTMLInputElement>> =
  (props) => <InputField type="password" {...props} />

export { InputGroup, InputText, InputPassword }

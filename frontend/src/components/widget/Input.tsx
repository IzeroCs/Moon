import React, { forwardRef } from "react"
import classNames from "classnames"
import { isIconPath } from "../../utils/File"

interface InputProps extends React.HTMLAttributes<HTMLDivElement>,
  React.RefAttributes<HTMLDivElement> {
  name?: string
  icon?: string
  value?: string
  placeholder?: string
  inputRef?: React.RefAttributes<HTMLInputElement>
}

interface InputFieldProps {
  type: string
}

const InputGroup: React.FC<React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    return <div className="input-group">{props.children}</div>
  }

const InputField: React.FC<InputProps & InputFieldProps> =
  forwardRef((props, ref) => {
    return <div
      className={classNames("input-field",
        props.className)}
      ref={ref}>
      {props.icon && isIconPath(props.icon) ?
        <img src={props.icon} alt={props.placeholder} className="input-field-icon path" /> : props.icon &&
        <span className={classNames("icomoon", "input-field-icon", props.icon)}></span>}

      <input
        type={props.type}
        name={props.name}
        defaultValue={props.value}
        className={classNames("input", "input-field-" + props.type)}
        placeholder={props.placeholder} />
    </div>
  })

const InputText: React.FC<InputProps> =
  forwardRef((props, ref) => <InputField type="text" ref={ref} {...props} />)

const InputPassword: React.FC<InputProps &
  React.HTMLAttributes<HTMLInputElement>> =
  forwardRef((props, ref) => <InputField type="password" ref={ref} {...props} />)

export { InputGroup, InputText, InputPassword }

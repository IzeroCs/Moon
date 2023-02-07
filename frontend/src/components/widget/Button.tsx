import React from "react"
import classNames from "classnames"

type ButtonTextProps = {
  icon?: string
}

type ButtonIconProps = {
  icon: string
}

const ButtonText: React.FC<ButtonTextProps &
  React.HTMLAttributes<HTMLButtonElement>> =
  (props) => {
    return <button type="button" className="btn btn-text">
      {props.icon && <span
        className={classNames("btn-icon", "icomoon",
          props.icon, props.className)}></span>}
      {props.children}
    </button>
  }

const ButtonIcon: React.FC<ButtonIconProps &
  React.HTMLAttributes<HTMLButtonElement>> = (props) => {
    return <button
      type="button"
      className={classNames("btn", "btn-icon", "icomoon",
        props.icon, props.className)}></button>
  }

export { ButtonText, ButtonIcon }

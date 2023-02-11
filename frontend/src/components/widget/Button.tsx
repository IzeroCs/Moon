import React from "react"
import classNames from "classnames"

interface ButtonProps extends
  React.HTMLAttributes<HTMLButtonElement> {
  ariaLabel?: string | any
}

type ButtonTextProps = {
  icon?: string
}

type ButtonIconProps = {
  icon: string
}

const ButtonText: React.FC<ButtonProps & ButtonTextProps> =
  (props) => {
    return <button
      type="button"
      className={classNames("btn btn-text",
        props.className)}
      onClick={props.onClick}
      aria-label={props.ariaLabel}>
      {props.icon && <span
        className={classNames("btn-icon", "icomoon",
          props.icon, props.className)}></span>}
      {props.children}
    </button>
  }

const ButtonIcon: React.FC<ButtonProps & ButtonIconProps> =
  (props) => {
    return <button
      type="button"
      className={classNames("btn", "btn-icon", props.className)}
      onClick={props.onClick}
      aria-label={props.ariaLabel}>
      <span className={classNames("icomoon",
        props.icon)}></span>
    </button>
  }

export { ButtonText, ButtonIcon }

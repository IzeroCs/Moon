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
    return <button
      type="button"
      className={classNames("btn btn-text",
        props.className)}
      onClick={props.onClick}>
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
      className={classNames("btn", "btn-icon", props.className)}
      onClick={props.onClick}
      aria-label={props["aria-label"]}>
      <span className={classNames("icomoon",
        props.icon)}></span>
    </button>
  }

export { ButtonText, ButtonIcon }

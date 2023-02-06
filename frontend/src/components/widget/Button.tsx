import React from "react"
import classNames from "classnames"

interface IButtonIconProps extends React.PropsWithChildren {
  icon: string
}

interface IButtonTextProps extends React.PropsWithChildren {
  icon?: string
}

export abstract class AbsButton<Props = {}, State = {}> extends
  React.Component<Props & React.HTMLAttributes<HTMLButtonElement>, State>
{ }

export class ButtonIcon extends AbsButton<IButtonIconProps> {
  render(): React.ReactNode {
    return <button
      type="button"
      className={classNames("btn", "btn-icon", "icomoon",
        this.props.icon, this.props.className)}></button>
  }
}

export class ButtonText extends AbsButton<IButtonTextProps> {
  render(): React.ReactNode {
    return <button type="button" className="btn btn-text">
      {this.props.icon && <span
        className={classNames("btn-icon", "icomoon",
          this.props.icon, this.props.className)}></span>}
      {this.props.children}
    </button>
  }
}

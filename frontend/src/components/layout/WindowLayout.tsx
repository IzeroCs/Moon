import React from "react"
import classNames from "classnames"

interface IWindowLayoutProps extends React.PropsWithChildren {
  icon?: string
  title: string
  isButtonHelp?: boolean
  isButtonMinimize?: boolean
  isButtonRestore?: boolean
  isButtonClose?: boolean
}

export default class WindowLayout extends
  React.Component<IWindowLayoutProps &
    React.HTMLAttributes<HTMLDivElement>>
{
  render(): React.ReactNode {
    return <div className={classNames("window", this.props.className)}>
      <div className="window-titlebars">
        <div className="window-titlebars-title">
          {this.props.icon && <img src={this.props.icon}
            className="window-titlebars-icon"
            alt={this.props.title} />}
          <span className="window-titlebars-label">{this.props.title}</span>
        </div>
        <div className="window-titlebars-button">
          {this.props.isButtonHelp && <button
            className="window-titlebars-button-item icomoon ic-about"
            data-action="help"></button>}

          {(this.props.isButtonMinimize || true) && <button
            className="window-titlebars-button-item icomoon ic-window-minimize"
            data-action="minimize"></button>}

          {(this.props.isButtonRestore || true) && <button
            className="window-titlebars-button-item icomoon ic-window-restore"
            data-action="restore"></button>}

          {(this.props.isButtonClose || true) && <button
            className="window-titlebars-button-item icomoon ic-window-close"
            data-action="close"></button>}
        </div>
      </div>
      <div className="window-container window-sidebar-container">
        {this.props.children}
      </div>
    </div>
  }
}

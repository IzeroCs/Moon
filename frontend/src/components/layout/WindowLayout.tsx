import React from "react"
import classNames from "classnames"

type WindowLayoutProps = {
  icon?: string
  title: string
  isButtonHelp?: boolean
  isButtonMinimize?: boolean
  isButtonRestore?: boolean
  isButtonClose?: boolean
}

const WindowLayout: React.FC<WindowLayoutProps &
  React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    return <div className={classNames("window", props.className)}>
      <div className="window-titlebars">
        <div className="window-titlebars-title">
          {props.icon && <img src={props.icon}
            className="window-titlebars-icon"
            alt={props.title} />}
          <span className="window-titlebars-label">{props.title}</span>
        </div>
        <div className="window-titlebars-button">
          {props.isButtonHelp && <button
            className="window-titlebars-button-item icomoon ic-about"
            data-action="help"></button>}

          {(props.isButtonMinimize || true) && <button
            className="window-titlebars-button-item icomoon ic-window-minimize"
            data-action="minimize"></button>}

          {(props.isButtonRestore || true) && <button
            className="window-titlebars-button-item icomoon ic-window-restore"
            data-action="restore"></button>}

          {(props.isButtonClose || true) && <button
            className="window-titlebars-button-item icomoon ic-window-close"
            data-action="close"></button>}
        </div>
      </div>
      <div className="window-container window-sidebar-container">
        {props.children}
      </div>
    </div>
  }

export default WindowLayout

import React from "react"
import classNames from "classnames"
import { ButtonIcon } from "./Button"

export default class Navigation extends
  React.Component<React.HTMLAttributes<HTMLDivElement>>
{
  render(): React.ReactNode {
    return <div className={classNames("navigation", this.props.className)}>
      <div className="navigation-action-list">
        <ButtonIcon className="navigation-action-item" icon="ic-message-outline" />
        <ButtonIcon className="navigation-action-item" icon="ic-user-outline" />
        <ButtonIcon className="navigation-action-item" icon="ic-search-outline" />
      </div>
    </div>
  }
}

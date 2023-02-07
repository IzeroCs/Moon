import React from "react"
import classNames from "classnames"
import { ButtonIcon } from "./Button"

const Navigation: React.FC<React
  .HTMLAttributes<HTMLDivElement>> = (props) => {
    return <div className={classNames("navigation", props.className)}>
      <div className="navigation-action-list">
        <ButtonIcon className="navigation-action-item" icon="ic-message-outline" />
        <ButtonIcon className="navigation-action-item" icon="ic-user-outline" />
        <ButtonIcon className="navigation-action-item" icon="ic-search-outline" />
      </div>
    </div>
  }

export default Navigation

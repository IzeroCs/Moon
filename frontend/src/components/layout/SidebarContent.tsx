import React from "react"
import classNames from "classnames"

const SidebarContent: React.FC<React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    return <div className={classNames("window-sidebar-content",
      props.className)}>{props.children}</div>
  }

export default SidebarContent

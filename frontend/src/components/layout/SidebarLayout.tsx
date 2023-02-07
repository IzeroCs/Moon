import React from "react"
import classNames from "classnames"
import Scrollbar from "react-perfect-scrollbar"

const SidebarLayout: React.FC<React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    return <div className={classNames("window-sidebar-layout",
      props.className)}
    >
      <Scrollbar>
        <div className="window-sidebar-layout-content">{props.children}</div>
      </Scrollbar>
    </div>
  }

export default SidebarLayout

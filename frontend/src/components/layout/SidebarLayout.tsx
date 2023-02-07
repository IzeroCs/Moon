import React from "react"
import classNames from "classnames"
import Scrollbar from "react-perfect-scrollbar"

interface ISidebarLayoutProps extends React.PropsWithChildren { }

export default class SidebarLayout extends
  React.Component<ISidebarLayoutProps &
    React.HTMLAttributes<HTMLDivElement>>
{
  render(): React.ReactNode {
    return <div className={classNames("window-sidebar-layout",
      this.props.className)}
    >
      <Scrollbar>
        <div className="window-sidebar-layout-content">{this.props.children}</div>
      </Scrollbar>
    </div>
  }
}

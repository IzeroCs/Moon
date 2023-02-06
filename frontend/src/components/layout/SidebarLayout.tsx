import React from "react"
import classNames from "classnames"

interface ISidebarLayoutProps extends React.PropsWithChildren { }

export default class SidebarLayout extends
  React.Component<ISidebarLayoutProps &
    React.HTMLAttributes<HTMLDivElement>>
{
  render(): React.ReactNode {
    return <div className={classNames("window-sidebar-layout",
      this.props.className)}>{this.props.children}</div>
  }
}

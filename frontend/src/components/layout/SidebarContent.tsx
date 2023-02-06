import React from "react"
import classNames from "classnames"

interface ISidebarContentProps extends React.PropsWithChildren { }

export default class SidebarContent extends
  React.Component<ISidebarContentProps &
    React.HTMLAttributes<HTMLDivElement>>
{
  render(): React.ReactNode {
    return <div className={classNames("window-sidebar-content",
      this.props.className)}>{this.props.children}</div>
  }
}

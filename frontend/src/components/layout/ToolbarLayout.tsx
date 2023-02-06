import classNames from "classnames"
import React from "react"

interface IToolbarLayoutProps extends React.PropsWithChildren { }
interface IToolbarCellProps extends React.PropsWithChildren { }

export class ToolbarCell extends
  React.Component<IToolbarCellProps &
    React.HTMLAttributes<HTMLTableCellElement>>
{
  render(): React.ReactNode {
    return <td className={classNames("toolbar-cell",
      this.props.className)}>{this.props.children}</td>
  }
}

export default class ToolbarLayout extends
  React.Component<IToolbarLayoutProps & React.HTMLAttributes<HTMLTableElement>>
{
  render(): React.ReactNode {
    return <table className={classNames("toolbar-layout",
      this.props.className)}
    >
      <thead><tr className="toolbar-row">{this.props.children}</tr></thead>
    </table>
  }
}

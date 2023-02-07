import React from "react"
import classNames from "classnames"

// interface IToolbarLayoutProps extends React.PropsWithChildren { }
// interface IToolbarCellProps extends React.PropsWithChildren { }

const ToolbarCell: React.FC<React.HTMLAttributes<HTMLTableCellElement>> =
  (props) => {
    return <td className={classNames("toolbar-cell",
      props.className)}>{props.children}</td>
  }

const ToolbarLayout: React.FC<React.HTMLAttributes<HTMLTableElement>> =
  (props) => {
    return <table className={classNames("toolbar-layout",
      props.className)}
    >
      <thead><tr className="toolbar-row">{props.children}</tr></thead>
    </table>
  }

export { ToolbarCell, ToolbarLayout }

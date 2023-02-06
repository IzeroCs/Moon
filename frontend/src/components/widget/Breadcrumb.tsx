import React from "react"
import classNames from "classnames"

interface IBreadcrumbProps extends React.PropsWithChildren {
  lists: Array<string>
}

export default class Breadcrumb extends
  React.Component<IBreadcrumbProps &
    React.HTMLAttributes<HTMLUListElement>>
{
  render(): React.ReactNode {
    return <ul className={classNames("breadcrumb", this.props.className)}>
      {this.props.lists.map((entry, index) => {
        return <li className="breadcrumb-item" key={index}>
          <span className="breadcrumb-label">{entry}</span>
        </li>
      })}
    </ul>
  }
}

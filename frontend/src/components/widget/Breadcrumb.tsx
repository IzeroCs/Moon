import React from "react"
import classNames from "classnames"

type BreadcrumbProps = {
  lists: Array<string>
}

const Breadcrumb: React.FC<BreadcrumbProps &
  React.HTMLAttributes<HTMLUListElement>> =
  (props) => {
    return <ul className={classNames("breadcrumb", props.className)}>
      {props.lists.map((entry, index) => {
        return <li className="breadcrumb-item" key={index}>
          <span className="breadcrumb-label">{entry}</span>
        </li>
      })}
    </ul>
  }
export default Breadcrumb

import React, { useState } from "react"
import classNames from "classnames"

interface ITreeViewNodeItem {
  name: string
  actived?: boolean
  nodes?: Array<ITreeViewNodeItem>
}

type TreeViewProps = {
  node: ITreeViewNodeItem
}

type TreeViewNodeProps = {
  node: ITreeViewNodeItem
}

const TreeViewNode: React.FC<TreeViewNodeProps &
  React.HTMLAttributes<HTMLLIElement>> =
  (props) => {
    const [isOpen, setOpen] = useState(isActive())

    function isActive(): boolean {
      return typeof props.node.actived !== "undefined" &&
        props.node.actived
    }

    function toggle() {
      setOpen(!isOpen)
    }

    function isParent(): boolean {
      return typeof props.node.nodes !== "undefined" &&
        props.node.nodes.length > 0
    }

    return <li>
      <div className="tree-node-title">
        <span
          onClick={toggle}
          className={classNames({
            "icomoon": true,
            "tree-node-icon": true,
            "ic-arrow-fill-right": !isOpen,
            "ic-arrow-fill-down": isOpen
          })}
        ></span>
        <span className="tree-node-label">{props.node.name}</span>
      </div>
      {isParent() && isOpen && <ul>
        {typeof props.node.nodes !== "undefined" &&
          props.node.nodes.map((entry, index) => {
            return <TreeViewNode
              className="tree-node"
              key={index}
              node={entry} />
          })}
      </ul>}
    </li>
  }

const TreeView: React.FC<TreeViewProps &
  React.HTMLAttributes<HTMLUListElement>> =
  (props) => {
    return <ul className={classNames("tree-view", props.className)}>
      <TreeViewNode
        className="tree-node"
        node={props.node} />
    </ul>
  }

export default TreeView

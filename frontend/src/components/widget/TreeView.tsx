import React from "react"
import classNames from "classnames"

interface ITreeViewProps extends React.PropsWithChildren {
  node: ITreeViewNodeItem
}

interface ITreeViewNodeProps extends React.PropsWithChildren {
  node: ITreeViewNodeItem,
}

interface ITreeViewItemState {
  isOpen: boolean
}

export interface ITreeViewNodeItem {
  name: string
  actived?: boolean
  nodes?: Array<ITreeViewNodeItem>
}

export class TreeViewNode extends
  React.Component<ITreeViewNodeProps &
    React.HTMLAttributes<HTMLLIElement>, ITreeViewItemState>
{
  constructor(props: ITreeViewNodeProps) {
    super(props)
    this.state = {
      isOpen: this.isActive()
    }
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  isActive(): boolean {
    return typeof this.props.node.actived !== "undefined" &&
      this.props.node.actived
  }

  isParent(): boolean {
    return typeof this.props.node.nodes !== "undefined" &&
      this.props.node.nodes.length > 0
  }

  render(): React.ReactNode {
    return <li>
      <div className="tree-node-title">
        <span
          onClick={this.toggle.bind(this)}
          className={classNames({
            "icomoon": true,
            "tree-node-icon": true,
            "ic-arrow-fill-right": !this.state.isOpen,
            "ic-arrow-fill-down": this.state.isOpen
          })}
        ></span>
        <span className="tree-node-label">{this.props.node.name}</span>
      </div>
      {this.isParent() && this.state.isOpen && <ul>
        {typeof this.props.node.nodes !== "undefined" &&
          this.props.node.nodes.map((entry, index) => {
            return <TreeViewNode
              className="tree-node"
              key={index}
              node={entry} />
          })}
      </ul>}
    </li>
  }
}

export default class TreeView extends
  React.Component<ITreeViewProps &
    React.HTMLAttributes<HTMLUListElement>>
{
  render(): React.ReactNode {
    return <ul className={classNames("tree-view", this.props.className)}>
      <TreeViewNode
        className="tree-node"
        node={this.props.node} />
    </ul>
  }
}

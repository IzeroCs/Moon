import React from "react"
import classNames from "classnames"

export interface IDropdownEntryItem {
  name: string
  icon?: string
  disabled?: boolean
  divider?: boolean
  subs?: Array<IDropdownSubEntryItem>
}

export interface IDropdownSubEntryItem {
  name: string
  icon?: string
}

export type OnCloseCallback = (entry: IDropdownEntryItem, index: number) => any

interface IDropdownEntryProps extends React.PropsWithChildren {
  index: number
  entry: IDropdownEntryItem
  onClose: OnCloseCallback
}

interface IDropdownProps extends React.PropsWithChildren {
  id: string
  label?: string
  lists?: Array<IDropdownEntryItem>
}

interface IDropdownState {
  isOpen: boolean
}

export class DropdownEntry extends
  React.Component<IDropdownEntryProps &
    React.HTMLAttributes<HTMLDivElement>>
{
  render(): React.ReactNode {
    return <div
      className={classNames("dropdown-item", this.props.className)}
      onClick={this.props.onClose.bind(this, this.props.entry, this.props.index)}
    >{this.props.children}</div>
  }
}

export default class Dropdown extends
  React.Component<IDropdownProps &
    React.HTMLAttributes<HTMLDivElement>, IDropdownState>
{
  constructor(props: IDropdownProps) {
    super(props)
    this.state = { isOpen: false }
  }

  componentDidMount(): void {
    window.addEventListener("click", this.checkClickOn.bind(this))
  }

  componentWillUnmount(): void {
    window.removeEventListener("click", this.checkClickOn)
  }

  dispatchClose() {
    this.setState({ isOpen: false })
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen })
  }

  checkClickOn(event: any) {
    if (!document.getElementById(this.props.id)?.contains(event.target))
      this.dispatchClose()
  }

  onClickEntryItem(entry: IDropdownEntryItem, index: number) {
    if (!entry.subs)
      this.dispatchClose()
  }

  onClickSubEntryItem(event: any,
    entry: IDropdownEntryItem, index: number,
    subEntry: IDropdownSubEntryItem, subIndex: number) {
    this.dispatchClose()
    event.stopPropagation()
    event.preventDefault()
  }

  render(): React.ReactNode {
    return <div id={this.props.id} className={classNames("dropdown",
      this.props.className)}
    >
      <button
        onClick={this.toggle.bind(this)}
        className={classNames({
          "btn": true, "btn-dropdown": true,
          "btn-dropdown-arrow": true, "isActive": this.state.isOpen
        })}
      >
        {this.props.label ? <span>{this.props.label}</span> : this.props.children}
      </button>

      {this.state.isOpen && <div className="dropdown-list">
        {this.props.lists?.map((entry, index) => {
          return <DropdownEntry
            key={index}
            index={index}
            entry={entry}
            onClose={this.onClickEntryItem.bind(this)}
            className={classNames({
              "disabled": entry.disabled,
              "divider": entry.divider,
              "sub": entry.subs
            })}
          >
            <span className={classNames("dropdown-icon", "icomoon",
              !entry.icon ? "ic-zero invisible" : entry.icon)}></span>
            <span className="dropdown-label">{entry.name}</span>
            {entry.subs && <div className="dropdown-sub">
              {entry.subs.map((subEntry, subIndex) => {
                return <div
                  key={subIndex}
                  className="dropdown-sub-item"
                  onClick={(event) => this.onClickSubEntryItem(event,
                    entry, index, subEntry, subIndex)}
                >
                  <span className="dropdown-label">{subEntry.name}</span>
                </div>
              })}
            </div>}
          </DropdownEntry>
        })}
      </div>}
    </div>
  }
}

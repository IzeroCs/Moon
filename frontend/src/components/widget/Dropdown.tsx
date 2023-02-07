import React, { useState, useEffect } from "react"
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

type OnCloseCallback = (entry: IDropdownEntryItem, index: number) => any
type DropdownEntryProps = {
  index: number
  entry: IDropdownEntryItem
  onClose: OnCloseCallback
}
type DropdownProps = {
  id: string
  label?: string
  lists?: Array<IDropdownEntryItem>
}

const DropdownEntry: React.FC<DropdownEntryProps &
  React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    return <div
      className={classNames("dropdown-item", props.className)}
      onClick={props.onClose.bind(this, props.entry, props.index)}
    >{props.children}</div>
  }

const Dropdown: React.FC<DropdownProps &
  React.HTMLAttributes<HTMLDivElement>> = (props) => {
    const [isOpen, setOpen] = useState(false)

    function checkClickOn(event: any) {
      if (!document.getElementById(props.id)?.contains(event.target))
        setOpen(false)
    }

    function toggle() {
      setOpen(!isOpen)
    }

    function onClickEntryItem(entry: IDropdownEntryItem, index: number) {
      if (!entry.subs)
        setOpen(false)
    }

    function onClickSubEntryItem(event: any,
      entry: IDropdownEntryItem, index: number,
      subEntry: IDropdownSubEntryItem, subIndex: number) {
      setOpen(false)
      event.stopPropagation()
      event.preventDefault()
    }

    useEffect(() => {
      window.addEventListener("click", checkClickOn)
      return () => window.removeEventListener("click", checkClickOn)
    })

    return <div id={props.id} className={classNames("dropdown",
      props.className)}
    >
      <button
        onClick={toggle}
        className={classNames({
          "btn": true, "btn-dropdown": true,
          "btn-dropdown-arrow": true, "isActive": isOpen
        })}
      >
        {props.label ? <span>{props.label}</span> : props.children}
      </button>

      {isOpen && <div className="dropdown-list">
        {props.lists?.map((entry, index) => {
          return <DropdownEntry
            key={index}
            index={index}
            entry={entry}
            onClose={onClickEntryItem}
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
                  onClick={(event) => onClickSubEntryItem(event,
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

export default Dropdown

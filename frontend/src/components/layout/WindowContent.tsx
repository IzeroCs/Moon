import React, { useEffect, useRef, useState } from "react"
import classNames from "classnames"

const WindowContent: React.FC<React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    const [contentHeight, setContentHeight] = useState("0px")
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
      const target = wrapperRef.current

      if (target) {
        const parent = target.parentElement!!
        const childCount = parent.childElementCount
        const childElements = parent?.children
        const parentStyle = window.getComputedStyle(parent)

        let child: any
        let childHeight = parseInt(parentStyle
          .paddingTop.replace("px", ""))

        for (let i = 0; i < childCount; ++i) {
          child = childElements[i]

          if (child !== target) {
            childHeight += child.offsetHeight

            const childStyle = window.getComputedStyle(child)
            const childMarginTop = parseInt(childStyle.marginTop.replace("px", ""))
            const childMarginBottom = parseInt(childStyle.marginBottom.replace("px", ""))

            childHeight += childMarginTop + childMarginBottom
          } else {
            break
          }
        }

        setContentHeight("calc(100vh - var(--navigation-height)" +
          " - var(--toolbar-height) - 10px - " + childHeight + "px")
        window.dispatchEvent(new Event("resize"))
      }
    })

    return <div
      className={classNames("window-content-wrapper",
        props.className)}
      style={{ height: contentHeight }}
      ref={wrapperRef}
    >
      <div className="window-content">{props.children}</div>
    </div>
  }

export default WindowContent

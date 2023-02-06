import React from "react"
import classNames from "classnames"

interface IWindowContentProps extends React.PropsWithChildren { }
interface IWindowContentState {
  contentHeight: string
}

export default class WindowContent extends
  React.Component<IWindowContentProps &
    React.HTMLAttributes<HTMLDivElement>, IWindowContentState>
{
  wrapperRef: React.RefObject<HTMLDivElement>

  constructor(props: IWindowContentProps) {
    super(props)
    this.state = { contentHeight: "0px" }
    this.wrapperRef = React.createRef()
  }

  componentDidMount(): void {
    const target = this.wrapperRef.current

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

      this.setState({
        contentHeight: "calc(100vh - var(--navigation-height)" +
          " - var(--toolbar-height) - 10px - " + childHeight + "px"
      })
    }
  }

  render(): React.ReactNode {
    return <div
      className={classNames("window-content-wrapper",
        this.props.className)}
      style={{ height: this.state.contentHeight }}
      ref={this.wrapperRef}
    >
      <div className="window-content">{this.props.children}</div>
    </div>
  }
}

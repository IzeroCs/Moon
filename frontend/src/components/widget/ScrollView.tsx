import React from "react"
import classNames from "classnames"

interface IScrollViewProps extends React.PropsWithChildren {

}

interface IScrollViewState {
  scrollTop: number
  scrollHeight: number
  contentHeight: number
}

export default class ScrollView extends
  React.Component<IScrollViewProps &
    React.HTMLAttributes<HTMLDivElement>, IScrollViewState>
{
  contentRef: React.RefObject<HTMLDivElement>
  scrollRef: React.RefObject<HTMLDivElement>

  constructor(props: IScrollViewProps) {
    super(props)
    this.contentRef = React.createRef()
    this.scrollRef = React.createRef()
    this.state = {
      scrollTop: 0,
      scrollHeight: 0,
      contentHeight: 0
    }
  }

  onScroll(event: Event) {
    this.dispatchScroll(event.target as HTMLDivElement)
  }

  onWindowResize() {
    if (this.contentRef.current)
      this.dispatchScroll(this.contentRef.current)
  }

  dispatchScroll(targetContent: HTMLDivElement) {
    const targetScrollbar = this.scrollRef.current
    const scrollHeight = targetContent.scrollHeight
    const contentHeight = targetContent.getBoundingClientRect().height
    const scrollTopCurrent = targetContent.scrollTop

    console.log("DispatchScroll", targetContent.offsetHeight, scrollHeight, targetContent.clientHeight)
    if (targetScrollbar && contentHeight > 0 && scrollHeight > contentHeight) {
      const scrollTopEnd = scrollHeight - contentHeight
      const scrollbarHeight = Math.floor((contentHeight / scrollHeight) * (contentHeight - 15))
      const scrollbarTopEnd = Math.floor(contentHeight - scrollHeight)

      targetScrollbar.style.height = scrollbarHeight + "px"
      // console.log(scrollTopCurrent, scrollHeight, contentHeight, scrollTopEnd, scrollbarHeight, scrollbarTopEnd)
    }
  }

  componentDidMount(): void {
    if (this.contentRef.current) {
      this.dispatchScroll(this.contentRef.current)
      this.contentRef.current.addEventListener("scroll",
        this.onScroll.bind(this))
    }

    window.addEventListener("resize", this.onWindowResize.bind(this))
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this.onWindowResize)
    this.contentRef.current?.removeEventListener("scroll",
      this.onScroll)
  }

  componentDidUpdate(prevProps: Readonly<IScrollViewProps &
    React.HTMLAttributes<HTMLDivElement>>,
    prevState: Readonly<IScrollViewState>,
    snapshot?: any): void {
    const contentTarget = this.contentRef.current
    if (contentTarget) {
      const contentHeight = contentTarget.getBoundingClientRect().height

      if (contentHeight && prevState.contentHeight != contentHeight) {
        this.setState({
          contentHeight
        })
        this.dispatchScroll(contentTarget)
      }
    }
  }

  render(): React.ReactNode {
    return <div className="scrollview-wrapper">
      <div className="scrollview" ref={this.contentRef}>
        {Array(6).fill(undefined).map((v, i) => {
          return <p key={i}>Line {i} aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
        })}
      </div>
      <div className="scrollview-scrollbar" ref={this.scrollRef}></div>
    </div>
  }
}

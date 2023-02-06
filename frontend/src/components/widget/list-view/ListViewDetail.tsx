import React from "react"
import {
  ListViewAdapter, ListViewColumnSize
} from "../ListViewAdapter"

interface IListViewDetailProps extends React.PropsWithChildren { }
interface IListViewDetailState {
  bodyHeight: number
  scrollbarHeight: number
  scrollbarTop: number
}

export default class ListDetail extends
  ListViewAdapter<IListViewDetailProps &
    React.HTMLAttributes<HTMLTableElement>, IListViewDetailState>
{
  wrapperRef: React.RefObject<HTMLTableElement>
  headerRef: React.RefObject<HTMLTableSectionElement>

  constructor(props: any) {
    super(props)
    this.wrapperRef = React.createRef()
    this.headerRef = React.createRef()
    this.state = {
      bodyHeight: 0,
      scrollbarHeight: 0, scrollbarTop: 0
    }
  }

  dispatchSize() {
    const wrapperHeight = this.wrapperRef.current?.clientHeight
    const wrapperWidth = this.wrapperRef.current?.clientWidth
    const headerHeight = this.headerRef.current?.clientHeight

    if (wrapperHeight && wrapperWidth && headerHeight) {
      this.setState({
        bodyHeight: wrapperHeight - headerHeight
      })
      const child = this.wrapperRef.current?.children[0]
      const bound = child?.getBoundingClientRect()

      console.log(child?.scrollTop)
    }
  }

  wrapper(e: any) {
    const scrollTop = e.target.scrollTop
    const childHeight = e.target.getBoundingClientRect().height
    const scrollHeight = e.target.scrollHeight
    const scrollbarHeight = childHeight - (scrollHeight - childHeight)

    this.setState({ scrollbarHeight: scrollbarHeight, scrollbarTop: scrollTop })
  }

  componentDidMount(): void {
    window.addEventListener("resize", this.dispatchSize.bind(this))
    this.wrapperRef.current?.childNodes[0].addEventListener("scroll", this.wrapper.bind(this))
  }

  componentWillUnmount(): void {
    window.removeEventListener("resize", this.dispatchSize)
    this.wrapperRef.current?.childNodes[0].removeEventListener("scroll", this.wrapper)
  }

  componentDidUpdate(prevProps: Readonly<IListViewDetailProps &
    React.HTMLAttributes<HTMLTableElement>>,
    prevState: Readonly<IListViewDetailState>,
    snapshot?: any): void {
    const wrapperHeight = this.wrapperRef.current?.clientHeight

    if (wrapperHeight && prevState.bodyHeight != wrapperHeight) {
      this.setState({ bodyHeight: wrapperHeight })
    }
  }

  render(): React.ReactNode {
    const listColumnsFilter = this.props.listColumns
      .filter(col => typeof col.isVisible === "undefined" || col.isVisible === true)
    const isHasColumnSizeStretch = listColumnsFilter
      .find(col => col.size == ListViewColumnSize.STRETCH)

    return <div className="list-view-detail">
      <div className="list-view-detail-header-row" ref={this.headerRef}>
        <div className="list-view-detail-header-cell stretch">Name</div>
        <div className="list-view-detail-header-cell small">Size</div>
        <div className="list-view-detail-header-cell medium">FileType</div>
        <div className="list-view-detail-header-cell large">Owner</div>
      </div>
      <div className="list-view-detail-body-wrapper" ref={this.wrapperRef}>
        <div className="list-view-detail-body">
          {Array(6).fill(undefined).map((v, i) => {
            return <div className="list-view-detail-body-row" key={i}>
              <div className="list-view-detail-body-cell stretch">Downloads</div>
              <div className="list-view-detail-body-cell small">Downloads</div>
              <div className="list-view-detail-body-cell medium">Downloads</div>
              <div className="list-view-detail-body-cell large">Downloads</div>
            </div>
          })}
        </div>
        <div className="scrollbar" style={{
          height: this.state.scrollbarHeight + "px",
          top: this.state.scrollbarTop + "px"
        }}></div>
      </div>
    </div>

    // return <table className={classNames("list-view-detail",
    //   this.props.className)} ref={this.wrapperRef}>
    //   <thead className="list-view-detail-head" ref={this.headRef}>
    //     <tr className="list-view-detail-head-row">
    //       {listColumnsFilter.map((col, index) => {
    //         let columnSize = "small"

    //         if ((!isHasColumnSizeStretch && index == 0) ||
    //           col.size == ListViewColumnSize.STRETCH
    //         ) {
    //           columnSize = "stretch"
    //         } else if (col.size == ListViewColumnSize.MEDIUM) {
    //           columnSize = "medium"
    //         } else if (col.size == ListViewColumnSize.LARGE) {
    //           columnSize = "large"
    //         }

    //         return <th key={index} className={classNames("list-view-detail-head-column",
    //           columnSize)}>{col.label}</th>
    //       })}
    //     </tr>
    //   </thead>
    //   <tbody
    //     className="list-view-detail-body"
    //     style={{
    //       width: this.state.bodyWidth + "px",
    //       height: this.state.bodyHeight + "px"
    //     }}
    //   >
    //     {Array(100).fill(undefined).map((v, i) => {
    //       return <tr className="list-view-detail-body-row" key={i}>
    //         <td className="list-view-detail-body-column">Downloads</td>
    //         <td className="list-view-detail-body-column"></td>
    //         <td className="list-view-detail-body-column">Directory</td>
    //         <td className="list-view-detail-body-column">IzeroCs</td>
    //       </tr>
    //     })}
    //   </tbody>
    // </table>
  }
}

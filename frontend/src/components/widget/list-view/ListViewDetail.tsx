import React from "react"
import Scrollbar from "react-perfect-scrollbar"
import classNames from "classnames"
import {
  ListViewAdapter,
  ListViewColumnSize
} from "../ListViewAdapter"

interface IListViewDetailProps extends React.PropsWithChildren { }
interface IListViewDetailState { }

export default class ListDetail extends
  ListViewAdapter<IListViewDetailProps &
    React.HTMLAttributes<HTMLTableElement>, IListViewDetailState>
{
  render(): React.ReactNode {
    const listColumnsFilter = this.props.listColumns
      .filter(col => typeof col.isVisible === "undefined" || col.isVisible === true)
    const isHasColumnSizeStretch = listColumnsFilter
      .find(col => col.size === ListViewColumnSize.STRETCH)

    return <div className="list-view-detail">
      <div className="list-view-detail-header-row">
        {listColumnsFilter.map((col, index) => {
          let columnSize = "small"

          if ((!isHasColumnSizeStretch && index === 0) ||
            col.size === ListViewColumnSize.STRETCH
          ) {
            columnSize = "stretch"
          } else if (col.size === ListViewColumnSize.MEDIUM) {
            columnSize = "medium"
          } else if (col.size === ListViewColumnSize.LARGE) {
            columnSize = "large"
          }

          return <div key={index} className={classNames("list-view-detail-header-cell",
            columnSize)}>{col.label}</div>
        })}
      </div>
      <Scrollbar>
        <div className="list-view-detail-body">
          {Array(60).fill(undefined).map((v, i) => {
            return <div className="list-view-detail-body-row" key={i}>
              <div className="list-view-detail-body-cell stretch">Downloads</div>
              <div className="list-view-detail-body-cell small">Downloads</div>
              <div className="list-view-detail-body-cell medium">Downloads</div>
              <div className="list-view-detail-body-cell large">Downloads</div>
            </div>
          })}
        </div>
      </Scrollbar>
    </div>
  }
}

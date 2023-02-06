import React from "react"
import { ListViewColumns } from "./ListViewAdapter"
import ListViewDetail from "./list-view/ListViewDetail"

interface IListViewProps extends React.PropsWithChildren {
  type?: ListViewType
  listColumns: Array<ListViewColumns>
}

export enum ListViewType {
  LIST_DETAIL = 0,
  GRID_SMALL_ICON = 1,
  GRID_MEDIUM_ICON = 2,
  GRID_LARGE_ICON = 3
}

export default class ListView extends
  React.Component<IListViewProps &
    React.HTMLAttributes<HTMLTableElement>>
{
  getListViewType(): ListViewType {
    if (typeof this.props.type === "undefined")
      return ListViewType.LIST_DETAIL
    return this.props.type
  }

  render(): React.ReactNode {
    return <ListViewDetail
      listView={this}
      listColumns={this.props.listColumns} />
  }
}

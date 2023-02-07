import React from "react"
import {
  ListViewColumns,
  ListViewType
} from "./list-view/ListViewAdapter"
import ListViewDetail from "./list-view/ListViewDetail"

type ListViewProps = {
  type?: ListViewType
  listColumns: Array<ListViewColumns>
}

const ListView: React.FC<ListViewProps &
  React.HTMLAttributes<HTMLDivElement>> =
  (props) => {
    return <ListViewDetail listColumns={props.listColumns} />
  }

export default ListView

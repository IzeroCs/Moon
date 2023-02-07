import React from "react"

export type ListViewColumns = {
  label: string
  isVisible?: boolean
  size?: ListViewColumnSize
}

export enum ListViewColumnSize {
  SMALL = 0, MEDIUM = 1, LARGE = 2, STRETCH = 3
}

export enum ListViewType {
  LIST_DETAIL = 0,
  GRID_SMALL_ICON = 1,
  GRID_MEDIUM_ICON = 2,
  GRID_LARGE_ICON = 3
}

interface IListViewAdapterProps extends React.PropsWithChildren {
  listColumns: Array<ListViewColumns>
}

export type ListViewAdapter<Props = {}> = React
  .FC<IListViewAdapterProps & Props>

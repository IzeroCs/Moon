import React from "react"
import ListView from "./ListView"

export interface ListViewColumns {
  label: string
  isVisible?: boolean
  size?: ListViewColumnSize
}

export enum ListViewColumnSize {
  SMALL = 0, MEDIUM = 1, LARGE = 2, STRETCH = 3
}

interface IListViewAdapterProps extends React.PropsWithChildren {
  listView: ListView
  listColumns: Array<ListViewColumns>
}

export abstract class ListViewAdapter<AdapterProps = {}, AdapterState = {}> extends
  React.Component<IListViewAdapterProps & AdapterProps, AdapterState>
{ }

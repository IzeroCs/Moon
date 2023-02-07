import React from "react"
import WindowLayout from "../layout/WindowLayout"
import WindowContent from "../layout/WindowContent"
import SidebarLayout from "../layout/SidebarLayout"
import SidebarContent from "../layout/SidebarContent"
import TreeView from "../widget/TreeView"
import { ToolbarLayout, ToolbarCell } from "../layout/ToolbarLayout"
import { ButtonIcon, ButtonText } from "../widget/Button"
import Breadcrumb from "../widget/Breadcrumb"
import Dropdown from "../widget/Dropdown"
import ListView from "../widget/ListView"
import IconFolder from "../../assets/icon/svg/icon-folder.svg"
import TreeViewData from "../../tree-view.json"
import BreadcrumbData from "../../breadcrumb.json"
import DropdownData from "../../dropdown.json"
import { ListViewColumnSize } from "../widget/list-view/ListViewAdapter"

const listColumnsData = [
  { label: "Name" },
  { label: "Size" },
  { label: "FileType", size: ListViewColumnSize.MEDIUM },
  { label: "Owner", size: ListViewColumnSize.LARGE }
]

const FileStation: React.FC =
  () => {
    return <WindowLayout
      icon={IconFolder}
      title="File Staion"
    >
      <SidebarLayout>
        <TreeView node={TreeViewData} />
      </SidebarLayout>
      <SidebarContent>
        <ToolbarLayout>
          <ToolbarCell>
            <ButtonIcon icon="ic-arrow-back"></ButtonIcon>
            <ButtonIcon icon="ic-arrow-forward"></ButtonIcon>
          </ToolbarCell>
          <ToolbarCell>
            <ButtonIcon icon="ic-refresh"></ButtonIcon>
          </ToolbarCell>
          <ToolbarCell className="stretch">
            <Breadcrumb lists={BreadcrumbData} />
          </ToolbarCell>
          <ToolbarCell>
            <input
              type="text"
              className="toolbar-input"
              placeholder="Search" />
          </ToolbarCell>
        </ToolbarLayout>
        <ToolbarLayout>
          <ToolbarCell>
            <Dropdown id="create-dropdown" lists={DropdownData} label="Create" />
          </ToolbarCell>
          <ToolbarCell>
            <Dropdown id="upload-dropdown" lists={DropdownData} label="Upload" />
          </ToolbarCell>
          <ToolbarCell>
            <Dropdown id="action-dropdown" lists={DropdownData} label="Action" />
          </ToolbarCell>
          <ToolbarCell>
            <Dropdown id="tools-dropdown" lists={DropdownData} label="Tools" />
          </ToolbarCell>
          <ToolbarCell>
            <ButtonText>Settings</ButtonText>
          </ToolbarCell>
        </ToolbarLayout>
        <WindowContent>
          <ListView listColumns={listColumnsData} />
        </WindowContent>
      </SidebarContent>
    </WindowLayout>
  }

export default FileStation

<script>
  import Window from "@/components/window/Window"
  import WindowContent from "@/components/window/WindowContent"
  import SidebarLayout from "@/components/sidebar/SidebarLayout"
  import SidebarContent from "@/components/sidebar/SidebarContent"
  import TreeView from "@/components/tree/TreeView"
  import Toolbar from "@/components/toolbar/Toolbar"
  import ToolbarRow from "@/components/toolbar/ToolbarRow"
  import ToolbarCell from "@/components/toolbar/ToolbarCell"
  import Breadcrumb from "@/components/breadcrumb/Breadcrumb"
  import Dropdown from "@/components/dropdown/Dropdown"
  import ButtonText from "@/components/button/ButtonText"

  const breadcrumbData = [
    "Home", "Directory", "File"
  ]

  const dropdownData = [
    { title: "Create directory", icon: "ic-folder", disable: true },
    { title: "About current directory", disable: false, divider: true },
    { title: "Create shared folder" },
    { title: "Mount", disable: false, sub: [
      { title: "Mount disk" },
      { title: "Mount network" },
      { title: "Mount domain", disable: true }
    ]}
  ]

  export default {
    name: "FileStation",

    data() {
      return { breadcrumbData, dropdownData }
    },

    components: { Window, WindowContent, SidebarContent, SidebarLayout,
      TreeView, Toolbar, ToolbarRow, ToolbarCell, Breadcrumb,
      Dropdown, ButtonText }
  }
</script>

<template>
  <Window title="FileStation"
    icon="/public/icon/svg/icon-folder.svg"
    enableSidebar
  >
    <SidebarLayout>
      <TreeView></TreeView>
    </SidebarLayout>
    <SidebarContent>
      <Toolbar>
        <ToolbarRow>
          <ToolbarCell>
            <button class="icomoon ic-arrow-back toolbar-button"></button>
            <button class="icomoon ic-arrow-forward toolbar-button"></button>
          </ToolbarCell>
          <ToolbarCell>
            <button class="icomoon ic-refresh toolbar-button"></button>
          </ToolbarCell>
          <ToolbarCell class="stretch">
            <Breadcrumb v-bind:lists="breadcrumbData"/>
          </ToolbarCell>
          <ToolbarCell>
            <input type="text" value="" class="toolbar-input" placeholder="Search"/>
          </ToolbarCell>
        </ToolbarRow>
        <ToolbarRow>
          <ToolbarCell>
            <Dropdown id="create-dropdown" v-bind:lists="dropdownData">
              <span>Create</span>
            </Dropdown>
          </ToolbarCell>
          <ToolbarCell>
            <Dropdown id="upload-dropdown" v-bind:lists="dropdownData">
              <span>Upload</span>
            </Dropdown>
          </ToolbarCell>
          <ToolbarCell>
            <Dropdown id="action-dropdown" v-bind:lists="dropdownData">
              <span>Action</span>
            </Dropdown>
          </ToolbarCell>
          <ToolbarCell>
            <Dropdown id="tool-dropdown" v-bind:lists="dropdownData">
              <span>Tools</span>
            </Dropdown>
          </ToolbarCell>
          <ToolbarCell>
            <ButtonText>Settings</ButtonText>
          </ToolbarCell>
        </ToolbarRow>
      </Toolbar>
      <WindowContent>
        <p v-for="index in 100" v-bind:key="index">
          Line index {{ index }}
        </p>
      </WindowContent>
    </SidebarContent>
  </Window>
</template>

<script>
  import Window from "@/components/window/Window"
  import WindowContent from "@/components/window/WindowContent"
  import SidebarLayout from "@/components/sidebar/SidebarLayout"
  import SidebarContent from "@/components/sidebar/SidebarContent"
  import TreeView from "@/components/tree/TreeView"
  import Toolbar from "@/components/toolbar/Toolbar"
  import ToolbarCell from "@/components/toolbar/ToolbarCell"
  import Breadcrumb from "@/components/breadcrumb/Breadcrumb"
  import Dropdown from "@/components/dropdown/Dropdown"
  import ButtonText from "@/components/button/ButtonText"
  import ButtonIcon from "@/components/button/ButtonIcon"

  const breadcrumbData = [
    "Home", "Directory", "File"
  ]

  const dropdownData = [
    { title: "Create directory", icon: "ic-folder", disable: false },
    { title: "About current directory", disable: true, divider: true },
    { title: "Create shared folder", icon: "ic-search" },
    { title: "Mount", disable: false, icon: "ic-about", sub: [
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
      TreeView, Toolbar, ToolbarCell, Breadcrumb, Dropdown, ButtonText,
      ButtonIcon }
  }
</script>

<template>
  <Window title="FileStation"
    icon="/icon/svg/icon-folder.svg"
    enableSidebar
  >
    <SidebarLayout>
      <TreeView></TreeView>
    </SidebarLayout>
    <SidebarContent>
      <Toolbar>
        <ToolbarCell>
          <ButtonIcon icon="ic-arrow-back"></ButtonIcon>
          <ButtonIcon icon="ic-arrow-forward"></ButtonIcon>
        </ToolbarCell>
        <ToolbarCell>
          <ButtonIcon icon="ic-refresh"></ButtonIcon>
        </ToolbarCell>
        <ToolbarCell class="stretch">
          <Breadcrumb v-bind:lists="breadcrumbData"/>
        </ToolbarCell>
        <ToolbarCell>
          <input type="text" value="" class="toolbar-input" placeholder="Search"/>
        </ToolbarCell>
      </Toolbar>
      <Toolbar>
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
      </Toolbar>
      <WindowContent>
        <p v-for="index in 100" v-bind:key="index">
          Line index {{ index }}
        </p>
      </WindowContent>
    </SidebarContent>
  </Window>
</template>

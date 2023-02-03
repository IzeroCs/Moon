<script lang="ts">
  import { defineComponent } from "vue"
  import WindowLayout from "../layout/WindowLayout.vue"
  import WindowContent from "../layout/WindowContent.vue"
  import SidebarLayout from "../layout/SidebarLayout.vue"
  import SidebarContent from "../layout/SidebarContent.vue"
  import TreeView from "../view/TreeView.vue"
  import ToolbarLayout from "../layout/ToolbarLayout.vue"
  import ToolbarCell from "../item/ToolbarCell.vue"
  import ButtonIcon from "../view/ButtonIcon.vue"
  import ButtonText from "../view/ButtonText.vue"
  import BreadcrumbLayout from "../layout/BreadcrumbLayout.vue"
  import DropdownLayout from "../layout/DropdownLayout.vue"
  import { IDropdownEntry } from "../item/DropdownItem.vue"

  const breadcrumbData = [
    "Home", "Directory", "File"
  ]

  const dropdownData: Array<IDropdownEntry> = [
    { title: "Create directory", icon: "ic-folder", disabled: false },
    { title: "About current directory", disabled: true, divider: true },
    { title: "Create shared folder", icon: "ic-search" },
    { title: "Mount", disabled: false, icon: "ic-about", sub: [
      { title: "Mount disk" },
      { title: "Mount network" },
      { title: "Mount domain", disabled: true }
    ]}
  ]

  export default defineComponent({
    data() {
      return { breadcrumbData, dropdownData }
    },

    components: { WindowLayout, WindowContent, SidebarLayout, SidebarContent,
      TreeView, ToolbarLayout, ToolbarCell, ButtonIcon, ButtonText,
      BreadcrumbLayout, DropdownLayout }
  })
</script>

<template>
  <WindowLayout title="FileStation"
    icon="/icon/svg/icon-folder.svg"
    enableSidebar
  >
    <SidebarLayout>
      <TreeView></TreeView>
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
        <ToolbarCell class="stretch">
          <BreadcrumbLayout v-bind:lists="breadcrumbData"/>
        </ToolbarCell>
        <ToolbarCell>
          <input type="text" value="" class="toolbar-input" placeholder="Search"/>
        </ToolbarCell>
      </ToolbarLayout>
      <ToolbarLayout>
        <ToolbarCell>
          <DropdownLayout id="create-dropdown" v-bind:lists="dropdownData">
            <span>Create</span>
          </DropdownLayout>
        </ToolbarCell>
        <ToolbarCell>
          <DropdownLayout id="upload-dropdown" v-bind:lists="dropdownData">
            <span>Upload</span>
          </DropdownLayout>
        </ToolbarCell>
        <ToolbarCell>
          <DropdownLayout id="action-dropdown" v-bind:lists="dropdownData">
            <span>Action</span>
          </DropdownLayout>
        </ToolbarCell>
        <ToolbarCell>
          <DropdownLayout id="tool-dropdown" v-bind:lists="dropdownData">
            <span>Tools</span>
          </DropdownLayout>
        </ToolbarCell>
        <ToolbarCell>
          <ButtonText>Settings</ButtonText>
        </ToolbarCell>
      </ToolbarLayout>
      <WindowContent>
        <p v-for="index in 100" v-bind:key="index">
          Line index {{ index }}
        </p>
      </WindowContent>
    </SidebarContent>
  </WindowLayout>
</template>

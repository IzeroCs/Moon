<script>
  import Window from "@/components/Window"
  import SidebarLayout from "@/components/sidebar/SidebarLayout"
  import SidebarContent from "@/components/sidebar/SidebarContent"
  import TreeView from "@/components/tree/TreeView"

  export default {
    name: "FileStation",

    components: { Window, SidebarContent, SidebarLayout, TreeView }
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
      SidebarContent
    </SidebarContent>
  </Window>
</template>

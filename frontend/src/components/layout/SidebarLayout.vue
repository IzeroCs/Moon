<script lang="ts">
  import { Options, Vue } from "vue-class-component"

  @Options({})

  export default class SidebarLayout extends Vue {}
</script>

<template>
  <div class="window-sidebar-layout">
    <slot/>
  </div>
</template>

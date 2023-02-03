<script lang="ts">
  import { Options, Vue } from "vue-class-component"

  @Options({})

  export default class SidebarContent extends Vue {}
</script>

<template>
  <div class="window-sidebar-content">
    <slot/>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({})
</script>

<template>
  <table class="toolbar-layout">
    <tr class="toolbar-row">
      <slot/>
    </tr>
  </table>
</template>

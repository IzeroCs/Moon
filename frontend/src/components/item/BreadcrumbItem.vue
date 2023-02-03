<script lang="ts">
  import { defineComponent } from "vue"

  export default defineComponent({
    props: {
      item: { type: String, required: true }
    }
  })
</script>

<template>
  <li class="breadcrumb-item">
    <span class="breadcrumb-label">{{ item }}</span>
  </li>
</template>

<script lang="ts">
  import { defineComponent, PropType } from "vue"
  import BreadcrumbItem from "../item/BreadcrumbItem.vue"

  export default defineComponent({
    props: {
      lists: { type: Object as PropType<Array<string>> }
    },

    components: { BreadcrumbItem }
  })
</script>

<template>
  <ul class="breadcrumb">
    <BreadcrumbItem
      v-for="(item, index) in lists"
      v-bind:key="index"
      v-bind:item="item"/>
  </ul>
</template>

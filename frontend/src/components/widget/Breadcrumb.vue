<script>
  import BreadcrumbItem from "../item/BreadcrumbItem.vue"

  export default {
    name: "Breadcrumb",
    props: {
      lists: Array
    },

    components: { BreadcrumbItem }
  }
</script>

<template>
  <ul class="breadcrumb">
    <BreadcrumbItem
      v-for="(item, index) in lists"
      v-bind:key="index"
      v-bind:item="item"/>
  </ul>
</template>

<script>
  export default {
    name: "BreadcrumbItem",
    props: {
      item: { type: String, required: true }
    }
  }
</script>

<template>
  <li class="breadcrumb-item">
    <span class="breadcrumb-label">{{ item }}</span>
  </li>
</template>

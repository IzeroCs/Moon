<script>
  export default {
    name: "ButtonIcon",
    props: {
      icon: { type: String, required: true }
    }
  }
</script>

<template>
  <button
    type="button"
    class="btn btn-icon icomoon"
    v-bind:class="icon"
  ></button>
</template>

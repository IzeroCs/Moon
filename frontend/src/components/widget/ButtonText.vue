<script>
  export default {
    name: "ButtonText",
    props: {
      icon: String
    }
  }
</script>

<template>
  <button class="btn btn-text" type="button">
    <span
      class="btn-icon icomoon"
      v-bind:class="icon"
      v-if="icon"
    ></span>
    <slot/>
  </button>
</template>

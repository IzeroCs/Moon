<script>
  export default {
    name: "ButtonText",
    props: {
      icon: String
    }
  }
</script>

<template>
  <div class="btn btn-text">
    <span
      class="btn-icon icomoon"
      v-bind:class="icon"
      v-if="icon"
    ></span>
    <button type="button"><slot/></button>
  </div>
</template>

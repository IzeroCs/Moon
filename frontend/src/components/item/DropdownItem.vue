<script>
  export default {
    name: "DropdownItem",
    props: {
      index: { type: Number, required: true },
      item: { type: Object, required: true },
      close: { type: Function, default: () => {} }
    },

    methods: {
      click() {
        this.close(this.item, this.index)
      }
    }
  }
</script>

<template>
  <div class="dropdown-item" v-on:click="click">
    <slot/>
  </div>
</template>

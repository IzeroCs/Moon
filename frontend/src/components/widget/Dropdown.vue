<script>
  import DropdownItem from "../item/DropdownItem.vue"

  export default {
    name: "Dropdown",
    components: { DropdownItem },
    props: {
      id: { type: String, required: true },
      lists: { type: Array, default: () => [] }
    },

    created() {
      window.addEventListener("click", this.checkClickOn)
    },

    beforeUnmount() {
      window.removeEventListener("click", this.checkClickOn)
    },

    data() {
      return { isOpen: false }
    },

    methods: {
      clickItem(item, index) {
        if (!item.sub) {
          this.isOpen = false
        }
      },

      clickSubItem(item, index, subItem, subIndex) {
        this.isOpen = false
      },

      checkClickOn(event) {
        if (!document.getElementById(this.id).contains(event.target))
          this.isOpen = false
      }
    }
  }
</script>

<template>
  <div v-bind:id="id" class="dropdown">
    <button
      class="btn btn-dropdown btn-dropdown-arrow"
      v-on:click="isOpen = !isOpen"
      v-bind:class="{ isActive: isOpen }"
    >
      <slot/>
    </button>
    <div class="dropdown-list" v-if="isOpen">
      <DropdownItem
        v-for="(item, index) in lists"
        v-bind:key="index"
        v-bind:index="index"
        v-bind:item="item"
        v-bind:close="clickItem"
        v-bind:class="{
          disabled: item.disable,
          divider: item.divider,
          sub: item.sub
        }"
      >
        <span class="dropdown-icon icomoon" v-bind:class="item.icon" v-if="item.icon"></span>
        <span class="dropdown-icon icomoon ic-zero invisible" v-else></span>
        <span class="dropdown-label">{{ item.title }}</span>

        <div v-if="item.sub" class="dropdown-sub">
          <div
            class="dropdown-sub-item"
            v-for="(subItem, subIndex) in item.sub"
            v-bind:key="subIndex"
            v-on:click.stop.prevent="clickSubItem(item, index, subItem, subIndex)"
          >
            <span class="dropdown-label">{{ subItem.title }}</span>
          </div>
        </div>
      </DropdownItem>
    </div>
  </div>
</template>

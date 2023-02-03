<script lang="ts">
  import { defineComponent, PropType } from "vue"
  import DropdownItem, {
    IDropdownEntry,
    IDropdownEntrySub
  } from "../item/DropdownItem.vue"

  export default defineComponent({
    components: { DropdownItem },
    props: {
      id: { type: String, required: true },
      lists: { type: Object as PropType<Array<IDropdownEntry>>, default: () => [] }
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
      clickItem(item: IDropdownEntry, index: number) {
        if (!item.sub) {
          this.isOpen = false
        }
      },

      clickSubItem(item: IDropdownEntry, index: number,
        subItem: IDropdownEntrySub, subIndex: number
      ) {
        this.isOpen = false
      },

      checkClickOn(event: any) {
        if (!document.getElementById(this.id)?.contains(event.target))
          this.isOpen = false
      }
    }
  })
</script>

<template>
  <div v-bind:id="id" class="dropdown-layout">
    <button
      class="btn btn-dropdown btn-dropdown-arrow"
      v-on:click="isOpen = !isOpen"
      v-bind:class="{ isActive: isOpen }"
    >
      <slot/>
    </button>
    <div class="dropdown-list" v-if="isOpen">
      <DropdownItem
        v-for="(entry, index) in lists"
        v-bind:key="index"
        v-bind:index="index"
        v-bind:item="entry"
        v-bind:close="clickItem"
        v-bind:class="{
          disabled: entry.disabled,
          divider: entry.divider,
          sub: entry.sub
        }"
      >
        <span class="dropdown-icon icomoon" v-bind:class="entry.icon" v-if="entry.icon"></span>
        <span class="dropdown-icon icomoon ic-zero invisible" v-else></span>
        <span class="dropdown-label">{{ entry.title }}</span>

        <div v-if="entry.sub" class="dropdown-sub">
          <div
            class="dropdown-sub-item"
            v-for="(subEntry, subIndex) in entry.sub"
            v-bind:key="subIndex"
            v-on:click.stop.prevent="clickSubItem(entry, index, subEntry, subIndex)"
          >
            <span class="dropdown-label">{{ subEntry.title }}</span>
          </div>
        </div>
      </DropdownItem>
    </div>
  </div>
</template>

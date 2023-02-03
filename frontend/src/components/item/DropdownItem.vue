<script lang="ts">
  import { defineComponent, PropType } from "vue"

  export interface IDropdownEntry {
    title: string
    icon?: string
    disabled?: boolean
    divider?: boolean
    sub?: Array<IDropdownEntrySub>
  }

  export interface IDropdownEntrySub {
    title: string
    disabled?: boolean
  }

  export default defineComponent({
    props: {
      index: { type: Number, required: true },
      item: { type: Object as PropType<IDropdownEntry>, required: true },
      close: { type: Function, default: (item: IDropdownEntry, index: number) => {} }
    },

    methods: {
      click() {
        this.close(this.item, this.index)
      }
    }
  })
</script>

<template>
  <div class="dropdown-item" v-on:click="click">
    <slot/>
  </div>
</template>

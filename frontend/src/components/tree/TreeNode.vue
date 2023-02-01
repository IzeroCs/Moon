<script>
  export default {
    name: "TreeNode",
    props: {
      node: Object,
      isActive: { type: Boolean }
    },

    data() {
      return {
        isOpen: false
      }
    },

    created() {
      this.isOpen = typeof this.node.isActive !== "undefined" &&
        this.node.isActive
    },

    computed: {
      isParent() {
        return this.node.node && this.node.node.length
      }
    },

    methods: {
      toggle() {
        this.isOpen = !this.isOpen
      }
    }
  }
</script>

<template>
  <li>
    <div class="tree-node-title">
      <span
        class="tree-node-icon icomoon"
        v-on:click="toggle"
        v-bind:class="{
          'ic-arrow-fill-right': !isOpen,
          'ic-arrow-fill-down': isOpen
        }"
      ></span>
      <span class="tree-node-label">{{ node.name }}</span>
    </div>
    <ul v-show="isOpen" v-if="isParent">
      <TreeNode
        class="tree-node"
        v-for="(node, index) in node.node"
        v-bind:key="index"
        v-bind:node="node"
      ></TreeNode>
    </ul>
  </li>
</template>

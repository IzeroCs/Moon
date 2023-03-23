<script>
  import TreeNode from "@/components/tree/TreeNode"

  var treeData = {
    name: "My Tree",
    isActive: true,
    node: [
      { name: "Hello", isActive: false },
      {
        name: "Child folder",
        isActive: false,
        node: [{
          name: "Sub child",
          isActive: true,
          node: [{
            name: "Sub sub child",
            isActive: true,
            node: [{
              name: "In sub sub sub",
              isActive: true,
              node: [{
                name: "Out sub sub",
                isActive: false,
                node: [{
                  name: "Out sub sub",
                  isActive: true,
                  node: [{
                    name: "Out sub sub",
                    isActive: true,
                    node: [{
                      name: "Out sub sub",
                      isActive: true,
                      node: [{
                        name: "Out sub sub",
                        isActive: true,
                        node: [{
                          name: "Out sub sub",
                          isActive: true,
                          node: [{
                            name: "Out sub sub",
                            isActive: true,
                            node: [{
                              name: "Out sub sub",
                              isActive: true,
                              node: [{
                                name: "Out sub sub",
                                isActive: true,
                                node: [{
                                  name: "Out sub sub",
                                  isActive: true,
                                  node: [{
                                    name: "Out sub sub",
                                    isActive: true,
                                    node: [{
                                      name: "Out sub sub",
                                      isActive: true,
                                      node: [{
                                        name: "Out sub sub",
                                        isActive: true,
                                        node: [{
                                          name: "Out sub sub",
                                          isActive: true
                                        }]
                                      }]
                                    }]
                                  }]
                                }]
                              }]
                            }]
                          }]
                        }]
                      }]
                    }]
                  }]
                }]
              }]
            }]
          }]
        }]
      },
      {
        name: "Three child",
        isActive: false,
        node: [
          { name: "Test" },
          { name: "Sub test" }
        ]
      }
    ]
  }
  export default {
    name: "TreeView",
    props: {
      lists: { type: Object }
    },

    components: { TreeNode },

    data() {
      return { treeData }
    }
  }
</script>

<template>
  <ul class="tree-view">
    <TreeNode
      class="tree-node"
      v-bind:node="treeData"
    ></TreeNode>
  </ul>
</template>

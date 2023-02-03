<script lang="ts">
  import { Options, Vue } from "vue-class-component"

  @Options({
    data() {
      return { contentHeight: 0 }
    },

    mounted() {
      const target = this.$refs.windowContentWrapper
      const parent = target.parentElement
      const childCount = parent.childElementCount
      const childElements = parent.children
      const parentStyle = parent.currentStyle || window.getComputedStyle(parent)

      let child
      let childHeight = parseInt(parentStyle
        .paddingTop.replace("px", ""))

      for (let i = 0; i < childCount; ++i) {
        child = childElements[i]

        if (child != target) {
          childHeight += child.offsetHeight

          const childStyle = child.currentStyle || window.getComputedStyle(child)
          const childMarginTop = parseInt(childStyle.marginTop.replace("px", ""))
          const childMarginBottom = parseInt(childStyle.marginBottom.replace("px", ""))

          childHeight += childMarginTop + childMarginBottom
        } else {
          break
        }
      }

      this.contentHeight = "calc(100vh - var(--navigation-height)" +
        " - var(--toolbar-height) - 10px - " + childHeight + "px"
    }
  })

  export default class WindowContent extends Vue {
    public contentHeight?: number
  }
</script>

<template>
  <div
    class="window-content-wrapper"
    ref="windowContentWrapper"
    v-bind:style="{ height: contentHeight }"
  >
    <div class="window-content"><slot/></div>
  </div>
</template>

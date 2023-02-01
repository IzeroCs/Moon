<script>
  export default {
    name: "WindowContent",

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

      console.log(childHeight)

      this.contentHeight = "calc(100vh - var(--navigation-height)" +
        " - var(--toolbar-height) - 10px - " + childHeight + "px"
    }
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

<style lang="scss">
  @import "./sass/app.scss";
</style>

<script lang="ts">
  import { defineComponent } from "vue"
  import { mapState, Store } from "vuex"
  import { Types } from "./store/types/Types"
  import Navigation from "./components/view/Navigation.vue"
  import DesktopGrid from "./components/apps/DesktopGrid.vue"
  import FileStation from "./components/apps/FileStation.vue"

  const clientWidth = () => document.documentElement.clientWidth
  const clientHeight = () => document.documentElement.clientHeight

  export default defineComponent({
    data() {
      return {
        windowWidth: clientWidth(),
        windowHeight: clientHeight(),
      }
    },

    components: { Navigation, DesktopGrid, FileStation },

    computed: {
      isAuthentic: {
        get() {
          return this.$store.state.isAuthentic
        },
        set() {}
      }
    },

    methods: {
      dispatchDimensions() {
        this.windowWidth = clientWidth()
        this.windowHeight = clientHeight()
      }
    },

    mounted() { window.addEventListener("resize", this.dispatchDimensions) },
    unmounted() { window.removeEventListener("resize", this.dispatchDimensions) }
  })
</script>

<template>
  <div class="bg-cover" v-bind:style="{ height: windowHeight + 'px' }">
    <div class="bg-overlay"></div>
    <Navigation v-show="isAuthentic"/>
    <div class="container-wrapper">
      <DesktopGrid v-if="isAuthentic"/>
      <FileStation v-if="isAuthentic"/>
    </div>
  </div>
</template>

<style lang="scss">
  @import "@/sass/app.scss";
</style>

<script>
  import DesktopGrid from "./components/DesktopGrid.vue"
  import Navigation from "./components/Navigation.vue"
  import FileStation from "./components/FileStation.vue"
  import { mapState } from "vuex"

  const clientWidth = () => document.documentElement.clientWidth
  const clientHeight = () => document.documentElement.clientHeight

  export default {
      name: "App",

      components: {
          DesktopGrid, Navigation, FileStation
      },

      computed: {
        ...mapState({
          isAuthentic: state => state.authenticate.isAuthentic
        })
      },

      data: () => {
          return {
              windowWidth: clientWidth(),
              windowHeight: clientHeight()
          }
      },

      methods: {
          dispatchDimensions() {
              this.windowWidth = clientWidth();
              this.windowHeight = clientHeight();
          }
      },

      mounted() {
          window.addEventListener("resize", this.dispatchDimensions)
      },

      unmounted() {
          window.removeEventListener("resize", this.dispatchDimensions);
      }
  }
</script>

<template>
  <div class="bg-cover" v-bind:style="{ height: windowHeight + 'px' }">
    <div class="bg-overlay"></div>
    <Navigation />
    <div class="container-wrapper">
      <DesktopGrid v-if="isAuthentic"/>
      <FileStation v-if="isAuthentic"/>
    </div>
  </div>
</template>

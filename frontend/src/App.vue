<style lang="scss">
  @import "@/sass/app.scss";
</style>

<script>
  import App from "./App"
  export default App;
</script>

<template>
  <div class="bg-cover" v-bind:style="{ height: windowHeight + 'px' }">
    <div class="bg-overlay"></div>
    <Navigation />
    <div class="container-wrapper">
      <DesktopGrid />
      <FileStation />
    </div>
  </div>
</template>

<script>
  export default {
    name: "Window",
    props: {
      icon: { type: String },
      title: { type: String, required: true },
      actionHelp: { type: Boolean },
      actionMinimize: { type: Boolean, default: true },
      actionRestore: { type: Boolean, default: true },
      actionClose: { type: Boolean, default: true },
      enableSidebar: { type: Boolean }
    }
  }
</script>

<template>
  <div class="window">
    <div class="window-titlebars">
      <div class="window-titlebars-title">
        <img v-bind:src="icon"
            class="window-titlebars-icon"
            v-bind:alt="title"/>
        <span class="window-titlebars-label">{{ title }}</span>
      </div>
      <div class="window-titlebars-button">
        <button
          v-if="actionHelp"
          class="window-titlebars-button-item icomoon ic-about"
          data-action="help"
        ></button>
        <button
          v-if="actionMinimize"
          class="window-titlebars-button-item icomoon ic-window-minimize"
          data-action="minimize"
        ></button>
        <button
          v-if="actionRestore"
          class="window-titlebars-button-item icomoon ic-window-restore"
          data-action="restore"
        ></button>
        <button
          v-if="actionClose"
          class="window-titlebars-button-item icomoon ic-window-close"
          data-action="close"
        ></button>
      </div>
    </div>
    <div class="window-container window-sidebar-container">
      <slot/>
    </div>
  </div>
</template>

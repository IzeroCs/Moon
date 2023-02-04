<script>
    export default {
        name: "DesktopGrid"
    }
</script>

<template>
    <ul class="desktop-grid">
    <li class="desktop-grid-item" data-item="file-station">
        <img src="/icon/svg/icon-folder.svg" class="desktop-grid-icon" alt="Folder" />
        <p class="desktop-grid-label">File Station</p>
    </li>
    <li class="desktop-grid-item" data-item="setting">
        <img src="/icon/svg/icon-setting.svg" class="desktop-grid-icon" alt="Setting" />
        <p class="desktop-grid-label">Setting</p>
    </li>
    <li class="desktop-grid-item" data-item="about">
        <img src="/icon/svg/icon-about.svg" class="desktop-grid-icon" alt="About" />
        <p class="desktop-grid-label">About</p>
    </li>
    </ul>
</template>

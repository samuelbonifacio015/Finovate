<script setup>

const topbarImage = () => {
  return 'public/finovate.png'
}

const emit = defineEmits(['menu-toggle'])

const onMenuToggle = () => {
  emit('menu-toggle')
}

const onProfileMenuToggle = () => {
  // Placeholder for profile menu toggle logic
}

</script>

<template>
  <div class="layout-topbar">
    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
      <i class="pi pi-bars"></i>
    </button>
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" />
      <span>FINOVATE</span>
    </router-link>

    <ul class="layout-topbar-menu hidden lg:flex origin-top">
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-sun"></i>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-inbox"></i>
        </button>
      </li>
      <li>
        <button class="p-link layout-topbar-button">
          <i class="pi pi-user"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/components/_navbar.scss";
</style>

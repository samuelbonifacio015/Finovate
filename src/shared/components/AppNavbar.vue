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
    <router-link to="/" class="layout-topbar-logo">
      <img alt="Logo" :src="topbarImage()" />
      <span>FINOVATE</span>
    </router-link>
    <button class="p-link layout-menu-button layout-topbar-button" @click="onMenuToggle">
      <i class="pi pi-bars"></i>
    </button>

    <button class="p-link layout-topbar-menu-button layout-topbar-button"
            v-styleclass="{ selector: '@next', enterClass: 'hidden', enterActiveClass: 'scalein',
			leaveToClass: 'hidden', leaveActiveClass: 'fadeout', hideOnOutsideClick: true}">
      <i class="pi pi-ellipsis-v"></i>
    </button>

    <button class="p-link layout-topbar-menu-button layout-topbar-button"
            @onClick="onProfileMenuToggle">
      <i class="pi pi-user"></i>
    </button>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/components/_navbar.scss";
</style>

<script setup>

import {onBeforeUnmount, onMounted, ref} from "vue";

const topbarImage = () => {
  return 'public/finovate.png'
}

const emit = defineEmits(['menu-toggle', 'open-auth'])
const onMenuToggle = () => { emit('menu-toggle')}

const user = ref(null)
const showProfileMenu = ref(false)
const showAuthMenu = ref(false)

const onDocumentClick = () => {
  showProfileMenu.value = false
  showAuthMenu.value = false
}

onMounted(() => document.addEventListener('click', onDocumentClick))
onBeforeUnmount(() => document.removeEventListener('click', onDocumentClick))

const onUserClick = (e) => {
  e.stopPropagation()
  if (user.value) {
    showProfileMenu.value = !showProfileMenu.value
    showAuthMenu.value = false
  } else {
    showAuthMenu.value = !showAuthMenu.value
    showProfileMenu.value = false
  }
}

const openAuth = (mode) => {
  emit('open-auth', mode)
  showAuthMenu.value = false
}

const logout = () => {
  user.value = null
  showProfileMenu.value = false
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

      <li class="relative">
        <button class="p-link layout-topbar-button" @click.stop="onUserClick">
          <i class="pi pi-user"></i>
        </button>

        <ul
            class="auth-dropdown"
            v-if="user ? showProfileMenu : showAuthMenu"
            @click.stop
        >
          <li v-if="user">
            <button class="p-link" @click="logout">Cerrar sesión</button>
          </li>
          <template v-else>
            <li>
              <button class="p-link" @click="openAuth('login')">Iniciar sesión</button>
            </li>
            <li>
              <button class="p-link" @click="openAuth('register')">Registrarse</button>
            </li>
          </template>
        </ul>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
@import "@/assets/styles/components/_navbar.scss";
</style>

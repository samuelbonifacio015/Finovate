<script setup>

import { ref } from 'vue';

const activeSection = ref('datos-personales');
const isMobileMenuOpen = ref(false);

const userData = {
  name: 'Usuario Demo',
  email: 'usuario@ejemplo.com',
  joinDate: '¡Gracias por usar Finovate!'
};

const menuItems = [
  { id: 'datos-personales', label: 'Datos Personales', icon: 'pi pi-user' },
  { id: 'seguridad', label: 'Seguridad', icon: 'pi pi-lock' },
  { id: 'apariencia', label: 'Apariencia', icon: 'pi pi-palette' },
  { id: 'idioma', label: 'Idioma', icon: 'pi pi-globe' },
  { id: 'ayuda' , label: 'Ayuda', icon: 'pi pi-question-circle' },
  { id: 'configuracion' , label: 'Configuración', icon: 'pi pi-cog' },
];

const handleSectionChange = (sectionId) => {
  activeSection.value = sectionId;
  isMobileMenuOpen.value = false;
}
</script>

<template>
  <div class="user-profile-page">
    <div class="sidebar" :class="{ 'mobile-open': isMobileMenuOpen }">
      <div class="user-info">
        <h2>{{ userData.name }}</h2>
        <p>{{ userData.email }}</p>
        <small>{{ userData.joinDate }}</small>
      </div>
      <ul class="menu">
        <li
          v-for="item in menuItems"
          :key="item.id"
          :class="{ active: activeSection === item.id }"
          @click="handleSectionChange(item.id)"
        >
          <i :class="['menu-icon', item.icon]"></i>
          {{ item.label }}
        </li>
      </ul>
    </div>
    <div class="content">
      <div v-if="activeSection === 'datos-personales'">
        <h3>Datos Personales</h3>
        <p>Aquí puedes actualizar tu información personal.</p>
      </div>
      <div v-else-if="activeSection === 'seguridad'">
        <h3>Seguridad</h3>
        <p>Aquí puedes cambiar tu contraseña y configurar la autenticación de dos factores.</p>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

</style>
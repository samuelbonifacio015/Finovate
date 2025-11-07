<script setup>

import { ref } from 'vue';
import { User, ShieldLock, Palette, Globe, HelpCircle, LogOut, Settings } from 'lucide-vue-next';

const activeSection = ref('datos-personales');
const isMobileMenuOpen = ref(false);

const userData = {
  name: 'Usuario Demo',
  email: 'usuario@ejemplo.com',
  joinDate: '¡Gracias por usar Finovate!'
};

const menuItems = [
  { id: 'datos-personales', label: 'Datos Personales', icon: User },
  { id: 'seguridad', label: 'Seguridad', icon: ShieldLock },
  { id: 'apariencia', label: 'Apariencia', icon: Palette },
  { id: 'idioma', label: 'Idioma', icon: Globe },
  { id: 'ayuda' , label: 'Ayuda', icon: HelpCircle },
  { id: 'configuracion' , label: 'Configuración', icon: Settings },
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
          <component :is="item.icon" class="menu-icon" />
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
<script setup>
import { ref } from 'vue';

const activeSection = ref('datos-personales');
const isMobileMenuOpen = ref(false);
const darkMode = ref(false);
const notifications = ref(true);
const language = ref('es');
const currency = ref('PEN');

const userData = {
  name: 'Usuario Demo',
  email: 'usuario@ejemplo.com',
  phone: '+51 999 999 999',
  address: 'Lima, Perú',
  joinDate: '¡Gracias por usar Finovate!'
};

const menuItems = [
  { id: 'datos-personales', label: 'Datos Personales', icon: 'pi pi-user' },
  { id: 'seguridad', label: 'Seguridad', icon: 'pi pi-lock' },
  { id: 'apariencia', label: 'Apariencia', icon: 'pi pi-palette' },
  { id: 'idioma', label: 'Idioma', icon: 'pi pi-globe' },
  { id: 'ayuda', label: 'Ayuda', icon: 'pi pi-question-circle' },
  { id: 'configuracion', label: 'Configuración', icon: 'pi pi-cog' },
];

const handleSectionChange = (sectionId) => {
  activeSection.value = sectionId;
  isMobileMenuOpen.value = false;
}

const handleSave = () => {
  alert('Cambios guardados');
}
</script>

<template>
  <div class="min-h-screen bg-gray-50 p-4 lg:p-8">
    <div class="mb-6">
      <h1 class="text-3xl font-bold text-gray-900">Mi Perfil</h1>
      <p class="text-base text-gray-600 mt-2">Gestiona tu información personal y configuraciones</p>
    </div>

    <div class="lg:hidden mb-4">
      <button
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          class="w-full flex align-items-center justify-content-between p-3 border-1 border-gray-300 border-round surface-0"
      >
        <span class="flex align-items-center gap-2">
          <i :class="menuItems.find(item => item.id === activeSection).icon"></i>
          {{ menuItems.find(item => item.id === activeSection).label }}
        </span>
        <i :class="isMobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"></i>
      </button>
    </div>

    <div
        v-if="isMobileMenuOpen"
        class="lg:hidden fixed top-0 left-0 w-full h-full bg-black-alpha-50 z-5"
        @click="isMobileMenuOpen = false"
    >
      <div class="surface-0 h-full w-20rem shadow-8" @click.stop>
        <div class="p-4 border-bottom-1 border-gray-200 flex align-items-center justify-content-between">
          <h2 class="text-lg font-semibold m-0">Configuración</h2>
          <button @click="isMobileMenuOpen = false" class="p-2 border-none bg-transparent cursor-pointer">
            <i class="pi pi-times text-xl"></i>
          </button>
        </div>
        <nav class="p-2">
          <button
              v-for="item in menuItems"
              :key="item.id"
              @click="handleSectionChange(item.id)"
              :class="['w-full flex align-items-center gap-3 p-3 text-left border-none border-round-lg cursor-pointer transition-colors',
                     activeSection === item.id ? 'bg-blue-50 text-blue-700' : 'surface-0 text-gray-700 hover:bg-gray-100']"
          >
            <i :class="[item.icon, 'text-lg']"></i>
            {{ item.label }}
          </button>
        </nav>
      </div>
    </div>

    <div class="grid">
      <div class="hidden lg:block col-12 lg:col-3">
        <div class="surface-card border-round shadow-2 p-0">
          <div class="p-4 border-bottom-1 border-gray-200">
            <h3 class="text-lg font-semibold m-0">Configuración</h3>
          </div>
          <nav class="p-0">
            <button
                v-for="item in menuItems"
                :key="item.id"
                @click="activeSection = item.id"
                :class="['w-full flex align-items-center gap-3 p-3 text-left border-none cursor-pointer transition-colors',
                       activeSection === item.id ? 'bg-blue-50 text-blue-700 border-right-3 border-blue-600' : 'surface-0 text-gray-700 hover:bg-gray-100']"
            >
              <i :class="item.icon"></i>
              {{ item.label }}
            </button>
          </nav>
        </div>
      </div>

      <div class="col-12 lg:col-9">
        <div class="surface-card border-round shadow-2">
          <div class="p-4 border-bottom-1 border-gray-200">
            <h3 class="text-xl font-semibold m-0 flex align-items-center gap-2">
              <i :class="menuItems.find(item => item.id === activeSection).icon"></i>
              {{ menuItems.find(item => item.id === activeSection).label }}
            </h3>
          </div>
          <div class="p-4">
            <div v-if="activeSection === 'datos-personales'" class="flex flex-column gap-4">
              <div class="flex flex-column md:flex-row align-items-center gap-4 mb-4">
                <div class="relative">
                  <div class="w-5rem h-5rem bg-blue-500 border-circle flex align-items-center justify-content-center text-white text-2xl font-bold">
                    U
                  </div>
                  <button class="absolute border-circle p-2 bg-primary text-white border-none cursor-pointer" style="bottom: -0.25rem; right: -0.25rem;">
                    <i class="pi pi-camera text-xs"></i>
                  </button>
                </div>
                <div class="text-center md:text-left">
                  <h3 class="text-xl font-semibold m-0">{{ userData.name }}</h3>
                  <p class="text-gray-600 mt-1">{{ userData.joinDate }}</p>
                </div>
              </div>

              <div class="grid">
                <div class="col-12 md:col-6">
                  <label for="name" class="block text-sm font-medium mb-2">Nombre completo</label>
                  <input id="name" type="text" :value="userData.name" class="w-full p-3 border-1 border-gray-300 border-round" />
                </div>
                <div class="col-12 md:col-6">
                  <label for="email" class="block text-sm font-medium mb-2">Correo electrónico</label>
                  <input id="email" type="email" :value="userData.email" class="w-full p-3 border-1 border-gray-300 border-round" />
                </div>
                <div class="col-12 md:col-6">
                  <label for="phone" class="block text-sm font-medium mb-2">Teléfono</label>
                  <input id="phone" type="text" :value="userData.phone" class="w-full p-3 border-1 border-gray-300 border-round" />
                </div>
                <div class="col-12 md:col-6">
                  <label for="address" class="block text-sm font-medium mb-2">Dirección</label>
                  <input id="address" type="text" :value="userData.address" class="w-full p-3 border-1 border-gray-300 border-round" />
                </div>
              </div>

              <button @click="handleSave" class="p-3 bg-primary text-white border-none border-round cursor-pointer w-full md:w-auto">
                Guardar cambios
              </button>
            </div>

            <div v-else-if="activeSection === 'seguridad'" class="flex flex-column gap-4">
              <div class="surface-card border-1 border-gray-200 border-round p-4">
                <h4 class="flex align-items-center gap-2 text-lg font-semibold mt-0">
                  <i class="pi pi-lock"></i>
                  Cambiar contraseña
                </h4>
                <div class="flex flex-column gap-3">
                  <div>
                    <label class="block text-sm font-medium mb-2">Contraseña actual</label>
                    <input type="password" class="w-full p-3 border-1 border-gray-300 border-round" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Nueva contraseña</label>
                    <input type="password" class="w-full p-3 border-1 border-gray-300 border-round" />
                  </div>
                  <div>
                    <label class="block text-sm font-medium mb-2">Confirmar nueva contraseña</label>
                    <input type="password" class="w-full p-3 border-1 border-gray-300 border-round" />
                  </div>
                  <button @click="handleSave" class="p-3 bg-primary text-white border-none border-round cursor-pointer w-full md:w-auto">
                    Actualizar contraseña
                  </button>
                </div>
              </div>

              <div class="surface-card border-1 border-gray-200 border-round p-4">
                <h4 class="flex align-items-center gap-2 text-lg font-semibold mt-0">
                  <i class="pi pi-eye"></i>
                  Privacidad
                </h4>
                <div class="flex flex-column gap-3">
                  <div class="flex align-items-center justify-content-between gap-3">
                    <div class="flex-1">
                      <p class="font-medium m-0">Perfil público</p>
                      <p class="text-sm text-gray-600 mt-1">Permite que otros usuarios vean tu perfil</p>
                    </div>
                    <input type="checkbox" class="p-inputswitch" />
                  </div>
                  <div class="flex align-items-center justify-content-between gap-3">
                    <div class="flex-1">
                      <p class="font-medium m-0">Mostrar estadísticas</p>
                      <p class="text-sm text-gray-600 mt-1">Compartir estadísticas financieras básicas</p>
                    </div>
                    <input type="checkbox" class="p-inputswitch" />
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="activeSection === 'apariencia'" class="flex flex-column gap-4">
              <div class="surface-card border-1 border-gray-200 border-round p-4">
                <h4 class="text-lg font-semibold mt-0">Tema</h4>
                <div class="flex align-items-center justify-content-between gap-3">
                  <div class="flex align-items-center gap-2 flex-1">
                    <i :class="darkMode ? 'pi pi-moon' : 'pi pi-sun'"></i>
                    <div>
                      <p class="font-medium m-0">Modo oscuro</p>
                      <p class="text-sm text-gray-600 mt-1">Cambia la apariencia de la aplicación</p>
                    </div>
                  </div>
                  <input type="checkbox" v-model="darkMode" class="p-inputswitch" />
                </div>
              </div>

              <div class="surface-card border-1 border-gray-200 border-round p-4">
                <h4 class="text-lg font-semibold mt-0">Personalización</h4>
                <div>
                  <label class="block text-sm font-medium mb-2">Color de acento</label>
                  <div class="flex gap-2 flex-wrap">
                    <div class="w-2rem h-2rem bg-blue-500 border-circle cursor-pointer border-2 border-blue-600"></div>
                    <div class="w-2rem h-2rem bg-green-500 border-circle cursor-pointer border-2 border-transparent hover:border-green-600"></div>
                    <div class="w-2rem h-2rem bg-purple-500 border-circle cursor-pointer border-2 border-transparent hover:border-purple-600"></div>
                    <div class="w-2rem h-2rem bg-red-500 border-circle cursor-pointer border-2 border-transparent hover:border-red-600"></div>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="activeSection === 'idioma'" class="flex flex-column gap-4">
              <div class="surface-card border-1 border-gray-200 border-round p-4">
                <h4 class="text-lg font-semibold mt-0">Idioma de la aplicación</h4>
                <div>
                  <label class="block text-sm font-medium mb-2">Seleccionar idioma</label>
                  <select v-model="language" class="w-full p-3 border-1 border-gray-300 border-round">
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="fr">Français</option>
                    <option value="de">Deutsch</option>
                  </select>
                </div>
                <button @click="handleSave" class="p-3 bg-primary text-white border-none border-round cursor-pointer w-full md:w-auto mt-3">
                  Aplicar cambios
                </button>
              </div>

              <div class="surface-card border-1 border-gray-200 border-round p-4">
                <h4 class="text-lg font-semibold mt-0">Región</h4>
                <div>
                  <label class="block text-sm font-medium mb-2">Formato de moneda</label>
                  <select v-model="currency" class="w-full p-3 border-1 border-gray-300 border-round">
                    <option value="EUR">Euro (€)</option>
                    <option value="USD">US Dollar ($)</option>
                    <option value="PEN">Soles (S/)</option>
                  </select>
                </div>
                <button @click="handleSave" class="p-3 bg-primary text-white border-none border-round cursor-pointer w-full md:w-auto mt-3">
                  Aplicar cambios
                </button>
              </div>
            </div>

            <div v-else-if="activeSection === 'ayuda'" class="flex flex-column gap-4">
              <div class="surface-card border-1 border-gray-200 border-round p-4">
                <h4 class="text-lg font-semibold mt-0">Centro de ayuda</h4>
                <div class="flex flex-column gap-2">
                  <button class="w-full flex align-items-center gap-2 p-3 border-1 border-gray-300 border-round bg-white cursor-pointer text-left">
                    <i class="pi pi-question-circle"></i>
                    Preguntas frecuentes
                  </button>
                  <button class="w-full flex align-items-center gap-2 p-3 border-1 border-gray-300 border-round bg-white cursor-pointer text-left">
                    <i class="pi pi-user"></i>
                    Contactar soporte
                  </button>
                  <button class="w-full flex align-items-center gap-2 p-3 border-1 border-gray-300 border-round bg-white cursor-pointer text-left">
                    <i class="pi pi-cog"></i>
                    Guía de usuario
                  </button>
                </div>
              </div>

              <div class="surface-card border-1 border-gray-200 border-round p-4">
                <h4 class="text-lg font-semibold mt-0">Información de la aplicación</h4>
                <div class="text-sm">
                  <p><span class="font-medium">Versión:</span> 1.0.0</p>
                  <p><span class="font-medium">Última actualización:</span> 6 de Noviembre, 2025</p>
                </div>
              </div>
            </div>

            <div v-else-if="activeSection === 'configuracion'" class="flex flex-column gap-4">
              <div class="surface-card border-1 border-gray-200 border-round p-4">
                <h4 class="text-lg font-semibold mt-0">Notificaciones</h4>
                <div class="flex flex-column gap-3">
                  <div class="flex align-items-center justify-content-between gap-3">
                    <div class="flex-1">
                      <p class="font-medium m-0">Notificaciones push</p>
                      <p class="text-sm text-gray-600 mt-1">Recibe alertas sobre transacciones</p>
                    </div>
                    <input type="checkbox" v-model="notifications" class="p-inputswitch" />
                  </div>
                  <div class="flex align-items-center justify-content-between gap-3">
                    <div class="flex-1">
                      <p class="font-medium m-0">Recordatorios de presupuesto</p>
                      <p class="text-sm text-gray-600 mt-1">Alertas cuando superes límites</p>
                    </div>
                    <input type="checkbox" class="p-inputswitch" />
                  </div>
                  <div class="flex align-items-center justify-content-between gap-3">
                    <div class="flex-1">
                      <p class="font-medium m-0">Resumen semanal</p>
                      <p class="text-sm text-gray-600 mt-1">Recibe un resumen por email</p>
                    </div>
                    <input type="checkbox" class="p-inputswitch" />
                  </div>
                </div>
              </div>

              <div class="surface-card border-1 border-gray-200 border-round p-4">
                <h4 class="text-lg font-semibold mt-0">Datos y privacidad</h4>
                <div class="flex flex-column gap-2">
                  <button class="w-full p-3 border-1 border-gray-300 border-round bg-white cursor-pointer text-left">
                    Exportar mis datos
                  </button>
                  <button class="w-full p-3 border-1 border-red-600 text-red-600 border-round bg-white cursor-pointer text-left hover:bg-red-50">
                    Eliminar cuenta
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.min-h-screen {
  min-height: 100vh;
}

button {
  transition: all 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
}

input[type="text"],
input[type="email"],
input[type="password"],
select {
  font-size: 0.875rem;

  &:focus {
    outline: 2px solid var(--primary-color);
    outline-offset: 2px;
  }
}

.bg-black-alpha-50 {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>

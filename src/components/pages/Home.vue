<script setup>
import { useRouter } from 'vue-router';
import { CreditCard, Wallet, ArrowRight, BarChart3, Trophy } from 'lucide-vue-next';

const router = useRouter();

const navigateTo = (path) => {
  router.push(path);
};
</script>

<template>
  <main class="flex-grow-1 mx-5">
    <div class="surface-ground py-6 md:py-8">
      <div class="container mx-auto px-4">
        <div class="grid align-items-center">
          <div class="col-12 lg:col-6 pr-0 lg:pr-6">
            <h1 class="text-7xl lg:text-6xl font-bold text-900 text-blue-500 mb-4 line-height-3">
              <span class="text-7xl">Finanzas simples</span> para tu día a día
            </h1>
            <p class="text-xl text-600 mb-5 line-height-3">
              Administra tus cuentas, realiza transferencias y mantén el control de tus finanzas en un solo lugar.
            </p>
            <button
                class="text-600 p-3 border-round-lg w-4 bg-white border-gray-500 border-1"
                @click="navigateTo('/dashboard')"
            >
              Ver Demostración
              <ArrowRight class="w-1rem h-1rem" />
            </button>
          </div>

          <div class="col-12 lg:col-6 pl-0 lg:pl-6 mt-5 lg:mt-0">
            <div class="surface-card border-round-2xl shadow-4 overflow-hidden">
              <div class="p-4 text-white" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
                <div class="flex justify-content-between align-items-start mb-2">
                  <h3 class="font-bold text-xl m-0">Mi Dashboard</h3>
                  <div class="text-right">
                    <div class="text-2xl font-bold">$17,540.00</div>
                    <p class="text-sm text-white-alpha-80 m-0">Saldo total en todas tus cuentas</p>
                  </div>
                </div>
              </div>

              <div class="p-4">
                <div class="surface-0 border-round-xl p-4 mb-3 border-1 surface-border">
                  <div class="flex justify-content-between align-items-center">
                    <div class="flex align-items-center gap-3">
                      <div class="w-3rem h-3rem flex align-items-center justify-content-center border-round-lg" style="background: #dbeafe; color: #2563eb;">
                        <CreditCard class="w-2rem h-2rem" />
                      </div>
                      <div>
                        <p class="font-semibold text-900 m-0 mb-1">Cuenta Corriente</p>
                        <p class="text-sm text-500 m-0">Última actualización: Hoy</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-900 text-xl m-0 mb-1">$2,540.00</p>
                      <p class="text-sm text-green-600 m-0">+$500 este mes</p>
                    </div>
                  </div>
                </div>

                <div class="surface-0 border-round-xl p-4 mb-4 border-1 surface-border">
                  <div class="flex justify-content-between align-items-center">
                    <div class="flex align-items-center gap-3">
                      <div class="w-3rem h-3rem flex align-items-center justify-content-center border-round-lg" style="background: #dcfce7; color: #16a34a;">
                        <Wallet class="w-2rem h-2rem" />
                      </div>
                      <div>
                        <p class="font-semibold text-900 m-0 mb-1">Ahorros</p>
                        <p class="text-sm text-500 m-0">Última actualización: Ayer</p>
                      </div>
                    </div>
                    <div class="text-right">
                      <p class="font-bold text-900 text-xl m-0 mb-1">$15,000.00</p>
                      <p class="text-sm text-green-600 m-0">+$1,500 este mes</p>
                    </div>
                  </div>
                </div>

                <button
                    class="text-600 p-3 border-round-lg w-full bg-white border-gray-500 border-1"
                    @click="navigateTo('/dashboard')"
                >
                  Ver Todas las Cuentas
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="surface-section py-8">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center text-900 mb-6">Tu dinero bajo control</h2>

        <div class="grid mt-6">
          <div class="col-12 md:col-6 lg:col-3 p-3">
            <div class="text-center">
              <div class="inline-flex align-items-center justify-content-center w-5rem h-5rem border-round-2xl mb-4" style="background: #dbeafe;">
                <CreditCard class="w-3rem h-3rem text-primary" />
              </div>
              <h3 class="text-xl font-bold text-900 mb-3">Múltiples Cuentas</h3>
              <p class="text-600 line-height-3 m-0">
                Gestiona todas tus cuentas bancarias desde un único lugar de forma segura.
              </p>
            </div>
          </div>

          <div class="col-12 md:col-6 lg:col-3 p-3">
            <div class="text-center">
              <div class="inline-flex align-items-center justify-content-center w-5rem h-5rem border-round-2xl mb-4" style="background: #dcfce7;">
                <Wallet class="w-3rem h-3rem" style="color: #16a34a;" />
              </div>
              <h3 class="text-xl font-bold text-900 mb-3">Transferencias Fáciles</h3>
              <p class="text-600 line-height-3 m-0">
                Mueve dinero entre tus cuentas con seguridad y rapidez en un par de clicks.
              </p>
            </div>
          </div>

          <div class="col-12 md:col-6 lg:col-3 p-3">
            <div class="text-center">
              <div class="inline-flex align-items-center justify-content-center w-5rem h-5rem border-round-2xl mb-4" style="background: #f3e8ff;">
                <BarChart3 class="w-3rem h-3rem" style="color: #9333ea;" />
              </div>
              <h3 class="text-xl font-bold text-900 mb-3">Analítica Detallada</h3>
              <p class="text-600 line-height-3 m-0">
                Visualiza tus finanzas con gráficos y estadísticas de fácil interpretación.
              </p>
            </div>
          </div>

          <div class="col-12 md:col-6 lg:col-3 p-3">
            <div class="text-center">
              <div class="inline-flex align-items-center justify-content-center w-5rem h-5rem border-round-2xl mb-4" style="background: #fef3c7;">
                <Trophy class="w-3rem h-3rem" style="color: #f59e0b;" />
              </div>
              <h3 class="text-xl font-bold text-900 mb-3">Gamificación</h3>
              <p class="text-600 line-height-3 m-0">
                Alcanza metas, completa desafíos y gana recompensas por gestionar bien tu dinero.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>


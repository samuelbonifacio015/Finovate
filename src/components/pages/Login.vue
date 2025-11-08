<script setup>

</script>

<template>

<div class="surface-0 flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
  <div class="grid justify-content-center p-2 lg:p-0" style="min-width: 80%">
    <div class="col-12 mt-5 xl:mt-0 text-center">
      <img src="/finovate.png" alt="Finovate Logo" class="mb-5" style="width: 81px; height: 81px; border-radius: 10px;" />
    </div>
    <div class="col-12 xl:col-6">
      <div class="h-full w-full m-0 py-7 px-4">
        <div class="text-center mb-5">
          <h1 class="text-900 text-3xl font-bold mb-3">Bienvenido a Finovate</h1>
          <span class="text-600 font-medium line-height-3">Registrate para continuar</span>
        </div>

        <div class="w-full md:w-10 mx-auto">
          <label for="email" class="block text-900 text-xl font-medium mb-2">Email</label>
          <InputText id="email" v-model="email" type="text" placeholder="Email" class="w-full mb-3" style="padding: 1rem" />

          <label for="password" class="block text-900 text-xl font-medium mb-2">Contraseña</label>
          <Password id="password" v-model="password" placeholder="Password" :toggleMask="true"
                    class="w-full mb-3" inputClass="w-full" inputStyle="padding: 1rem"
          />

          <div class="flex align-items-center justify-content-between mb-5">
            <div class="flex align-items-center">
              <Checkbox id="rememberme" v-model="rememberMe" class="mr-2"></Checkbox>
              <label for="rememberme" class="text-900 font-medium">Recuérdame</label>
            </div>
            <a class="font-medium no-underline ml-2 text-blue-500 cursor-pointer">¿Olvidaste tu contraseña?</a>
          </div>
          <Button label="Inicia Sesion" class="w-full p-3 text-xl"></Button>
        </div>
      </div>
    </div>
  </div>
</div>

</template>

<style scoped lang="scss">

</style>
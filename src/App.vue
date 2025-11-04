<script setup>
import AppNavbar from "@/shared/components/AppNavbar.vue";

const handleMenuToggle = () => {
  console.log('Menu toggled')
}
</script>

<template>
  <div>
    <app-navbar @menu-toggle="handleMenuToggle"></app-navbar>
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>

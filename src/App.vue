<script setup>
import AppNavbar from "@/shared/components/AppNavbar.vue";
import AppFooter from "@/shared/components/AppFooter.vue";

const handleMenuToggle = () => {
  console.log('Menu toggled')
}
</script>

<template>
  <div>
    <app-navbar @menu-toggle="handleMenuToggle"></app-navbar>
    <app-footer @menu-toggle="handleMenuToggle"></app-footer>
    <router-view></router-view>
  </div>
</template>

<style scoped>

</style>

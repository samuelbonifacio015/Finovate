<script setup>
import AppNavbar from "@/shared/components/AppNavbar.vue";
import AppFooter from "@/shared/components/AppFooter.vue";

</script>

<template>
  <div>
    <app-navbar></app-navbar>
    <router-view></router-view>
    <app-footer></app-footer>
  </div>
</template>

<style lang="scss">
@import "@/assets/styles/_variables.scss";

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body, #app {
  font-family: $font-family-sans;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: $fontSize;
  color: #212529;
}

body {
  margin: 0;
  min-height: 100vh;
}

#app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main-content {
  flex: 1 0 auto;
}

button, input, select, textarea {
  font-family: $font-family-sans;
}
</style>


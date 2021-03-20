<template>
  <header>
    <v-header/>
  </header>
  <div class="container">
    <router-view />
  </div>
</template>

<script>

import VHeader from "./components/Header/v-header";
export default {
  name: "App",
  components: {VHeader},
};
</script>

<style lang="scss"></style>

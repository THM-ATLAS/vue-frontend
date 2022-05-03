<template>
  <v-app :theme="theme" id="app-wrapper">
    <title>ATLAS</title>
    <v-main>
      <RouterView/>
    </v-main>
  </v-app>
</template>

<script setup>
import {theme} from "@/helpers/theme";
import { RouterView } from 'vue-router';

</script>

<style src="ress"/>

<style lang="scss">
#app-wrapper {
  min-height: 100vh;
}
</style>

<template>
  <v-container id="main" role="main">
    <v-row class="justify-center homepage-row">
      <h1>Willkommen zu</h1>
    </v-row>
    <v-row class="homepage-row">
        <v-img v-if="theme === 'light'" @click="goToHome()" @keyup.enter.prevent.stop="goToHome"
               src="@/assets/ATLAS_Logo.svg" height="150px"/>
        <v-img v-else @click="goToHome()" @keyup.enter.prevent.stop="goToHome" src="@/assets/ATLAS_Logo_Dark.svg"
               height="150px"/>
    </v-row>
    <v-row class="justify-center homepage-row">
      <h3>Starte mit der Suche nach Kursen oder logge dich oben rechts ein!</h3>
    </v-row>
    <v-row class="justify-center homepage-row">
      <v-spacer></v-spacer>
      <v-col>
        <SearchBar></SearchBar>
      </v-col>
      <v-spacer></v-spacer>
    </v-row>
  </v-container>
</template>

<script setup>
import {theme} from "@/helpers/theme";
import SearchBar from "@/components/SearchBar";
</script>

<style scoped>

.homepage-row {
  padding: 3% 0 3% 0;
}

#main {
  margin-top: 13%;
}

h1, h3 {
  color: #4a5c66;
}

</style>
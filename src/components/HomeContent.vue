<template>
  <v-card class="mx-auto justify-center" elevation="0" rounded="0">
    <v-container>
      <v-row class="justify-center">
        <div class="text-h3">Willkommen zu</div>
      </v-row>
      <v-row class="homepage-row">
        <v-img v-if="theme === 'light'" @click="goToHome()" @keyup.enter.prevent.stop="goToHome"
               src="@/assets/ATLAS_Logo.svg" height="150px"/>
        <v-img v-else @click="goToHome()" @keyup.enter.prevent.stop="goToHome" src="@/assets/ATLAS_Logo_Dark.svg"
               height="150px"/>
      </v-row>
      <v-row class="justify-center homepage-row">
        <div class="text-h5">Starte mit der Suche nach Kursen oder logge dich oben rechts ein!</div>
      </v-row>
      <v-row class="justify-center homepage-row">
        <v-spacer></v-spacer>
        <v-col>
          <SearchBar></SearchBar>
        </v-col>
        <v-spacer></v-spacer>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import {theme} from "@/helpers/theme";
import SearchBar from "@/components/navigation/navbar/SearchBar.vue";
import {useRouter} from "vue-router";

const router = useRouter();

function goToHome(): void {
  router.push(`/`);
}
</script>

<style scoped>

.homepage-row {
  padding: 7% 0 0 0;
}


</style>
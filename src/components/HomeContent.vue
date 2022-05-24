<template>
  <v-container>
    <v-card class="mx-auto justify-center" elevation="0" rounded="0">
      <v-container>
        <v-row class="justify-center">
          <div class="text-h3">{{ $t('landing_page.welcome') }}</div>
        </v-row>
        <v-row class="homepage-row">
          <v-img v-if="theme === 'light'" @click="goToHome()" @keyup.enter.prevent.stop="goToHome"
                 src="@/assets/ATLAS_Logo.svg" height="150px" alt="ATLAS Logo"/>
          <v-img v-else @click="goToHome()" @keyup.enter.prevent.stop="goToHome" src="@/assets/ATLAS_Logo_Dark.svg"
                 height="150px" alt="ATLAS Logo"/>
        </v-row>
        <v-row class="justify-center homepage-row">
          <div class="text-h5">{{ $t('landing_page.instructions') }}</div>
        </v-row>
        <v-row class="justify-center homepage-row">
          <v-spacer/>
          <v-col>
            <SearchBar/>
          </v-col>
          <v-spacer/>
        </v-row>
      </v-container>
    </v-card>
  </v-container>
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
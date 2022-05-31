<template>
  <!--v-select
        v-if="this.$route.params.module"
        v-model="this.$route.params.module"
        :items="modules"
        :rules="[v => !!v || 'Item is required']"
        label="Module"
        required
    /-->
  <v-menu width="10em" origin="top" transition="scale-transition">
    <template v-slot:activator="{ props }">
      <v-btn @click="goToModulePage()" class="d-none d-md-flex mr-4 ml-4" v-bind="props" variant="outlined">
        <v-icon class="mr-2" icon="mdi-book-open-page-variant"/>
        {{ $t('header.modules') }}
      </v-btn>
    </template>
  </v-menu>
</template>

<script setup lang="ts">
import router from "@/router";

function goToModulePage(): void {
  router.push("/modules"); //route must be set to module page once it exists in router/index.ts
}
</script>
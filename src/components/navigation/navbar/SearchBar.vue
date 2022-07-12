<template>
  <!--v-text-field @keyup.enter="goToModulePage"
      class="d-md-block"
      :label="$t('landing_page.search')"
      prepend-inner-icon="mdi-magnify"
      role="search"
      hide-details="auto"
      dense
  /-->
  <v-btn prepend-icon="mdi-book-open-page-variant" @click="goToModulePage" variant="outlined" width="100%">
   {{ $t('header.modules') }}
  </v-btn>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();

function goToModulePage() {
  router.push("/modules");
}
</script>

<style scoped>

</style>
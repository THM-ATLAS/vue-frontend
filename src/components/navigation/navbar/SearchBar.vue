<template>
  <!--v-text-field @keyup.enter="goToCoursePage"
      class="d-md-block"
      :label="$t('landing_page.search')"
      prepend-inner-icon="mdi-magnify"
      role="search"
      hide-details="auto"
      dense
  /-->
  <v-btn @click="goToCoursePage" width="100%">
   {{ $t('header.courses') }}
  </v-btn>
</template>

<script setup>
import {useRouter} from "vue-router";

const router = useRouter();

function goToCoursePage() {
  router.push("/courses");
}
</script>

<style scoped>

</style>
<template>
  <v-text-field @keyup.enter="goToCoursePage"
      class="d-md-block"
      label="z.B. Compilerbau"
      prepend-inner-icon="mdi-magnify"
      role="search"
      hide-details="auto"
      dense
  />
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
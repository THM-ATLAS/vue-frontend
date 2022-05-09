<template>
  <v-text-field @keyup.enter="goToCoursePage"
      class="d-md-block"
      label="z.B. Compilerbau"
      prepend-inner-icon="mdi-magnify"
      variant="plain"
      bg-color="#eeeeee"
      role="search"
  />
</template>

<script setup>
import router from "@/router";

function goToCoursePage() {
  router.push("/courses");
}
</script>

<style scoped>

</style>
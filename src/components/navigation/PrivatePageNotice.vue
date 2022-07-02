<template>
  <v-card class="card">
    <v-card-title>{{ $t("error.forbidden") }}</v-card-title>
    <v-card-text>
      <p>{{ $t("private_notice.description") }}</p>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">

</script>

<style scoped>
.card{
  margin-top: 6em;
}
</style>
<template>
  <NavbarAdmin/>
  <v-main class="main">
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <ExerciseManagement id="content"/>
      </v-col>
    </v-row>
  </v-main>
</template>

<style scoped>
.main {
  margin-top: 2em;
}
</style>

<script setup lang='ts'>
import ExerciseManagement from "@/components/admin/ExerciseManagement.vue";
import NavbarAdmin from "@/components/admin/NavbarAdmin.vue";
</script>
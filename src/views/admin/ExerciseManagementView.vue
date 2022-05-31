<template>
  <NavbarAdmin/>
  <v-main class="main">
    <v-row class="main-row" justify="center">
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

.main-row {
  margin-bottom: 2em;
}
</style>

<script setup lang='ts'>
import ExerciseManagement from "@/components/admin/ExerciseManagement.vue";
import NavbarAdmin from "@/components/admin/NavbarAdmin.vue";
import {useI18n} from "vue-i18n";
document.title = useI18n().t('titles.exercisemanagement_view');
</script>
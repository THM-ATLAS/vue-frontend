<template>
  <NavbarAdmin/>
  <v-main class="main">
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <TaskManagement id="content"/>
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
import TaskManagement from "@/components/admin/TaskManagement.vue";
import NavbarAdmin from "@/components/admin/NavbarAdmin.vue";
</script>
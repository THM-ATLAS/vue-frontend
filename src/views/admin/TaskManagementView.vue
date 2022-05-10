<template>
  <!-- Admin Panel Header/Menu -->
  <SkipToContent/>
  <v-container>
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <TaskManagement id="content"/>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
</style>

<script setup lang='ts'>
import SkipToContent from "@/components/helpers/SkipToContent.vue";
import TaskManagement from "@/components/admin/TaskManagement.vue";
</script>
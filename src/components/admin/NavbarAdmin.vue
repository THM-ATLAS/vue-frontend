<template>
  <v-navigation-drawer permanent>
    <v-card>
      <v-card-text class="text-center">
        <h2>Admin Panel</h2>
        <b>Username_Placeholder</b>
      </v-card-text>
    </v-card>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-account"
        title="User Management"
        value="home"
        @click="goToUser"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="Task Management"
        value="account"
        @click="goToTask"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-account"
        title="Course Management"
        value="users"
        @click="goToCourse"
        disabled
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

function goToUser(): void {
  router.push("/admin/users");
}

function goToTask(): void {
  router.push("/admin/tasks");
}

function goToCourse(): void {
  router.push("/admin/courses");
}
</script>

<style></style>

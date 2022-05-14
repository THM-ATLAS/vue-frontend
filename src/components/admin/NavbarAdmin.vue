<template>
  <v-navigation-drawer permanent>
    <v-card flat class="admin-nav-title">
      <v-card-text class="text-center">
        <h2>{{ $t("admin.navbar.title") }}</h2>
        <!-- <b>Username_Placeholder</b> -->
      </v-card-text>
    </v-card>
    <v-list density="compact" nav>
      <v-list-item
        prepend-icon="mdi-account"
        :title="$t('admin.navbar.manage_user')"
        @click="goToUser"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-pencil-ruler"
        :title="$t('admin.navbar.manage_task')"
        @click="goToTask"
      ></v-list-item>
      <v-list-item
        prepend-icon="mdi-file-tree"
        :title="$t('admin.navbar.manage_course')"
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

<style scoped>
.admin-nav-title {
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>

<template>
  <SkipToContent/>
  <v-app-bar>
    <v-app-bar-nav-icon class="d-lg-none" variant="text" @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>
      {{ $t('admin.navbar.title') }}
    </v-toolbar-title>
  </v-app-bar>
  <v-navigation-drawer
      v-model="drawer">
    <v-list density="compact" nav>
      <v-list-item
          prepend-icon="mdi-account"
          :title="$t('admin.navbar.manage_user')"
          @click="goToUser"
      />
      <v-list-item
          prepend-icon="mdi-pencil-ruler"
          :title="$t('admin.navbar.manage_exercise')"
          @click="goToExercise"
      />
      <v-list-item
          prepend-icon="mdi-file-tree"
          :title="$t('admin.navbar.manage_module')"
          @click="goToModule"
      />
      <v-list-item
          prepend-icon="mdi-tag"
          :title="$t('admin.navbar.manage_tag')"
          @click="goToTag"
      />
    </v-list>
    <v-list density="compact" nav>
      <v-list-item
          prepend-icon="mdi-arrow-left"
          :title="$t('admin.navbar.back')"
          @click="goToHome"
      />
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import SkipToContent from "@/components/helpers/SkipToContent.vue";
import {useDisplay} from "vuetify";

const router = useRouter();
const route = useRoute();
const display = useDisplay();

const showDefault = route.path.replace(/\//g, '').endsWith("admin") || display.lgAndUp;
const drawer = ref(showDefault);

function goToUser(): void {
  router.push("/admin/users");
}

function goToExercise(): void {
  router.push("/admin/exercises");
}

function goToModule(): void {
  router.push("/admin/modules");
}

function goToTag(): void {
  router.push("/admin/tags");
}

function goToHome(): void {
  router.push('/');
}
</script>

<style scoped>
.admin-nav-title {
  margin-top: 2em;
  margin-bottom: 2em;
}
</style>

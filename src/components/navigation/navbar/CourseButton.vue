<template>
  <!--v-select
        v-if="this.$route.params.course"
        v-model="this.$route.params.course"
        :items="courses"
        :rules="[v => !!v || 'Item is required']"
        label="Course"
        required
    /-->
  <v-menu width="10em" origin="top" transition="scale-transition">
    <template v-slot:activator="{ props }">
      <v-btn @click="goToCoursePage()" class="d-none d-md-flex mr-4 ml-4" v-bind="props" variant="outlined">
        <v-icon class="mr-2" icon="mdi-book-open-page-variant"/>
        {{ $t('header.courses') }}
      </v-btn>
    </template>
  </v-menu>
</template>

<script setup lang="ts">
import router from "@/router";

function goToCoursePage(): void {
  router.push("/courses"); //route must be set to course page once it exists in router/index.ts
}
</script>
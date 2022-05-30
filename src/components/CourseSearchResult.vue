<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12">
        <v-card
            elevation="2"
            color="highlight"
            @click="router.push(`/${props.module_id}`)">
          <h1>
          <v-card-title
              class="course-result-title">
            {{ props.name }}
          </v-card-title>
          </h1>
          <v-card-text>
            {{ props.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

type Module = {
  module_id : number
  name : string
  description: string
}

const props = defineProps<Module>();

</script>

<style scoped>
.courseName {
  font-size: 2rem;
  text-decoration: underline;
  padding-left: 1rem;
}

.courseDescription {
  padding: 1rem;
}

.courseImage {
  margin-left: auto;
  margin-right: auto;
}

.courseInfo {
  margin-left: auto;
  margin-right: auto;
}

.course-result-title {
  cursor: pointer;
}
</style>
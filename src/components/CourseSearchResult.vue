<template>
    <v-row>
      <v-col cols="12">
        <v-card class="justify-start"
               elevation="2"
               color="highlight" tabindex=0
               @click="router.push(`/${props.module_id}`);"
                @keyup.enter.prevent.stop="router.push(`/${props.module_id}`);">
          <v-card-title>
            {{ props.name }}
          </v-card-title>
          <v-card-text>
            {{ props.description }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
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
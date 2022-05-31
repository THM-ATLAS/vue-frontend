<template>
    <v-row>
      <v-col cols="12">
        <v-btn id="course-card" class="justify-start" block
               elevation="2"
               color="highlight"
               @click="router.push(`/${props.module_id}`)">
          <span style="white-space: normal;">
          <v-card-title>
            {{ props.name }}
          </v-card-title>
          <v-card-text>
            {{ props.description }}
          </v-card-text>
          </span>
        </v-btn>
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

#course-card {
  height: 100px;
}
</style>
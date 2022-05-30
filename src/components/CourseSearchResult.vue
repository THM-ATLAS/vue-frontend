<template>
    <v-row>
      <v-col cols="12">
        <v-btn id="course-card" class="justify-start" block
               elevation="2"
               color="highlight"
               @click="router.push(`/${id}`)">
          <v-card-title>
            {{ props.moduleName }}
          </v-card-title>
          <!-- <v-card-text>
            {{ props.moduleDescription }}
          </v-card-text> -->
        </v-btn>
      </v-col>
    </v-row>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

// @ts-ignore
const props = defineProps({
  id: {
    required: true,
    type: Number,
  },
  moduleName: {
    required: true,
    type: String
  }
  // courseDescription: String,
  // courseThumbnail: Image,
});

//console.log("Props in CourseSearchResult: " + props.id)
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
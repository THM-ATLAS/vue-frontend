<template>
  <!-- <a @click="this.$router.push('/' + course.id)">
    <v-container fill-height>
      <v-row align="center"
             justify="start"> -->
  <!--v-col>
          <v-img :src=course.courseThumbnail max-height="150" width="200" class="courseImage"></v-img>
        </v-col-->
  <!-- <v-col>
          <v-container class="courseInfo">
            <v-col>
              <v-row class="courseName">{{ moduleName }}</v-row>
              <v-row class="courseDescription"><!--{{ course.courseDescription }} --> Hier müsste eine Beschreibung für das Modul <pre> {{moduleName}} </pre>stehen.</v-row>
            </v-col>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </a> -->
  <v-container>
    <v-row>
      <v-col cols="12">
          <v-card
          elevation="10"
          :color="setColorResult()">
            <v-card-title
            class="course-result-title"
            @click="this.$router.push('/' + course.id)">
              {{ props.course.courseName }}
            </v-card-title>
            <v-card-text
            class="course-result-text">
              {{ props.course.courseDescription }}
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
  })
console.log("Props in CourseSearchResult: " + props.id)
</script>

<style scoped>
/* .courseName {
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
} */

.course-result-title {
  cursor: pointer;
}
.course-result-title:hover {
  filter: brightness(85%);
}

.course-result-text {
  cursor: default;
}
</style>

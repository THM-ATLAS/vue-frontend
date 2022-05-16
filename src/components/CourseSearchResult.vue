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
              <v-row class="courseName">{{ course.courseName }}</v-row>
              <v-row class="courseDescription">{{ course.courseDescription }}</v-row>
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

<script setup>
import { defineProps } from "vue";
import { theme } from "@/helpers/theme";

const props = defineProps({
  course: {
      resultId: Number,
      courseName: String,
      courseDescription: String,
      courseThumbnail: Image,
    }
});

function setColorResult() {
  return theme.value === "light" ? "green" : "grey-darken-3";
}
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

<template>
    <v-container fill-height>
      <v-row>
        <v-col cols="12">
          <v-card
          elevation="2"
          :color="setColorResult()">
            <v-card-title
            class="course-result-title"
            @click="router.push(`/${id}`)">
              {{ moduleName }}
            </v-card-title>
            <!-- <v-card-text>
              {{ moduleDescription }}
            </v-card-text> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import {theme} from "@/helpers/theme";
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

function setColorResult() {
  return theme.value === "light" ? "green" : "grey-darken-2";
}

console.log("Props in CourseSearchResult: " + props.id)
console.log(theme)
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
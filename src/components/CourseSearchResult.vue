<template>
  <a @click="router.push(`/${id}`)">
    <v-container fill-height>
      <v-row align="center"
             justify="start">
        <!--v-col>
          <v-img :src=course.courseThumbnail max-height="150" width="200" class="courseImage"></v-img>
        </v-col-->
        <v-col>
          <v-container class="courseInfo">
            <v-col>
              <v-row class="courseName">{{ props.moduleName }}</v-row>
              <!-- <v-row class="courseDescription">{{ course.courseDescription }}  Hier müsste eine Beschreibung für das Modul <pre> {{moduleName}} </pre>stehen.</v-row> -->
            </v-col>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </a>
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
</style>
<template>
  <v-container> <!-- todo: alignment and styling -->
    <v-row>
      <v-col>
        <v-img :src=course.courseThumbnail></v-img>
      </v-col>
      <v-col>
        <v-container>
          <v-col>
            <v-row>{{ course.courseName }}</v-row>
            <v-row>{{ course.courseDescription }}</v-row>
          </v-col>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "CourseSearchResult",
  props: {
    course: {
      resultId: Number,
      courseName: String,
      courseDescription: String,
      courseThumbnail: Image,
    },
  },
}
</script>

<style scoped>

</style>
<template>
  <v-container fill-height>
    <v-row align="center"
           justify="start">
      <v-col>
        <v-img :src=course.courseThumbnail max-height="150" width="200" class="courseImage"></v-img>
      </v-col>
      <v-col>
        <v-container class="courseInfo">
          <v-col>
            <v-row class="courseName">{{ course.courseName }}</v-row>
            <v-row class="courseDescription">{{ course.courseDescription }}</v-row>
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
.courseName{
  font-size: 2rem;
  text-decoration: underline;
  padding-left: 1rem;
}

.courseDescription{
  padding: 1rem;
}

.courseImage{
  margin-left: auto;
  margin-right: auto;
}

.courseInfo{
  margin-left: auto;
  margin-right: auto;
}
</style>
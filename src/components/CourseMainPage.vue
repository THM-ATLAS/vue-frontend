<template>
<v-container style="margin-top: 10%; background-color: rgb(var(--v-theme-surface));">
  <v-container style="background-color:rgb(var(--v-theme-primary));">
    <v-row align:start align-content:start >
      <v-col >
        <v-img :src=course.courseThumbnail style="height: 16rem; width: 22rem"></v-img>
      </v-col>
    <v-col>
      <h1 style="color: whitesmoke">{{course.courseName}}</h1>
      <p style="color: whitesmoke">{{course.courseDescription}}</p>
    </v-col>

    </v-row>
  </v-container>

<v-container>
  <v-row justify="center">
  <div style="display: inline-block"
      v-for="exercise in exercises"
      v-bind:key="exercise.id"

  >
    <MainpageCardModal class="exercisePanel"
        :exercise="exercise"
        :course="this.$route.params.course"
    />

  </div>
  </v-row>
</v-container>
</v-container>
</template>

<script>
import MainpageCardModal from "@/components/MainpageCardModal";
export default {
  name: "CourseMainPage",
  components: {MainpageCardModal},
  props: {
    course: {
      resultId: Number,
      courseName: String,
      courseDescription: String,
      courseThumbnail: Image,
    },
    exercises: Array,
  }
}

</script>

<style scoped>

.exercisePanel{
  width:28rem;
  height:30rem;
  padding: 1rem;
}
</style>
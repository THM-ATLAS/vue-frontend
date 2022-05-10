<template>
  <!-- todo: dynamically change colors based on current vuetify themes, fix layout errors-->
<v-container style="margin-top: 10%; background-color: #FFFFFF">
  <v-container style="background-color:#80ba24">
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


  <div v-for="exercise in exercises" :key="exercise.exerciseID" class="exercisePanel">
    <h1>{{exercise.title}}</h1>
    <v-img :src=exercise.image style="height: 16rem; width: 22rem"></v-img>
    <p>{{exercise.description}}</p>
  </div>

</v-container>
</template>

<script>
export default {
  name: "CourseMainPage",
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
  height: 25rem;
  width: 25rem;
  padding: 0.3rem;
  display: inline-block;
  border-style: solid;
  border-color: #80ba24;
  margin: 0.7rem
}
/*h1{
  color: var(--v-primary-base)
}*/
</style>
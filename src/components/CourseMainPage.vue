<template>
<v-card style="margin-top: 10%;">
  <v-container style="background-color:rgb(var(--v-theme-green));">
    <v-row align:start align-content:start >
      <v-col >
        <v-img :src=course.courseThumbnail style="height: 16rem; width: 22rem"></v-img>
      </v-col>
    <v-col>
      <h1>{{course.courseName}}</h1>
      <p>{{course.courseDescription}}</p>
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
</v-card>
</template>

<script setup>
import MainpageCardModal from "@/components/MainpageCardModal";
import {useRoute} from "vue-router";
import {onBeforeMount, reactive} from "vue";
import TaskService from "@/services/TaskService";
import ModuleService from "@/services/ModuleService";

const route = useRoute();

const course = reactive({
  id: -1,
  moduleName: 'Loading'
});
const exercises = reactive ([])

onBeforeMount(async () => {
  //Currently, whenever a taskID does not exist in the database we get a problem
  //and their ids have more holes than swiss cheese
  const array = [2,3,5,6]
  for (const i of array) {
    let apiExercise = (await TaskService.getTask(i)).data
    let newEntry = {
      id: apiExercise.exercise_id,
      title: apiExercise.title,
      content: apiExercise.content,
      taskPublic: apiExercise.taskPublic
    }
    exercises.push(newEntry)
  }
  let apiCourse = (await ModuleService.getModule(route.params.course)).data
  course.id = apiCourse.module_id
  course.courseName = apiCourse.name
  course.courseDescription = "Beschreibung des Kurses in weniger als 500 Worten"
  course.courseThumbnail = require("@/assets/product-2.jpg")
  //await router.replace(`/${encodeURIComponent(course.moduleName)}`)
})

</script>

<style scoped>

.exercisePanel{
  width:28rem;
  height:30rem;
  padding: 1rem;
}
</style>
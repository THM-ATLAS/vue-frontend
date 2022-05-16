<template>
  <CourseMainPage :course=course :exercises=exercises />
</template>

<script setup>
import CourseMainPage from "@/components/CourseMainPage";
import TaskService from "@/services/TaskService";
import {onBeforeMount, reactive} from "vue";
import {useRoute} from "vue-router";
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

</style>
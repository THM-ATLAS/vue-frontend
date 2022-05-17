<template>
  <CourseMainPage :module=module :exercises=exercises />
</template>

<script setup>
import CourseMainPage from "@/components/CourseMainPage";
import {onBeforeMount, reactive} from "vue";
import {useRoute} from "vue-router";
import ModuleService from "@/services/ModuleService";
import ExerciseService from "@/services/ExerciseService";

const route = useRoute();

const module = reactive({
  id: -1,
  name: 'Loading'
});
const exercises = reactive ([])

onBeforeMount(async () => {
  let apiCourse = (await ModuleService.getModule(route.params.course)).data
  module.id = apiCourse.module_id
  module.name = apiCourse.name
  let apiExercise = (await ExerciseService.getExercisesForModule(module.id)).data
  apiExercise.forEach((entry) => {
    exercises.push(entry)
  })

  //await router.replace(`/${encodeURIComponent(course.moduleName)}`)
})

</script>

<style scoped>

</style>
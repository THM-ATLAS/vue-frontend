<template>
  <CourseMainPage :module=module :exercises=exercises />
</template>

<script setup lang="ts">
import CourseMainPage from "@/components/CourseMainPage";
import {onBeforeMount, reactive,ref, Ref} from "vue";
import {useRoute} from "vue-router";
import ModuleService from "@/services/ModuleService";
import ExerciseService from "@/services/ExerciseService";
import {Module} from "@/helpers/types";

const route = useRoute();

const module: Ref<Module> = ref({});

const exercises = reactive ([])

onBeforeMount(async () => {
  module.value = (await ModuleService.getModule(route.params.course)).data
  let apiExercise = (await ExerciseService.getExercisesForModule(module.value.module_id)).data
  apiExercise.forEach((entry) => {
    exercises.push(entry)
  })

  //await router.replace(`/${encodeURIComponent(course.moduleName)}`)
})

</script>

<style scoped>

</style>
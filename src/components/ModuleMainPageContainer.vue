<template>
  <ModuleMainPage :module=module :exercises=exercises />
</template>

<script setup>
import ModuleMainPage from "@/components/ModuleMainPage";
import ExerciseService from "@/services/ExerciseService";
import {onBeforeMount, reactive} from "vue";
import {useRoute} from "vue-router";
import ModuleService from "@/services/ModuleService";

const route = useRoute();

const module = reactive({
  id: -1,
  moduleName: 'Loading'
});
const exercises = reactive ([])

onBeforeMount(async () => {
  //Currently, whenever a exerciseID does not exist in the database we get a problem
  //and their ids have more holes than swiss cheese
  const array = [3,6]
  for (const i of array) {
    let apiExercise = (await ExerciseService.getExercise(i)).data
    let newEntry = {
      id: apiExercise.exercise_id,
      title: apiExercise.title,
      content: apiExercise.content,
      exercisePublic: apiExercise.exercisePublic
    }
    exercises.push(newEntry)
  }
  let apiModule = (await ModuleService.getModule(route.params.module)).data
  module.id = apiModule.module_id
  module.moduleName = apiModule.name
  module.moduleDescription = "Beschreibung des Moduls in weniger als 500 Worten"
  module.moduleThumbnail = require("@/assets/product-2.jpg")
  //await router.replace(`/${encodeURIComponent(module.moduleName)}`)
})

</script>

<style scoped>

</style>
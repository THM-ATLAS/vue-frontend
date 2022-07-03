<template >
  <v-container role="main" >
    <v-row id="module-title" class="justify-center" >
      <h2 id="module"> {{ module.moduleName }} </h2>
    </v-row>
    <v-row class="justify-center mainpage-row">
      <v-col
          v-for="exercise in exercises"
          v-bind:key="exercise.exercise_id"
          class="mainpage-col"
          sm="6" md="4" lg="4"
      >
        <MainpageCardModal
            :exercise="exercise"
            :module="module"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang='ts'>
import MainpageCardModal from '@/components/unused/MainpageCardModal.vue';
import {useRoute} from "vue-router";
import {onBeforeMount, reactive} from "vue";
import ExerciseService from "@/services/ExerciseService"
import ModuleService from "@/services/ModuleService"

const route = useRoute();
const module = reactive({
  id: -1,
  moduleName: 'Loading'
});

const exercises = reactive ([])

onBeforeMount(async () => {

  let apiModule = (await ModuleService.getModule(route.params.module)).data
  module.id = apiModule.module.module_id
  module.moduleName = apiModule.module.name
  let apiExercise = (await ExerciseService.getExercisesForModule(module.id)).data
  apiExercise.forEach((entry : any) => {
    exercises.push(entry)
  })

  //await router.replace(`/${encodeURIComponent(module.moduleName)}`)
})

</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
.mainpage-col {
  padding: 2%;
  position: relative;
}

.mainpage-row {
  padding-left: 4%;
  padding-right: 4%;
}

#module-title {
  margin-top: 100px;
  margin-bottom: 20px;
}

#module {
  border-bottom: 2px solid black;
}
</style>


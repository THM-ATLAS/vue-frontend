<template>
  <v-container role="main">
    <v-row id="course-title" class="justify-center">
      <h2 id="course"> {{ course.moduleName }} </h2>
    </v-row>
    <v-row class="justify-center mainpage-row">
      <v-col
          v-for="exercise in exercises"
          v-bind:key="exercise.id"
          class="mainpage-col"
          sm="6" md="4" lg="4"
      >
        <MainpageCardModal
            :exercise="exercise"
            :course="course"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang='ts'>
import MainpageCardModal from '@/components/MainpageCardModal.vue'
import {useRoute} from "vue-router";
import {onBeforeMount, reactive} from "vue";
import TaskService from "@/services/TaskService"
import ModuleService from "@/services/ModuleService"

//const router = useRouter();
const route = useRoute();

const course = reactive({
  id: -1,
  moduleName: 'Loading'
});
const exercises = reactive ([])

onBeforeMount(async () => {
  for (let i = 2; i < 10; i++) {
    let apiExercise = (await TaskService.getTask(i)).data
    let newEntry = {
      id: apiExercise.exercise_id,
      title: apiExercise.title,
      content: apiExercise.content,
      taskPublic: apiExercise.taskPublic
    }
    exercises.push(newEntry)
  }
  console.log("MainPage props: " + route.params.id)
  let apiCourse = (await ModuleService.getModule(route.params.course)).data
  course.id = apiCourse.module_id
  course.moduleName = apiCourse.name
  //await router.replace(`/${encodeURIComponent(course.moduleName)}`)
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

#course-title {
  margin-top: 100px;
  margin-bottom: 20px;
}

#course {
  border-bottom: 2px solid black;
}
</style>


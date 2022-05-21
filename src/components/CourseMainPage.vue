<template>
  <v-card style="margin-top: 10%;">
    <div class="pt-0 pl-0">
      <v-btn
          @click="goBack"
          icon="mdi-menu-left"
          class="ma-2"
          variant="outlined"/>
    </div>
    <v-card color="highlight" rounded="0">
      <div class="mx-2 my-2">
        <div>
          <v-card-title class="text-left text-h4" style="padding-left: 0;" tabindex=0>{{ props.module.name }}</v-card-title>
        </div>
      </div>
    </v-card>
    <v-row align="center" justify="center" style="margin-top: 30px">
      <div style="text-decoration-line: underline; font-size: 2rem">Aufgaben</div>
    </v-row>
    <v-container style="width:70%; justify-self: center; margin-top: 16px;">
        <v-row
             v-for="exercise in props.exercises"
             v-bind:key="exercise.id"
            class="exerciseListEntry"
            @keyup.enter.prevent.stop="goToExercise(exercise)"
            @click.prevent.stop="goToExercise(exercise)"
            tabindex=0
        >
          <div>
          <div class="exerciseTitle">{{exercise.title}}</div>
          <p>{{exercise.description}}</p>
          </div>
        </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import {defineProps, watch} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const props = defineProps({
  module: Object,
  exercises: Object,
});

watch(() => {
  document.title = props.module.name;
})
function goBack() {
  router.back()
}


function goToExercise(exercise) {
  router.push("/" + props.module?.name  + "/e/" + exercise.exercise_id);
}
</script>

<style scoped lang="scss">
.exerciseListEntry{
  padding: 1rem;
  margin-bottom: 25px;
  background-color: rgb(var(--v-theme-highlight));
  border: 1px solid transparent;
  &:hover {
    border: 1px solid black;
    cursor: pointer;
    filter: brightness(110%);
  }
  div.exerciseTitle{
    text-decoration-line: underline;
    font-size: 1.2rem;
  }
  div p{

  }
}
</style>
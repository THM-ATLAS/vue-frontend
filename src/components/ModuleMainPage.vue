<template>
<v-card style="margin-top: 10%;">
  <v-container style="background-color:rgb(var(--v-theme-green));">
    <v-row align:start align-content:start >
      <v-col >
        <v-img :src=module.moduleThumbnail style="height: 16rem; width: 22rem"></v-img>
      </v-col>
    <v-col>
      <h1>{{module.moduleName}}</h1>
      <p>{{module.moduleDescription}}</p>
    </v-col>

    </v-row>
  </v-container>

<v-container>
  <v-row justify="center">
  <div style="display: inline-block"
      v-for="exercise in props.exercises"
      v-bind:key="exercise.id"

  >
    <MainpageCardModal class="exercisePanel"
        :exercise="exercise"
        :module="props.module"
    />

  </div>
  </v-row>
</v-container>
</v-card>
</template>

<script setup>
import MainpageCardModal from "@/components/MainpageCardModal";
import {defineProps} from "vue";

const props = defineProps({
  module: Object,
  exercises: Object,
});


</script>

<style scoped>

.exercisePanel{
  width:28rem;
  height:30rem;
  padding: 1rem;
}
</style>
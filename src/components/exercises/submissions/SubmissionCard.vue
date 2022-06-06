<template>
  <v-card elevation="0" rounded="0">
    <v-btn
        @click="goBack"
        icon="mdi-menu-left"
        class="ma-2"
        variant="outlined"/>
    <v-container>
      <v-card-title class="text-h4">{{$t('submission.submitted-solutions.title')}}</v-card-title>
      <v-card-text>{{$t('submission.submitted-solutions.no-solutions')}}</v-card-text>
    </v-container>
    <v-divider/>
    <v-container>
      <v-card-title class="text-h4">{{$t('submission.submit-a-solution.title')}} Aufgabe mit der ID {{exerciseId}}</v-card-title>
      <v-card-text v-if="gotSubmission">Für diese Aufgabe wurde bereits eine Lösung abgegeben.  Dies dient nur Testzwecken.</v-card-text>
      <v-card-text v-else>Für diese Aufgabe wurde noch keine Lösung abgegeben. Dies dient nur Testzwecken.</v-card-text>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
  import router from "@/router";
  import SubmissionService from "@/services/SubmissionService";
  import { onBeforeMount, ref } from "vue";
    let exerciseId: number = Number(router.currentRoute.value.params.id); //is it ok to get the exercise-id from the url?
    let gotSubmission = ref(false);
    let submissions;

    onBeforeMount(async () => {
      submissions = (await SubmissionService.getSubmissionsForExercise(exerciseId)).data;
      gotSubmission.value = submissions.length; //does the exercise have submissions or not?
    });

  function goBack(): void {
    router.back();
  }
</script>
<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>

</style>
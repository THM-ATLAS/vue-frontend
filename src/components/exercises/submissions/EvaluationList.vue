<template>
  <v-card elevation="0" rounded="0">
    <v-btn
        @click="goBack"
        icon="mdi-menu-left"
        class="ma-2"
        variant="outlined"/>
    <br>
    <v-card-title class="text-h4">{{$t('submission_list.title')}} "{{exercise.title}}"</v-card-title>
    <v-card-text v-if="!submissions.length">{{$t('submission_list.no_solutions')}}</v-card-text>
    <v-container>
      <v-card-text>
        <v-table>
          <thead>
            <tr>
              <th>{{ $t('submission.submitted-solutions.table-header.submission-id') }}</th>
              <th>{{ $t('submission_list.table.user_id') }}</th>
              <th>{{ $t('submission.submitted-solutions.table-header.type') }}</th>
              <th>{{ $t('submission.submitted-solutions.table-header.date') }}</th>
              <th>{{ $t('submission_list.table.status.title') }}</th>
              <th>{{ $t('submission_list.table.evaluate') }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="submissions.length">
              <tr v-for="s in submissions" :key="s.submission_id"> <!-- loop through the submissions array -->
                <td>{{s.submission_id}}</td>
                <td>{{s.user_id}}</td>
                <td>{{exercise.type}}</td>
                <td>{{new Date(s.upload_time).toLocaleString()}}</td>
                <td v-if="!s.grade">{{$t('submission_list.table.status.pending')}}</td>
                <td v-else>{{$t('submission_list.table.status.evaluated')}}</td>
                <td>
                  <v-btn
                      @click="visitEvaluation(s)"
                      icon="mdi-open-in-new"
                      small
                      elevation="0"
                      color="success"
                      class="ma-1"
                      rounded="0"
                      variant="outlined"
                  />
                </td>
              </tr>
            </template>
            <template v-else>
              <tr>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>-</td>
                <td>
                  <v-btn
                      icon="mdi-open-in-new"
                      small
                      elevation="0"
                      color="error"
                      class="ma-1"
                      rounded="0"
                      variant="outlined"
                  />
                </td>
              </tr>
            </template>
          </tbody>
        </v-table>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
  import router from "@/router";
  import {onBeforeMount, ref, Ref} from "vue";
  import {Exercise, Submission} from "@/helpers/types";
  import ExerciseService from "@/services/ExerciseService";
  import SubmissionService from "@/services/SubmissionService";

  const exerciseId: number = Number(router.currentRoute.value.params.id);
  const exercise: Ref<Exercise> = ref({}) as Ref<Exercise>;
  const submissions: Ref<Submission[]> = ref([]);

  onBeforeMount(async () => {

    await getExercise();
    await getSubmissions();

  });

  async function getExercise(): Promise<void> {
    exercise.value = (await ExerciseService.getExercise(exerciseId)).data;
  }

  async function getSubmissions() {
    submissions.value = (await SubmissionService.getSubmissionsForExercise(exerciseId)).data;
  }

  function goBack(): void {
    router.back();
  }

  function visitEvaluation(s: Submission) {
    router.push(`/${exercise.value.module.module_id}/eval/${exerciseId}/${s.submission_id}`);
  }
</script>

<style scoped>

</style>
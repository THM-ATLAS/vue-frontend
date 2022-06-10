<template>
  <v-card elevation="0" rounded="0">
    <v-card-title class="text-h4">{{$t('submission.specific-submission.title')}} "{{name}}"</v-card-title>
    <v-container>
      <v-card-text>
        <v-table>
          <thead>
          <tr>
            <th>{{ $t('submission.submitted-solutions.table-header.submission-id') }}</th>
            <th>{{ $t('submission.submitted-solutions.table-header.type') }}</th>
            <th>{{ $t('submission.submitted-solutions.table-header.date') }}</th>
            <th>{{ $t('submission.submitted-solutions.table-header.grade') }}</th>
            <th>{{ $t('submission.submitted-solutions.table-header.evaluated-by') }}</th>
            <th>{{ $t('submission.submitted-solutions.table-header.comment') }}</th>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td>{{submission.submission_id}}</td>
            <td>{{exercise.type}}</td>
            <td>{{new Date(submission.upload_time).toLocaleString()}}</td>
            <td v-if="submission.grade">{{submission.grade}}%</td>
            <td v-else></td>
            <td>{{teacher}}</td>
            <td>{{submission.comment}}</td>
          </tr>
          </tbody>
        </v-table>
        <div id="submission">
          {{submissionContent}}
        </div>
      </v-card-text>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
  import router from "@/router";
  import {onBeforeMount, Ref, ref} from "vue";
  import ExerciseService from "@/services/ExerciseService";
  import SubmissionService from "@/services/SubmissionService";
  import UserService from "@/services/UserService";
  import {Exercise, Submission} from "@/helpers/types";

  let exerciseId: number = Number(router.currentRoute.value.params.id); //is it ok to get the exercise-id from the url?
  let name = ref("");
  let submission: Ref<Submission> = ref({}) as Ref<Submission>;
  let exercise: Ref<Exercise> = ref({}) as Ref<Exercise>;
  let submissionContent = ref("");
  let teacher = ref("");

  onBeforeMount(async () => {
    exercise.value = (await ExerciseService.getExercise(exerciseId)).data;
    name.value = exercise.value.title;
    await getSubmission();
    submissionContent.value = submission.value.file;
    if(submission.value.teacher_id) teacher.value = (await UserService.getUser(submission.value.teacher_id)).data.name;
  })

  async function getSubmission() {
    submission.value = (await SubmissionService.getSubmissionById(exerciseId, Number(router.currentRoute.value.params.sid))).data;
  }

</script>

<style scoped lang="scss">
#submission {
  margin-top: 40px;
  padding: 20px;
  background: rgb(var(--v-theme-background));
}
</style>
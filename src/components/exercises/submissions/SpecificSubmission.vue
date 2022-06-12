<template>
  <v-card elevation="0" rounded="0">
    <v-btn
        @click="goBack"
        icon="mdi-menu-left"
        class="ma-2"
        variant="outlined"/>
    <br>
    <v-card-title class="text-h4">{{ $t('submission.specific-submission.title') }} "{{ exerciseTitle }}"</v-card-title>
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
            <td v-else>-</td>
            <td v-if="teacherName">{{ teacherName }}</td>
            <td v-else>-</td>
            <td v-if="submission.comment">{{submission.comment}}</td>
            <td v-else>-</td>
          </tr>
          </tbody>
        </v-table>
        <div id="submission">
          <pre>{{submissionContent}}</pre>
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

  const exerciseId: number = Number(router.currentRoute.value.params.id);
  const exerciseTitle = ref("");
  const exercise: Ref<Exercise> = ref({}) as Ref<Exercise>;
  const submission: Ref<Submission> = ref({}) as Ref<Submission>;
  const submissionContent = ref("");
  const teacherName = ref("");

  onBeforeMount(async () => {
    exercise.value = (await ExerciseService.getExercise(exerciseId)).data;
    exerciseTitle.value = exercise.value.title;

    submission.value = (await SubmissionService.getSubmissionById(exerciseId, Number(router.currentRoute.value.params.sid))).data;
    submissionContent.value = submission.value.file;
    if(submission.value.teacher_id) teacherName.value = (await UserService.getUser(submission.value.teacher_id.toString())).data.name;
  })

  function goBack(): void {
    router.back();
  }

</script>

<style scoped lang="scss">
#submission {
  margin-top: 40px;
  padding: 20px;
  background: rgb(var(--v-theme-background));
  overflow: scroll;
}
</style>
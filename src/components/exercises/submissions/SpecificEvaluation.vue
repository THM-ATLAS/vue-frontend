<template>
  <v-card elevation="0" rounded="0">
    <v-btn
      @click="goBack"
      icon="mdi-menu-left"
      class="ma-2"
      variant="outlined"/>
    <br>
    <v-card-title class="text-h4">{{ $t('evaluation.title') }} ID {{ submissionId }}</v-card-title>
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
            <td>{{submission.teacher_id}}</td>
            <td>{{submission.comment}}</td>
          </tr>
          </tbody>
        </v-table>
        <br><br>
        <v-card-title class="text-h5">
          {{ $t('evaluation.solution') }}
        </v-card-title>
        <v-container>
          <div id="submission">
            {{submissionContent}}
          </div>
        </v-container>
      </v-card-text>
    </v-container>
    <v-divider></v-divider>
    <v-container>
      <v-card-title class="text-h5">
        {{ $t('evaluation.comment') }}
      </v-card-title>
      <v-form class="pa-4 pt-6">
        <v-slider
            v-model="grade"
            :max="100"
            step="1"
            ticks="always"
            tick-size="10"
            thumb-label="always"
        ></v-slider>
      </v-form>
      <v-form ref="form" class="pa-4 pt-6">
        <v-textarea v-model="formInput"
                    filled
                    counter="6"
                    :label="$t('evaluation.comment_form')"
        ></v-textarea>
      </v-form>
      <v-btn v-if="evaluationUpdated()" @click="submitEvaluation" prepend-icon="mdi-file-check" variant="outlined">{{$t('buttons.evaluate')}}</v-btn>
      <v-btn disabled v-else prepend-icon="mdi-file-check" variant="outlined">{{$t('buttons.evaluate')}}</v-btn>
    </v-container>
  </v-card>
</template>
<script setup lang="ts">
  import router from "@/router";
  import {onBeforeMount, Ref, ref} from "vue";
  import {Exercise, Submission} from "@/helpers/types";
  import SubmissionService from "@/services/SubmissionService";
  import ExerciseService from "@/services/ExerciseService";
  import UserService from "@/services/UserService";

  let formInput = ref("");
  let exerciseId: number = Number(router.currentRoute.value.params.id); //is it ok to get the exercise-id from the url?
  let submissionId: number = Number(router.currentRoute.value.params.sid); //is it ok to get the exercise-id from the url?
  let submission: Ref<Submission> = ref({}) as Ref<Submission>;
  let submissionContent = ref("");
  let exercise: Ref<Exercise> = ref({}) as Ref<Exercise>;
  let grade = ref(0);
  let loggedInUser;

  onBeforeMount(async () => {
    await getSubmission();
    submissionContent.value = submission.value.file;
    formInput.value = submission.value.comment ? submission.value.comment : "";
    exercise.value = (await ExerciseService.getExercise(exerciseId)).data;
  })

  async function getSubmission() {
    submission.value = (await SubmissionService.getSubmissionById(exerciseId, Number(router.currentRoute.value.params.sid))).data;
  }

  async function getLoggedInUser() {
    loggedInUser = (await UserService.getMe()).data; //get logged in user
  }

  async function submitEvaluation() {
    await getLoggedInUser();
    //overwrite grade, comment and teacher_id of submission
    let s: Submission = {
      submission_id : submission.value.submission_id,
      exercise_id: exerciseId,
      user_id : submission.value.user_id,
      file: submission.value.file,
      upload_time: submission.value.upload_time,
      grade: grade.value,
      teacher_id: loggedInUser.user_id,
      comment: formInput.value
    }
    await SubmissionService.adjustSubmission(s);
  }

  function evaluationUpdated() {
    let commentHasChanged = submission.value.comment == formInput.value;
    let gradeHasChanged = submission.value.grade == grade.value;
    return !commentHasChanged || !gradeHasChanged;
  }

  function goBack(): void {
    router.back();
  }
</script>

<style scoped lang="scss">
#submission {
  padding: 20px;
  background: rgb(var(--v-theme-background));
}
</style>
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
            <td v-if="submission.grade !== null">{{submission.grade}}%</td>
            <td v-else>-</td>
            <td v-if="teacher">{{teacher}}</td>
            <td v-else>-</td>
            <td v-if="submission.comment">{{submission.comment}}</td>
            <td v-else>-</td>
          </tr>
          </tbody>
        </v-table>
        <br><br>
        <v-card-title class="text-h5">
          {{ $t('evaluation.solution') }}
        </v-card-title>
        <v-container>
          <div id="submission">
            <pre>{{submissionContent}}</pre>
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
            tick-size="10"
            thumb-label="always"
        ></v-slider>
      </v-form>
      <v-form ref="form" class="pa-4 pt-6">
        <v-textarea v-model="formInput"
                    filled
                    :label="$t('evaluation.comment_form')"
        ></v-textarea>
      </v-form>
      <v-card-actions>
        <v-btn @click="submitEvaluation" color="primary">{{$t('buttons.save')}}</v-btn>
        <v-btn @click="goBack" color="red">{{$t('buttons.cancel')}}</v-btn>
        <v-btn @click="deleteEvaluation">{{$t('buttons.delete')}}</v-btn>
      </v-card-actions>
    </v-container>
  </v-card>
</template>
<script setup lang="ts">
  import router from "@/router";
  import {onBeforeMount, Ref, ref} from "vue";
  import {Exercise, Submission, User} from "@/helpers/types";
  import SubmissionService from "@/services/SubmissionService";
  import ExerciseService from "@/services/ExerciseService";
  import UserService from "@/services/UserService";

  const formInput = ref("");
  const exerciseId: number = Number(router.currentRoute.value.params.id);
  const submissionId: number = Number(router.currentRoute.value.params.sid);
  const submission: Ref<Submission> = ref({}) as Ref<Submission>;
  const submissionContent = ref("");
  const exercise: Ref<Exercise> = ref({}) as Ref<Exercise>;
  const grade = ref(0);
  const teacher = ref("");
  const loggedInUser: Ref<User> = ref({}) as Ref<User>;

  onBeforeMount(async () => {
    submission.value = (await SubmissionService.getSubmissionById(exerciseId, Number(router.currentRoute.value.params.sid))).data;
    submissionContent.value = submission.value.file;
    if(submission.value.grade !== null) grade.value = submission.value.grade;

    formInput.value = submission.value.comment ? submission.value.comment : "";
    exercise.value = (await ExerciseService.getExercise(exerciseId)).data;
    if(submission.value.teacher_id) teacher.value = (await UserService.getUser(submission.value.teacher_id.toString())).data.name;
  })

  async function submitEvaluation() {
    loggedInUser.value = (await UserService.getMe()).data; //get logged in user
    //overwrite grade, comment and teacher_id of submission
    const s: Submission = {
      submission_id : submission.value.submission_id,
      exercise_id: exerciseId,
      user_id : submission.value.user_id,
      file: submission.value.file,
      upload_time: submission.value.upload_time,
      grade: grade.value,
      teacher_id: Number(loggedInUser.value.user_id),
      comment: formInput.value
    }
    await SubmissionService.adjustSubmission(s);
    goBack();
  }
  async function deleteEvaluation() {
    //overwrite grade, comment and teacher_id of submission
    const s: Submission = {
      submission_id : submission.value.submission_id,
      exercise_id: exerciseId,
      user_id : submission.value.user_id,
      file: submission.value.file,
      upload_time: submission.value.upload_time,
      grade: null,
      teacher_id: null,
      comment: null
    }
    await SubmissionService.adjustSubmission(s);
    goBack();
  }

  function goBack(): void {
    router.back();
  }
</script>

<style scoped lang="scss">
#submission {
  padding: 20px;
  background: rgb(var(--v-theme-background));
  overflow: scroll;
}
</style>
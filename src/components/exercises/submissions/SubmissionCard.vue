<template>
  <v-card elevation="0" rounded="0">
    <v-btn
        @click="goBack"
        icon="mdi-menu-left"
        class="ma-2"
        variant="outlined"/>
    <br>
    <v-card-title class="text-h4">{{$t('submission.title')}} "{{exercise.title}}"</v-card-title>
    <v-container v-if="filteredSubmissions.length">
      <v-card-title class="text-h5">{{$t('submission.submitted-solutions.title')}}</v-card-title>
      <v-table>
          <thead>
            <tr>
              <th>{{ $t('submission.submitted-solutions.table-header.submission-id') }}</th>
              <th>{{ $t('submission.submitted-solutions.table-header.type') }}</th>
              <th>{{ $t('submission.submitted-solutions.table-header.date') }}</th>
              <th>{{ $t('submission.submitted-solutions.table-header.grade') }}</th>
              <th>{{ $t('submission.submitted-solutions.table-header.evaluated-by') }}</th>
              <th>{{ $t('submission.submitted-solutions.table-header.comment') }}</th>
              <th>{{ $t('submission.submitted-solutions.table-header.view-submission') }}</th>
            </tr>
          </thead>
          <tbody>
            <template v-if="filteredSubmissions.length">
              <tr v-for="s in filteredSubmissions" :key="s.submission_id"> <!-- loop through the submissions array! -->
                <td>{{s.submission_id}}</td>
                <td>{{exercise.type}}</td>
                <td>{{new Date(s.upload_time).toLocaleString()}}</td>
                <td v-if="s.grade">{{s.grade}}%</td>
                <td v-else>-</td>
                <td v-if="s.teacher_id">{{s.teacher_id}}</td>
                <td v-else>-</td>
                <td v-if="s.comment">{{s.comment}}</td>
                <td v-else>-</td>
                <td>
                  <v-btn
                         @click="visitSubmission(s)"
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
    </v-container>
    <v-container v-else>
      <v-card-title class="text-h5">{{$t('submission.submit-a-solution.title')}}</v-card-title>
      <v-form v-if="submissionType === 'Freitext'"
          ref="form"
          class="pa-4 pt-6"
      >
        <v-textarea v-model="formInput"
            filled
            counter="6"
            :label="$t('submission.submit-a-solution.form-placeholder')"
        ></v-textarea>
      </v-form>
      <v-btn v-if="formInput" @click="submitSolution" prepend-icon="mdi-upload" variant="outlined">{{$t('buttons.submit')}}</v-btn>
      <v-btn disabled v-else prepend-icon="mdi-upload" variant="outlined">{{$t('buttons.submit')}}</v-btn>
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import router from "@/router";
import SubmissionService from "@/services/SubmissionService";
import {onBeforeMount, Ref, ref} from "vue";
import UserService from "@/services/UserService";
import ExerciseService from "@/services/ExerciseService";
import {Exercise, Submission, User} from "@/helpers/types"

const exerciseId: number = Number(router.currentRoute.value.params.id);
const loggedInUser: Ref<User> = ref({}) as Ref<User>;
const exercise: Ref<Exercise> = ref({}) as Ref<Exercise>;
const filteredSubmissions: Ref<Submission[]> = ref([]);
const usersSubmissions: Ref<Submission[]> = ref([]);
const submissionType = ref("");
const formInput = ref("")

onBeforeMount(async () => {

  exercise.value = (await ExerciseService.getExercise(exerciseId)).data;
  submissionType.value = exercise.value.type; //get submission type of exercise

  loggedInUser.value = (await UserService.getMe()).data;
  await getLoggedInUsersSubmissions();

  await replaceTeacherIds();

});

async function getLoggedInUsersSubmissions(): Promise<void> {
  const apiUsersSubmissions = (await SubmissionService.getUserSubmissions(Number(loggedInUser.value.user_id))).data; //get all submissions of logged in user
  apiUsersSubmissions.forEach((result: Submission) => {
    usersSubmissions.value.push(result);
  })
  filteredSubmissions.value = usersSubmissions.value.filter(s => s.exercise_id === exerciseId); //filter submissions: only submissions for this exercise
}

async function replaceTeacherIds(): Promise<void> {

  //get the names of the users/teachers that evaluated the submissions
  for(let i = 0; i<filteredSubmissions.value.length; i++) {
    if (filteredSubmissions.value[i].teacher_id !== null)  //submissions have a teacher_id = null, if the evaluation is pending
      filteredSubmissions.value[i].teacher_id = ((await UserService.getUser(filteredSubmissions.value[i].teacher_id.toString())).data.name); //replaces id with name: not the best solution

  }
}

async function submitSolution() {
  const s: Submission = {
    submission_id : 0,
    exercise_id: exerciseId,
    user_id : Number(loggedInUser.value.user_id),
    file: formInput.value,
    upload_time: new Date().toISOString(),
    grade: null,
    teacher_id: null,
    comment: null
  }
  await SubmissionService.postSubmission(s);
  goBack();
}

function goBack(): void {
  router.back();
}

function visitSubmission(s: any) {
  router.push(`/${exercise.value.module.module_id}/s/${exerciseId}/${s.submission_id}`);
}

</script>
<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>

</style>
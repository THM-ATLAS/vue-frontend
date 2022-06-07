<template>
  <v-card elevation="0" rounded="0">
    <v-btn
        @click="goBack"
        icon="mdi-menu-left"
        class="ma-2"
        variant="outlined"/>
    <v-container>
      <v-card-title class="text-h4">{{$t('submission.submitted-solutions.title')}} ID {{exerciseId}}</v-card-title>
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
        <tr>
          <td>13</td>
          <td>{{ $t('submission.submitted-solutions.submission-types.file-upload') }}</td>
          <td>06.06.2022, 23:46:15</td>
          <td>75%</td>
          <td>Nina Hammer</td>
          <td>Bei den Aufgaben 2 und 3 fehlt jeweils die Ausgabe des Arrays, sowie die...</td>
          <td>
            <v-btn
                @click="visitExercise(exercise)"
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
        <tr>
          <td>14</td>
          <td>{{ $t('submission.submitted-solutions.submission-types.multiple-choice') }}</td>
          <td>08.06.2022, 14:09:02</td>
          <td>100%</td>
          <td>Nina Hammer</td>
          <td>-</td>
          <td>
            <v-btn
                @click="visitExercise(exercise)"
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
        <!--tr v-for="exercise in exercises" v-bind:key="exercise.id">
          <td>{{ exercise.title }}</td>
          <td>{{ exercise.module.name }}</td>
          <td v-if="exercise.description">{{ exercise.description }}</td>
          <td v-else style="opacity: 70%">{{ $t('admin.exercises.no_description') }}</td>
          <td>
            <v-btn
                @click="viewExerciseDialog.show = true; viewExerciseDialog.target = exercise"
                icon="mdi-file-eye"
                small
                elevation="0"
                color="secondary"
                class="ma-1"
                rounded="0"
            />
            <v-btn
                @click="goToEditor(exercise)"
                icon="mdi-file-document-edit"
                small
                elevation="0"
                color="primary"
                class="ma-1"
                rounded="0"
                variant="outlined"
            />
            <v-btn
                @click="deleteExerciseDialog.show = true; deleteExerciseDialog.target = exercise"
                icon="mdi-file-remove"
                small
                elevation="0"
                color="error"
                class="ma-1"
                rounded="0"
                variant="outlined"
            />
            <v-btn
                @click="visitExercise(exercise)"
                icon="mdi-open-in-new"
                small
                elevation="0"
                color="success"
                class="ma-1"
                rounded="0"
                variant="outlined"
            />
          </td>
        </tr-->
        </tbody>
      </v-table>
      <br><br><br><br>
      <v-card-title class="text-h4">{{$t('submission.submitted-solutions.title')}} ID {{exerciseId}}</v-card-title>
      <v-card-text>{{$t('submission.submitted-solutions.no-solutions')}}</v-card-text>
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
                variant="outlined disabled"
            />
          </td>
        </tr>
        <!--tr v-for="exercise in exercises" v-bind:key="exercise.id">
          <td>{{ exercise.title }}</td>
          <td>{{ exercise.module.name }}</td>
          <td v-if="exercise.description">{{ exercise.description }}</td>
          <td v-else style="opacity: 70%">{{ $t('admin.exercises.no_description') }}</td>
          <td>
            <v-btn
                @click="viewExerciseDialog.show = true; viewExerciseDialog.target = exercise"
                icon="mdi-file-eye"
                small
                elevation="0"
                color="secondary"
                class="ma-1"
                rounded="0"
            />
            <v-btn
                @click="goToEditor(exercise)"
                icon="mdi-file-document-edit"
                small
                elevation="0"
                color="primary"
                class="ma-1"
                rounded="0"
                variant="outlined"
            />
            <v-btn
                @click="deleteExerciseDialog.show = true; deleteExerciseDialog.target = exercise"
                icon="mdi-file-remove"
                small
                elevation="0"
                color="error"
                class="ma-1"
                rounded="0"
                variant="outlined"
            />
            <v-btn
                @click="visitExercise(exercise)"
                icon="mdi-open-in-new"
                small
                elevation="0"
                color="success"
                class="ma-1"
                rounded="0"
                variant="outlined"
            />
          </td>
        </tr-->
        </tbody>
      </v-table>
      <br><br><br><br>
    </v-container>
    <v-divider/>
    <v-container>
      <v-card-title class="text-h4">{{$t('submission.submit-a-solution.title')}} ID {{exerciseId}}</v-card-title>
      <v-card-text v-if="gotSubmission">Für diese Aufgabe wurde bereits eine Lösung abgegeben.  Dies dient nur Testzwecken.</v-card-text>
      <v-card-text v-else>Für diese Aufgabe wurde noch keine Lösung abgegeben. Dies dient nur Testzwecken.</v-card-text>
      <v-form
          ref="form"
          class="pa-4 pt-6"
      >
        <v-textarea
            filled
            :rules="[rules.required]"
            color="deep-purple"
            counter="6"
            label="Schreibe hier deine Lösung hinein..."
        ></v-textarea>
      </v-form>
      <v-btn>{{$t('buttons.submit')}}</v-btn>
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

  const rules = {
    required: (value: any) => !!value || "Dieses Feld ist erforderlich",
  };

</script>
<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>

</style>
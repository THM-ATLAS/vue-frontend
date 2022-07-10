<template>
  <v-card elevation="0" rounded="0">
    <v-tooltip bottom>
      <template v-slot:activator="{ props: tooltip3 }">
        <v-btn
            v-bind="tooltip3"
            @click="goBack"
            icon="mdi-menu-left"
            class="ma-2"
            variant="outlined"/>
      </template>
      <span v-html="$t('buttons.back')"/>
    </v-tooltip>
    <v-tooltip v-if="filteredSubmission" bottom>
      <template v-slot:activator="{ props: tooltip3 }">
        <v-btn
            v-bind="tooltip3"
            icon="mdi-file-document-edit"
            class="ma-2"
            variant="outlined"
            @click='goToEditor'/>
      </template>
      <span v-html="$t('submission.edit_submission')"/>
    </v-tooltip>
    <br>
    <v-card-title class="text-h4">{{$t('submission.title')}} "{{exercise.title}}"</v-card-title>
    <v-container v-if="filteredSubmission">
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
            </tr>
          </thead>
          <tbody>
            <template v-if="filteredSubmission">
              <tr>
                <td>{{filteredSubmission.submission_id}}</td>
                <td>{{exercise.type}}</td>
                <td>{{new Date(filteredSubmission.upload_time).toLocaleString()}}</td>
                <td v-if="filteredSubmission.grade">{{filteredSubmission.grade}}%</td>
                <td v-else>-</td>
                <td v-if="teacher">{{teacher}}</td>
                <td v-else>-</td>
                <td v-if="filteredSubmission.comment">{{filteredSubmission.comment}}</td>
                <td v-else>-</td>
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
              </tr>
            </template>
          </tbody>
        </v-table>
      <v-card elevation="0" id="submission-card">
        <pre v-html="submissionContent"></pre>
      </v-card>
    </v-container>
    <v-container v-else>
      <v-card-title class="text-h5">{{$t('submission.submit-a-solution.title')}}</v-card-title>
      <!-- 1=Freitext, 2=Code, 3=Multiple Choice, 4=Dateiupload -->
      <v-form v-if="submissionType === 1 || 2"
          ref="form"
          class="pa-4 pt-6"
      >
        <v-textarea v-model="formInput"
            filled
            :label="$t('submission.submit-a-solution.form-placeholder')"
        ></v-textarea>
      </v-form>
      <!--v-form v-if="submissionType === 2"
              ref="form"
              class="pa-4 pt-6"
      >
        <CodeEditor
            width="auto"
            min_height="20vh"
            :wrap_code="true"
            :language_selector="true"
            :languages="codeLanguages"
            v-model="chosenLanguage"
            :copy_code="true"
            :value="formInput"
            class="ma-2"
            selector_height="15vh"
        >
        </CodeEditor>
      </v-form-->
      <v-card-actions>
        <v-btn @click="submitSolution" color="primary">{{$t('buttons.save')}}</v-btn>
        <v-btn @click="goBack" color="red">{{$t('buttons.cancel')}}</v-btn>
      </v-card-actions>
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
import CodeEditor from 'simple-code-editor/CodeEditor.vue'
import {useI18n} from "vue-i18n";
import MarkdownModal from "@/components/helpers/MarkdownModal.vue";

const exerciseId: number = Number(router.currentRoute.value.params.id);
const loggedInUser: Ref<User> = ref({}) as Ref<User>;
const exercise: Ref<Exercise> = ref({}) as Ref<Exercise>;
const filteredSubmission: Ref<Submission | undefined> = ref({}) as Ref<Submission | undefined>;
const usersSubmissions: Ref<Submission[]> = ref([]);
const submissionType = ref(0);
const formInput = ref("")
const teacher = ref("");
const sid = ref(0);
const i18n = useI18n();
const codeLanguages = ref([]);
const chosenLanguage = ref()
const submissionContent = ref("")

onBeforeMount(async () => {
  exercise.value = (await ExerciseService.getExercise(exerciseId)).data;
  submissionType.value = Number(exercise.value.type); //get submission type of exercise
  //if(submissionType.value===2) formInput.value = ref("//"+i18n.t('submission.submitted-solutions.submission-types.code.placeholder'));
  const languages = (await SubmissionService.getLanguages()).data;
  languages.forEach(l => codeLanguages.value.push([l.name]));

  loggedInUser.value = (await UserService.getMe()).data;
  await getLoggedInUsersSubmissions();


  if(filteredSubmission.value) {
    if(filteredSubmission.value.teacher_id) teacher.value = (await UserService.getUser(filteredSubmission.value.teacher_id)).data.name;
    sid.value = filteredSubmission.value.submission_id;
    submissionContent.value = filteredSubmission.value.content.content;
  }
});

async function getLoggedInUsersSubmissions(): Promise<void> {
  filteredSubmission.value = (await SubmissionService.getCurrentSubmission(exerciseId)).data
  if (filteredSubmission.value?.content.content == "") filteredSubmission.value = undefined;

}

async function submitSolution() {
  const apiTypes = (await ExerciseService.getExerciseTypes()).data;
  let type = apiTypes.find(t => t.type_id === exercise.value.type).name;

  const s: Submission = {
    submission_id : 0,
    exercise_id: exerciseId,
    user_id : Number(loggedInUser.value.user_id),
    upload_time: new Date().toISOString(),
    grade: null,
    teacher_id: null,
    comment: null,
    type: exercise.value.type,
    content: {
      type: getEnglishTypeName(),
      submission_id: 0,
      content: formInput.value,
      language: null
    }
  }
  await SubmissionService.postSubmission(s);
  goBack();
}

function getEnglishTypeName() {
  if(exercise.value.type == 1) return "free";
  if(exercise.value.type == 2) return "code";
  if(exercise.value.type == 3) return "mc";
  if(exercise.value.type == 4) return "file";
}

function goToEditor() {
  router.push(`/${exercise.value.module.module_id}/s/${exerciseId}/edit/${sid.value}`);
}

function goBack(): void {
  router.back();
}

</script>
<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
#submission-card {
  overflow: scroll;
  background: rgb(var(--v-theme-background));
  margin-top: 2%;
}
</style>
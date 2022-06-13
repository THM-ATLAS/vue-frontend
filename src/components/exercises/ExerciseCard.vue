<template>
  <v-card elevation="0" rounded="0" role="main">
    <div class="mx-2 my-2">
      <div class="pt-0 pl-0">
        <v-row>
          <v-col>
            <v-btn
                @click="goBack"
                icon="mdi-menu-left"
                class="ma-2"
                variant="outlined"/>
            <v-tooltip bottom>
              <template v-slot:activator="{ props: tooltip3 }">
                <v-btn
                    v-bind="tooltip3"
                    icon="mdi-file-document-edit"
                    class="ma-2"
                    variant="outlined"
                    @click='goToEditor'/>
              </template>
              <span v-html="$t('exercise.edit')"/>
            </v-tooltip>
          </v-col>
          <v-col v-if="loggedIn" align-self="center" class="button-col">
            <v-btn @click="goToSubmission" prepend-icon="mdi-upload" variant="outlined" elevation="0" outlined>
              {{$t('exercise.submit.button')}}
            </v-btn><br><br>
            <v-btn @click="goToSubmissionsList" prepend-icon="mdi-human-male-board" variant="outlined" elevation="0" outlined>
              {{$t('buttons.view_submissions')}}
            </v-btn>
          </v-col>
          <v-col v-else align-self="center" class="button-col">
            <v-tooltip bottom>
              <template v-slot:activator="{ props }">
                <div v-bind="props">
                  <v-btn disabled @click="goToSubmission" prepend-icon="mdi-upload" variant="outlined" elevation="0" outlined>
                    {{$t('exercise.submit.button')}}
                </v-btn>
                </div>
              </template>
              <span>{{$t('exercise.submit.tooltip')}}</span>
            </v-tooltip>
          </v-col>
        </v-row>
        <!--v-btn
            rounded="xl"
            @click="saved = !saved"
            class="ma-2 pa-6"
            variant="outlined">
          <div v-if='!saved'>
            <v-icon>mdi-content-save</v-icon>
            Speichern
          </div>
          <div v-else>
            <v-icon>mdi-check</v-icon>
            Gespeichert
          </div>
        </v-btn-->

        <!--v-dialog
            v-model="dialog"
            persistent
        >
          <template v-slot:activator="{ props: dialog }">
            <v-tooltip bottom>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                    v-bind="mergeProps(dialog, tooltip)"
                    icon="mdi-alert-circle"
                    class="ma-2"
                    variant="outlined"/>
              </template>
              <span>Fehler melden</span>
            </v-tooltip>
          </template>
          <v-card width="auto">
            <v-card-title>
              <span class="text-h5">Fehler melden</span>
            </v-card-title>
            <v-card-text>
              <v-textarea v-model="error"></v-textarea>
            </v-card-text>
            <v-card-actions justify="space-between">
              <v-btn color="primary" @click="dialog = false; reportError(error); error = '';" :disabled="!error">
                Senden
              </v-btn>
              <v-btn text @click="dialog = false">Abbrechen</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog-->

        <!--v-dialog
            v-model="dialog2"
            persistent
        >
          <template v-slot:activator="{ props: dialog2 }">
            <v-tooltip bottom>
              <template v-slot:activator="{ props: tooltip2 }">
                <v-btn
                    v-bind="mergeProps(dialog2, tooltip2)"
                    icon="mdi-star"
                    class="ma-2"
                    variant="outlined"
                    @click="dialog2 = true"/>
              </template>
              <span>Feedback & Bewerten</span>
            </v-tooltip>
          </template>
          <FeedbackModal @close="dialog2 = false" close-variable/>
        </v-dialog-->

        <!--v-tooltip bottom>
          <template v-slot:activator="{ props: tooltip4 }">
            <v-btn
                v-bind="tooltip4"
                icon="mdi-message-star"
                class="ma-2"
                variant="outlined"
                @click='this.$router.push("feedback");'/>
          </template>
          <span>Feedback ansehen</span>
        </v-tooltip-->
        <v-chip
        v-for="t in tags"
        v-bind:key="t.id">
          {{ t.name }}
        </v-chip>
      </div>
      <div>
        <v-card-title class="text-left text-h4" style="padding-left: 0;"> {{ exercise.title }}</v-card-title>
      </div>
      <!--v-container v-if="exercise.images_before && exercise.images_before.length > 0" class="text-left">
        <v-carousel v-model="carousel1" :cycle="false">
          <v-carousel-item v-for="image in exercise.images_before" :key="image.id">
            <v-img :src="image.url" :aspect-ratio="image.aspect_ratio"/>
          </v-carousel-item>
        </v-carousel>
      </v-container>
      <v-container v-else-if="exercise.images_before && exercise.images_before.length === 1" class="text-left">
        <v-img :src="exercise.images_before[0].url" :aspect-ratio="exercise.images_before[0].aspect_ratio"/>
      </v-container-->

      <div class="py-1">
        <MarkdownModal :model-value="exercise.content"/>
      </div>

      <!--v-container v-if="exercise.images_after && exercise.images_after.length > 1" class="text-left">
        <v-carousel v-model="carousel2" :cycle="false">
          <v-carousel-item v-for="image in exercise.images_after" :key="image.id">
            <v-img :src="image.url" :aspect-ratio="image.aspect_ratio"/>
          </v-carousel-item>
        </v-carousel>
      </v-container>
      <v-container v-else-if="exercise.images_after && exercise.images_after.length === 1" class="text-left">
        <v-img :src="exercise.images_after[0].url" :aspect-ratio="exercise.images_after[0].aspect_ratio"/>
      </v-container-->

      <!--v-btn
          v-if="!showSubmission && hasSubmission"
          @click="showSubmission = true"
          class="ma-2"
          rounded="0" variant="outlined">
        {{ getSubmitButton() }}
      </v-btn-->
    </div>
  </v-card>
  <!--br/>-->
  <!--div>
    <NewSubmission v-if="showSubmission" :exercise_id="exercise.id" :module="this.$route.params.module"/>
  </div>
  <h1></h1-->
</template>

<script setup lang='ts'>
// import FeedbackModal from "@/components/FeedbackModal.vue";
//import NewSubmission from "@/components/exercises/submissions/NewSubmission.vue";
import {useRouter, useRoute} from "vue-router";
import "md-editor-v3/lib/style.css";
import MarkdownModal from "@/components/helpers/MarkdownModal.vue";
import {onBeforeMount, Ref, ref} from "vue";
import ExerciseService from "@/services/ExerciseService";
import UserService from "@/services/UserService";
import {Exercise, User, Tag} from "@/helpers/types";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const user: Ref<User | undefined> = ref(undefined);
const loggedIn = ref(false);
onBeforeMount(async () => {
  user.value = (await UserService.getMe())?.data || undefined;
  loggedIn.value = !!user.value;
})

const exercise: Ref<Exercise | any> = ref({});
const tags: Ref<Tag[]> = ref([]);

onBeforeMount(async () => {
  exercise.value = (await ExerciseService.getExercise(id)).data
  await router.replace(`/${exercise.value.module.module_id}/e/${id}`)
  tags.value = exercise.value.tags;
  document.title = exercise.value.module.name + ' - ' + exercise.value.title
})

function goBack() {
  router.back()
}

function goToEditor(): void {
  router.push(`/${exercise.value.module.module_id}/e/${id}/edit`);
}

function goToSubmission() {
  router.push(`/${exercise.value.module.module_id}/s/${id}`);
}

function goToSubmissionsList() {
  router.push(`/${exercise.value.module.module_id}/eval/${id}`);
}

/*
function reportError(error: string): void {
  console.log(error);
}

function filterYAMLHeader(text: string): string {
  console.log(text.replace(/(-{3}|~{3})\n((.|\n)*?)(-{3}|~{3})\n/g, ""));
  return text.startsWith("---") ? text.replace(/(-{3}|~{3})\n((.|\n)*?)(-{3}|~{3})\n/g, "") : text;

}

function getSubmitButton(): string {
  return localStorage.getItem(`${module}.s.${id}`) ? 'Abgabe fertigstellen...' : 'Neue Abgabe...'
}
*/
//let showSubmission = ref(true);
/*
let saved = ref(false);
let error = ref('');
let dialog = ref(false);
let dialog2 = ref(false);

let hasSubmission = true;
*/
</script>

<style scoped>
  .button-col {
    text-align: end;
  }
</style>
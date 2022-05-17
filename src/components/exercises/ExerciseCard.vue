<template>
  <v-card elevation="0" rounded="0" role="main">
    <v-container class="pt-0 pl-0">
      <v-btn
          @click="goBack"
          icon="mdi-menu-left"
          class="ma-2"
          variant="outlined"/>

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

    </v-container>

    <v-card-title class="text-left text-h4"> {{exercise.title}} </v-card-title>

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

    <v-container class="py-1">
      <MarkdownModal :model-value="exercise.content"/>
    </v-container>

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

  </v-card>
  <!--br/>
  <div>
    <NewSubmission v-if="showSubmission" :exercise_id="exercise.id" :course="this.$route.params.course"/>
  </div-->
</template>

<style scoped>
</style>

<script setup lang='ts'>
// import FeedbackModal from "@/components/FeedbackModal.vue";
// import NewSubmission from "@/components/exercises/NewSubmission.vue";
import {useRouter, useRoute} from "vue-router";
import "md-editor-v3/lib/style.css";
import MarkdownModal from "@/components/helpers/MarkdownModal.vue";
import {onBeforeMount, reactive} from "vue";
import ExerciseService from "@/services/ExerciseService";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const course = route.params.course;
let exerciseData: any;

const exercise = reactive({
  id: -1,
  title: 'Loading title',
  content: 'Loading content',
  taskPublic: false
});

onBeforeMount(async () => {
  exerciseData = (await ExerciseService.getExercise(id)).data
  exercise.id = exerciseData.exercise_id
  exercise.title = exerciseData.title
  exercise.content = exerciseData.content
  exercise.taskPublic = exerciseData.exercisePublic

  await router.replace(`/${course}/e/${id}/${encodeURIComponent(exercise.title)}`)
})

function goBack() {
  router.back()
}

function goToEditor(): void {
  router.push('edit');
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
  return localStorage.getItem(`${course}.s.${id}`) ? 'Abgabe fertigstellen...' : 'Neue Abgabe...'
}

let showSubmission = ref(false);
let saved = ref(false);
let error = ref('');
let dialog = ref(false);
let dialog2 = ref(false);

let hasSubmission = true;
*/
</script>
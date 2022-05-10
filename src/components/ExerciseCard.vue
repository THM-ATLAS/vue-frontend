<template>
  <v-card elevation="0" rounded="0" role="main">
    <v-container class="pt-0 pl-0">
      <v-btn
          v-bind="props"
          @click="goBack"
          icon="mdi-menu-left"
          class="ma-2"
          variant="outlined"/>
      <v-btn
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
      </v-btn>

      <v-dialog
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
      </v-dialog>

      <v-dialog
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
      </v-dialog>
      <v-tooltip bottom>
        <template v-slot:activator="{ props: tooltip3 }">
          <v-btn
              v-bind="tooltip3"
              icon="mdi-file-document-edit"
              class="ma-2"
              variant="outlined"
              @click='this.$router.push("edit");'/>
        </template>
        <span>Bearbeiten</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ props: tooltip4 }">
          <v-btn
              v-bind="tooltip4"
              icon="mdi-message-star"
              class="ma-2"
              variant="outlined"
              @click='this.$router.push("feedback");'/>
        </template>
        <span>Feedback ansehen</span>
      </v-tooltip>

    </v-container>
    <!-- <div v-if="this.$route.params.id">
      requested exercise {{ this.$route.params.id }} from course {{ this.$route.params.course }}
    </div> -->
    <v-card-header>
      <v-card-header-text class="text-left text-h4" v-html="exercise.title"/>
    </v-card-header>
    <v-container v-if="exercise.images_before && exercise.images_before.length > 0" class="text-left">
      <v-carousel v-model="carousel1" :cycle="false">
        <v-carousel-item v-for="image in exercise.images_before" :key="image.id">
          <v-img :src="image.url" :aspect-ratio="image.aspect_ratio"/>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <v-container v-else-if="exercise.images_before && exercise.images_before.length === 1" class="text-left">
      <v-img :src="exercise.images_before[0].url" :aspect-ratio="exercise.images_before[0].aspect_ratio"/>
    </v-container>
    <v-container>
      <Editor style="background: none" previewOnly class="text-left" language="en-US"
              :modelValue="filterYAMLHeader(exercise.content)"/>
    </v-container>
    <v-container v-if="exercise.images_after && exercise.images_after.length > 1" class="text-left">
      <v-carousel v-model="carousel2" :cycle="false">
        <v-carousel-item v-for="image in exercise.images_after" :key="image.id">
          <v-img :src="image.url" :aspect-ratio="image.aspect_ratio"/>
        </v-carousel-item>
      </v-carousel>
    </v-container>
    <v-container v-else-if="exercise.images_after && exercise.images_after.length === 1" class="text-left">
      <v-img :src="exercise.images_after[0].url" :aspect-ratio="exercise.images_after[0].aspect_ratio"/>
    </v-container>
    <v-btn
        v-if="!showSubmission && hasSubmission"
        @click="showSubmission = true"
        class="ma-2"
        rounded="0" variant="outlined">
      {{ getSubmitButton() }}
    </v-btn>

  </v-card>
  <br/>
  <div>
    <NewSubmission v-if="showSubmission" :exercise_id="exercise.id" :course="this.$route.params.course"/>
  </div>
</template>

<style scoped>
</style>

<script setup lang='ts'>
import {mergeProps, ref} from "vue";
import FeedbackModal from "@/components/FeedbackModal.vue";
import NewSubmission from "@/components/NewSubmission.vue";
import {useRouter, useRoute} from "vue-router";
import Editor from "md-editor-v3";
import "md-editor-v3/lib/style.css";
import {theme} from "@/helpers/theme";
import axios from '@/services/API';


const content = "# Hallo Welt\n" +
    "\n" +
    "Dies ist eine Markdown-Testdatei.\n" +
    "\n" +
    "$i^2 + 2 * \\omega(A, G, D)$\n" +
    "\n" +
    "* *test*\n" +
    "* **Test**\n" +
    "* _Test_\n" +
    "* __test__\n" +
    "* `test`\n" +
    "\n" +
    "```javascript\n" +
    "console.log('Hallo Welt');\n" +
    "\n" +
    "function test() {\n" +
    "  console.log('Hallo Welt');\n" +
    "}\n" +
    "```";

const route = useRoute();
const router = useRouter();
const id = route.params.id;
const course = route.params.course;

// here you'd get the exercise from the server
// const exercise = computed(() => {
//   return content.exercises.find(exercise => exercise.id === id);
// });

const exercise = {
  id: id,
  title: "Aufgabe zur Zielscheibe",
  images_before: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      aspect_ratio: 1.5,
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      aspect_ratio: 1,
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      aspect_ratio: 3,
    },
    {
      id: 4,
      url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      aspect_ratio: 1.5,
    },
    {
      id: 5,
      url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      aspect_ratio: 1.5,
    }
  ],
  content: content,
  content2: "## What is Lorem Ipsum?\n" +
      "\n" +
      "**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
      "\n" +
      "## Why do we use it?\n" +
      "\n" +
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).\n" +
      "\n" +
      "## Where does it come from?\n" +
      "\n" +
      "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of",
  images_after: [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
      aspect_ratio: 3,
    },
  ],
};

router.replace(`/${course}/e/${id}/${encodeURIComponent(exercise.title)}`);

function goBack(): void {
  router.back();
}

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
    let hasSubmission = true;


    const text = ref(exercise.content);

    return {
      goBack,
      reportError,
      filterYAMLHeader,
      getSubmitButton,
      dialog,
      error,
      dialog2,
      feedback,
      props: null,
      saved,
      showSubmission,
      hasSubmission,
      exercise,
      text,
      theme,
      id : '',
      course : ''
    };
  },
  // GET Request
    mounted () {
    axios.get('/tasks/${id}', {
      params: {
        id: useRoute().params.id
      }
    })
        .then(response => {
         this.id = response.data
          console.log(response.data)
        })
        .catch(error => {
          console.log(error)
        })
  }
});
</script>
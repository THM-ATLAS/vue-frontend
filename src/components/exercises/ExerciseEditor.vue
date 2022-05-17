<template>
  <v-card elevation="0" rounded="0">
    <div class="exercise-editor">
      <div class="exercise-editor__body">
        <div class="exercise-editor__body__content flex">
          <v-row>
            <v-col
                sm="12" md="2" lg="2">
              <v-text-field
                  v-model="exercise.id"
                  :label="$t('exercise.id')"
                  required
                  @input="store"
                  disabled
              />
            </v-col>
            <v-col
                sm="12" md="10" lg="10">
              <v-text-field
                  v-model="exercise.title"
                  :label="$t('exercise.title')"
                  required
                  @input="store"
              />
            </v-col>
          </v-row>
        </div>
        <div class="exercise-editor__body__content">
          <div class="exercise-editor__body__content__input">
            <v-textarea
                solo
                rows="1"
                :label="$t('exercise.description')"
                v-model="exercise.description"
                @input="store"
            />
          </div>
        </div>
        <div class="exercise-editor__body__content">
          <div class="exercise-editor__body__content__input">
            <MarkdownModal
                :editor="true"
                v-model="exercise.content"
                @input="store"/>
          </div>
        </div>
        <v-card-actions justify="space-between">
          <div class="exercise-editor__header__actions">
            <v-btn color="primary" @click="save" v-html="$t('buttons.save')"/>
            <v-btn color="red" @click="del" v-html="$t('buttons.delete')"/>
            <v-btn class="btn btn-danger" @click="cancel" v-html="$t('buttons.cancel')"/>
          </div>
        </v-card-actions>
      </div>
    </div>
  </v-card>
  <!--br/-->

  <!-- Submission Editor -->
  <!--div v-if="exercise.hasSubmission">
    <v-container class="pt-0 pl-0">
      <h1 class="display-1">Abgabe</h1>
      <v-card elevation="0" rounded="0" v-for="(item, index) in exercise.items" class="submission-area mb-5"
              :key="item.id">
        <div class="flex">
          <v-row>
            <v-col sm="1" md="1" lg="1">
              <div class="submission-index">
                <span class="submission-index__number text-h4 text-medium-emphasis">{{ index + 1 }}</span>
              </div>
            </v-col>
            <v-col
                sm="11" md="7" lg="7">
              <v-select
                  v-model="item.type"
                  :items="submissionTypes"
                  item-text="name"
                  item-value="id"
                  label="Abgabentyp"
                  variant="underlined"
                  @change="store"/>
            </v-col>
            <v-col sm="3" md="1" lg="1" id="submission-editor-delete">
              <v-icon
                  v-if="isShiftPressed"
                  class="submission-area__delete"
                  @click="deleteItem(index, $event)"
                  color="red"
                  size="30"
                  icon="mdi-delete-sweep"
              />
              <v-icon
                  v-else
                  class="submission-area__delete"
                  @click="deleteItem(index, $event)"
                  color="red"
                  size="30"
                  icon="mdi-delete"
              />
            </v-col>
            <v-col sm="3" md="1" lg="1" id="submission-editor-duplicate">
              <v-icon
                  class="submission-area__duplicate"
                  @click="duplicateItem(index)"
                  color="primary"
                  size="30"
                  icon="mdi-content-copy"
              />
            </v-col>
            <v-col sm="3" md="1" lg="1" id="submission-editor-move-up">
              <v-icon
                  v-if="isShiftPressed"
                  class="submission-area__move-up"
                  @click="moveItem(index, 0)"
                  size="30"
                  icon="mdi-arrow-collapse-up"
                  :disabled="index <= 0"
                  :color="index > 0 ? 'primary' : 'green'"
              />
              <v-icon
                  v-else
                  class="submission-area__move-up"
                  @click="moveItem(index, index - 1)"
                  :disabled="index <= 0"
                  :color="index > 0 ? 'primary' : 'green'"
                  size="30"
                  icon="mdi-arrow-up-bold"
              />
            </v-col>
            <v-col sm="3" md="1" lg="1" id="submission-editor-move-down">
              <v-icon
                  v-if="isShiftPressed"
                  class="submission-area__move-down"
                  @click="moveItem(index, exercise.items.length - 1)"
                  size="30"
                  icon="mdi-arrow-collapse-down"
                  :disabled="index >= exercise.items.length - 1"
                  :color="index < exercise.items.length - 1 ? 'primary' : 'green'"
              />
              <v-icon
                  v-else
                  class="submission-area__move-down"
                  @click="moveItem(index, index + 1)"
                  :disabled="index >= exercise.items.length - 1"
                  :color="index < exercise.items.length - 1 ? 'primary' : 'green'"
                  size="30"
                  icon="mdi-arrow-down-bold"
              />
            </v-col>
          </v-row>
        </div>
        <v-text-field
            v-model="item.title"
            label="Titel"
            @input="store"
            variant="underlined"
            placeholder="Was soll abgegeben werden?"
            :rules="[value => !!value || 'Bitte Titel eingeben']"
        />
        <v-text-field
            v-model="item.body"
            label="Beschreibung"
            placeholder="Optional"
            variant="underlined"
            @input="store"
        />
        <v-text-field
            v-if="item.type === 'code'"
            v-model="item.language"
            label="Programmiersprache"
            placeholder="processing, java, c++, c#, python, etc."
            variant="underlined"
            :rules="[value => !!value || 'Bitte Sprache eingeben']"
            @input="store"
        />
        <v-combobox
            v-if="item.type === 'file'"
            v-model="item.allowed_extensions"
            :items="fileExtensions"
            label="Erlaubte Dateiendungen"
            @change="store"
            variant="underlined"
            multiple
        />
      </v-card>
      <v-btn
          class="submission-area__add"
          @click="addItem"
          color="primary"
          dark
          large
          outlined
          rounded="0"
          elevation="0"
      >
        <v-icon :left="true" icon="mdi-plus"/>
        Element Hinzufügen
      </v-btn>
      <v-btn color="primary" elevation="0" rounded="0" class="ml-2" @click="save">Save</v-btn>
      <v-btn color="red" elevation="0" rounded="0" class="ml-2" @click="del">Delete</v-btn>
      <v-btn elevation="0" rounded="0" class="ml-2" @click="cancel">Cancel</v-btn>
    </v-container>
  </div>
  <v-btn
      v-else
      class="btn btn-danger elevation-0 rounded-0"
      @click="exercise.hasSubmission = true"
  >
    Abgabe erstellen
  </v-btn-->
  <!--br/>
  <MainpageCardModal :exercise="exercise" ref="modal" :no-redirect="true"/>
  <br/-->
  <!-- Preview -->
  <!--v-card elevation="0" rounded="0">
    <v-container class="pt-0 pl-0">
      <div class="preview-area">
        <div class="preview-area__notice">
          <p class="text-small">Vorschau der Übung:</p>
        </div>
        <div class="preview-area__header">
          <div class="preview-area__header__title">
            <h1>{{ exercise.title }}</h1>
          </div>
          <div class="preview-area__header__description">
            <span>{{ exercise.description }}</span>
          </div>
        </div>
        <div class="preview-area__body">
          <Editor previewOnly language="en-US" :modelValue="exercise.content"/>
        </div>
      </div>
    </v-container>
  </v-card-->
</template>

<script setup>
import {onBeforeMount, reactive, /*ref , onMounted, onUnmounted */} from "vue";
// import MainpageCardModal from "../MainpageCardModal.vue";
import {useRouter, useRoute} from "vue-router";
import "md-editor-v3/lib/style.css";
import MarkdownModal from "@/components/helpers/MarkdownModal";
import TaskService from "@/services/ExerciseService";

const route = useRoute();
const router = useRouter();

/*
function keyDownListener(e) {
  if (e.keyCode === 16) {
    this.isShiftPressed = true;
  }
}

function keyUpListener(e) {
  if (e.keyCode === 16) {
    this.isShiftPressed = false;
  }
}

onMounted(() => {
  document.addEventListener("keydown", this.keyDownListener);
  document.addEventListener("keyup", this.keyUpListener);
})


onUnmounted(() => {
  document.removeEventListener("keydown", this.keyDownListener);
  document.removeEventListener("keyup", this.keyUpListener);
})
*/

const course = route.params.course;
const id = route.params.id;
const localStoragePath = id === undefined ? course + ".newExercise" : course + ".e." + id;

/*
const submissionTypes = [
  {id: "single-line", name: "Einzeiliger Text"},
  {id: "multi-line", name: "Mehrzeiliger Text"},
  {id: "multiple-choice", name: "Ankreuzaufgabe"},
  {id: "code", name: "Code"},
  {id: "file", name: "Datei"},
];

const fileExtensions = [
  "application/pdf",
  "application/msword",
  "image/jpeg",
  "image/png",
  "image/gif",
  "text/plain",
]
*/
const exercise = reactive({
  id: id === undefined ? "" : id,
  title: "",
  description: "",
  content: "",
  // hasSubmission: false,
  // items: [],
});

const store = () => {
  localStorage.setItem(localStoragePath, JSON.stringify(exercise.value));
};

onBeforeMount(async () => {
  if (JSON.parse(localStorage.getItem(localStoragePath))) { // get exercise from local storage
    exercise.value = JSON.parse(localStorage.getItem(localStoragePath));
  } else { // get exercise from API
    await TaskService.getExercise(id).then(response => {
      exercise.id = response.data.exercise_id
      exercise.title = response.data.title
      exercise.content = response.data.content
      exercise.taskPublic = response.data.taskPublic
    })
  }

  store();
})

const save = () => {
  console.log(exercise);
  // store stuff
  localStorage.removeItem(localStoragePath);
  router.back();
};

const del = async () => {
  await TaskService.delExercise(id).then(response => {
    console.log(response.data)
  }). catch(error => {
    console.log(error.message)
  })
  localStorage.removeItem(localStoragePath);
  router.back();
};

const cancel = () => {
  router.back();
};

/*
const addItem = (type) => {
  const item = {
    id: exercise.value.items.length + 1,
    type: type,
    title: "",
    body: "",
    content: "",
    language: "",
    options: [],
    correct: "",
    max_length: 0,
    allowed_extensions: [],
    multiple: false,
  };
  exercise.value.items.push(item);
  updateItemIds();
};

const deleteItem = (index, event) => { // hold shift to delete without confirmation
  if (!event.shiftKey && !confirm("Möchtest du dieses Element löschen? Dies kann nicht rückgängig gemacht werden.\n(Halte beim Löschen Shift gedrückt, um diese Meldung zu umgehen.)")) return;
  exercise.value.items.splice(index, 1);
  updateItemIds();
};

const moveItem = (index, newIndex) => {
  if (newIndex < 0 || newIndex > exercise.value.items.length - 1) return;
  const item = exercise.value.items.splice(index, 1)[0];
  exercise.value.items.splice(newIndex, 0, item);
  updateItemIds();
};

const duplicateItem = (index) => {
  const item = exercise.value.items[index];
  const newItem = {...item};
  exercise.value.items.splice(index + 1, 0, newItem);
  updateItemIds();
};

const updateItemIds = () => {
  exercise.value.items.forEach((item, index) => {
    item.id = index + 1;
  });
  store();
};
*/

</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
</style>
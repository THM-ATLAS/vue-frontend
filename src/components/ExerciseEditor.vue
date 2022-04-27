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
                  label="ID"
                  required
                  @input="store"
              />
            </v-col>
            <v-col
                sm="12" md="10" lg="10">
              <v-text-field
                  v-model="exercise.title"
                  label="Titel"
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
                label="Beschreibung (optional)"
                v-model="exercise.description"
                @input="store"
            ></v-textarea>
          </div>
        </div>
        <div class="exercise-editor__body__content">
          <div class="exercise-editor__body__content__input">
            <Editor
                v-model="exercise.content"
                language="en-US"
                @input="store"
            />
          </div>
        </div>
        <v-card-actions justify="space-between">
          <div class="exercise-editor__header__actions">
            <v-btn color="primary" @click="save">Save</v-btn>
            <v-btn color="red" @click="del">Delete</v-btn>
            <v-btn class="btn btn-danger" @click="cancel">Cancel</v-btn>
          </div>
        </v-card-actions>
      </div>
    </div>
  </v-card>
  <br/>
  <!-- Submission Editor -->
  <div v-if="exercise.hasSubmission">
    <v-container class="pt-0 pl-0">
      <h1 class="display-1">Abgabe</h1>
      <v-card elevation="0" rounded="0" v-for="(item, index) in exercise.items" class="submission-area mb-5"
              :key="item.id">
        <div class="flex">
          <v-row>
            <v-col sm="1" md="1" lg="1">
              <!-- index text -->
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
            <v-col sm="3" md="1" lg="1">
              <!-- delete -->
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
            <v-col sm="3" md="1" lg="1">
              <!-- duplicate -->
              <v-icon
                  class="submission-area__duplicate"
                  @click="duplicateItem(index)"
                  color="primary"
                  size="30"
                  icon="mdi-content-copy"
              />
            </v-col>
            <v-col sm="3" md="1" lg="1">
              <!-- move up -->
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
            <v-col sm="3" md="1" lg="1">
              <!-- move down -->
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
  </v-btn>
  <br/>
  <MainpageCardModal :exercise="exercise" ref="modal" :no-redirect="true"/>
  <br/>
  <!-- Preview -->
  <v-card elevation="0" rounded="0">
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
  </v-card>
</template>

<script>
import {ref} from "vue";
import Editor from "md-editor-v3";
import MainpageCardModal from "./MainpageCardModal.vue";
import {useRouter, useRoute} from "vue-router";
import "md-editor-v3/lib/style.css";

export default {
  name: "ExerciseEditor",
  components: {Editor, MainpageCardModal},
  methods: {
    keyDownListener(e) {
      if (e.keyCode === 16) {
        this.isShiftPressed = true;
      }
    },
    keyUpListener(e) {
      if (e.keyCode === 16) {
        this.isShiftPressed = false;
      }
    },
  },
  created() {
    document.addEventListener("keydown", this.keyDownListener);
    document.addEventListener("keyup", this.keyUpListener);
  },
  unmounted() {
    document.removeEventListener("keydown", this.keyDownListener);
    document.removeEventListener("keyup", this.keyUpListener);
  },
  setup() {
    const router = useRouter();
    const course = useRoute().params.course;
    const id = useRoute().params.id;
    const localStoragePath = id === undefined ? course + ".newExercise" : course + ".e." + id;

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

    let exercise = ref({
      id: id === undefined ? "" : id,
      title: "",
      description: "",
      content: "",
      hasSubmission: false,
      items: [],
    });

    const store = () => {
      localStorage.setItem(localStoragePath, JSON.stringify(exercise.value));
    };

    if (JSON.parse(localStorage.getItem(localStoragePath))) { // get exercise from local storage
      exercise.value = JSON.parse(localStorage.getItem(localStoragePath));
    } else if (id === undefined) { // create new exercise
      exercise = ref({
        id: 10101, // TODO: get from API
        title: "New Exercise",
        description: "",
        content: "Edit here...",
        hasSubmission: false,
        items: [],
      });
    } else { // get exercise from API
      exercise = ref({  // TODO: get from API
        id: id,
        title: "Existing exercise title (id: " + id + ")",
        description: "Something was here previously",
        content: "Blah blah blah\n\n**Hi**\n\n[Link](https://www.google.com)",
        hasSubmission: true,
        items: [
          {
            id: 1, // item id
            type: "code", // code, multiple-choice, single-line, multi-line, file
            title: "Sum of n numbers",
            body: "Write a program to find the sum of first n natural numbers", // describes the context of the item
            content: "", // code content
            language: "processing", // optional, only used for code items
          },
          {
            id: 2, // item id
            type: "multiple-choice", // code, multiple-choice, single-line, multi-line, file
            title: "Wähle die richtige Antwort", // describes the context of the item
            options: [
              {
                id: 1, // option id
                text: "A", // option content
              },
              {
                id: 2, // option id
                text: "B", // option content
              },
              {
                id: 3, // option id
                text: "C", // option content
              },
              {
                id: 4,
                text: "Ich bin ein längerer Text. Ich darf nicht bereits ausgewählt sein",
              },
            ],
          },
          {
            id: 3, // item id
            type: "single-line", // code, multiple-choice, single-line, multi-line, file
            title: "Gib eine Zahl ein", // describes the context of the item
            content: "", // code content
            correct: "42", // indicates the correct answer
            max_length: 32, // indicates the maximum length of the text
          },
          {
            id: 4, // item id
            type: "multi-line", // code, multiple-choice, single-line, multi-line, file
            title: "Gedichtsanalyse", // describes the context of the item
            body: "Analysiere das Gedicht.", // describes the context of the item
            content: "", // code content
            max_length: 256, // indicates the maximum length of the text
          },
          {
            id: 5, // item id
            type: "file", // code, multiple-choice, single-line, multi-line, file
            title: "Lade eine Datei hoch", // describes the context
            allowed_extensions: ["application/pdf", "image/png"], // specifies the allowed file extensions
            multiple: true, // allow multiple files
          }
        ]
      });
    }

    store();

    const save = () => {
      console.log(exercise);
      // store stuff
      localStorage.removeItem(localStoragePath);
      router.back();
    };

    const del = () => {
      localStorage.removeItem(localStoragePath);
      router.back();
    };

    const cancel = () => {
      router.back();
    };

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

    return {
      exercise,
      save,
      cancel,
      store,
      del,
      submissionTypes,
      fileExtensions,
      deleteItem,
      addItem,
      duplicateItem,
      moveItem,
      isShiftPressed: ref(false),
    };
  },
};
</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
</style>
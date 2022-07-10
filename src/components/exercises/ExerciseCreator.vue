<template>
  <div>
    <v-card elevation="0" rounded="0">
      <div class="tag-chips">
        <v-btn
            class="tag-button"
            @click="addTagsDialog.show = true"
            color="secondary"
        >
          {{ $t("exercise.add_tag") }}
        </v-btn>
        <v-chip
            v-for="tag in exerciseTags"
            v-bind:key="tag.tag_id"
            :closable="true"
            @click:close="removeTag(tag)"
        >
          <v-icon class="tag-icon" size="small" :icon="tag.icon.reference"/>
          {{ tag.name }}
        </v-chip>
      </div>
        <v-row>
            <v-text-field
                v-model="exercise.title"
                :label="$t('exercise.title')"
                required
            />
        </v-row>
      <div>
        <v-textarea
            solo
            rows="1"
            :label="$t('exercise.description')"
            v-model="exercise.description"
        />
      </div>
      <div>
        <v-select
            :items="supportedTypes"
            :label="$t('exercise.exercise_type')"
            v-model="exerciseType"
        ></v-select>
      </div>
      <div>
        <MarkdownModal :editor="true" v-model="exercise.content" />
      </div>

      <v-card-actions justify="space-between">
        <v-btn color="primary" @click="save" v-html="$t('buttons.save')" />
        <v-btn color="red" @click="requestCancel" v-html="$t('buttons.cancel')" />
      </v-card-actions>
    </v-card>
    <v-dialog v-model="currentDialog.show" persistent>
      <v-card>
        <v-card-title>
          <span class="headline" v-html="$t(currentDialog.header)" />
        </v-card-title>
        <v-card-text v-html="$t(currentDialog.text)" />
        <v-card-actions>
          <v-spacer />
          <v-btn
              color="green darken-1"
              text
              @click="currentDialog.show = false"
              v-html="$t(currentDialog.cancelText)"
          />
          <v-btn
              color="red darken-1"
              text
              @click="
              currentDialog.confirmCallback();
              currentDialog.show = false;
            "
              v-html="$t(currentDialog.confirmText)"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- [Desktop] Add tags dialog start -->
    <v-dialog
        class="d-none d-md-flex"
        v-model="addTagsDialog.show"
        :retain-focus="false"
        transition="slide-y-transition"
    >
      <v-card top="20%" width="50vw">
        <v-card-title> {{ $t("exercise.tag_add_desc") }}</v-card-title>
        <v-table :fixed-header="true" height="40vh">
          <thead>
          <tr>
            <th class="hide-btn-behind-header">{{ $t("exercise.tag") }}</th>
            <th class="hide-btn-behind-header"></th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="tag in filteredTags" :key="tag.tag_id">
            <td>
              <v-icon class="tag-icon" size=small :icon="tag.icon.reference"/>
              {{ tag.name }}
            </td>
            <td class="text-right">
              <v-btn @click="addTagToExercise(tag)" color="primary">
                <v-icon icon="mdi-plus"></v-icon>
              </v-btn>
            </td>
          </tr>
          </tbody>
        </v-table>
        <v-row>
          <v-col cols="9">
            <v-text-field
                :label="$t('exercise.tag_search_or_create')"
                v-model="addTagsDialog.target.name"
                @input="updateFilterList"
            >
            </v-text-field>
          </v-col>
          <v-col cols="3">
            <v-btn
                width="100%"
                height="58%"
                @click="createTag(addTagsDialog.target)"
            >
              {{ $t("buttons.add") }}
            </v-btn>
          </v-col>
        </v-row>
        <v-card-actions>
          <v-btn
              @click="addTagsDialog.show = false"
              color="error"
              v-html="$t('buttons.close')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- [Desktop] Edit tags dialog end -->
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, onBeforeUnmount, Ref, ref } from "vue";
import { useRouter, useRoute, onBeforeRouteLeave } from "vue-router";
import { useI18n } from "vue-i18n";
import "md-editor-v3/lib/style.css";
import MarkdownModal from "@/components/helpers/MarkdownModal.vue";
import ExerciseService from "@/services/ExerciseService";
import TagService from "@/services/TagService";
import ModuleService from "@/services/ModuleService";
import {Tag, PostExercise} from "@/helpers/types";

const route = useRoute();
const router = useRouter();
const i18n = useI18n();

//const module = route.params.module;
const id = Number.parseInt(
    route.params.id instanceof Array ? route.params.id[0] : route.params.id
);
//const localStoragePath = id === undefined ? module + ".newExercise" : module + ".e." + id;

const exercise: Ref<PostExercise> = ref({}) as Ref<PostExercise>;
const exerciseTags: Ref<Tag[]> = ref([]);
const module: Ref<number> = ref({}) as Ref<number>;
const allTags: Ref<Tag[]> = ref([]);
const filteredTags: Ref<Tag[]> = ref([]);
//const exerciseTypes = ref([]);
const exerciseType = ref("");
const apiTypes = ref([]);
const supportedTypes = ref(["Freitext"]);

let wasSave: boolean = false;
let wasDelete: boolean = false;
let wasCancel: boolean = false;

const confirmCancelDialog = ref({
  show: false,
  confirmed: false,
  header: "buttons.cancel",
  text: "exercise.confirm_cancel",
  confirmText: "buttons.cancel",
  cancelText: "buttons.stay",
  confirmCallback: () => {
    router.back();
    wasCancel = true;
  },
});

const currentDialog = ref({}) as Ref;

onBeforeMount(async () => {
  apiTypes.value = (await ExerciseService.getExerciseTypes()).data;
  //apiTypes.value.forEach(t => exerciseTypes.value.push(t.name));

  //mcExercise.value.push(mcPreset); //have at least 1 question

  module.value = parseInt(route.params.module as string);
  wasSave = false;
  wasDelete = false;
  window.addEventListener("beforeunload", beforeWindowUnload);
  getExerciseTags();
  exercise.value.description = " ";
  //}
  //store();
});

const save = async () => {
  if (!exercise.value) return;
  if(exercise.value.description === "") {
    console.log("no desc")
    return
  }
  exercise.value.module_id = module.value;
  exercise.value.type_id = apiTypes.value.filter(t => t.name === exerciseType.value)[0].type_id;
  //if(exerciseType.value !== "Multiple Choice")
    exercise.value.mc = [];
  await ExerciseService.addExercise(exercise.value)
      .then((response) => {
        console.log(response.data);
        exerciseTags.value.forEach(async e => await TagService.addTagToExercise(e, response.data));
      })
      .catch((error) => {
        console.log(error.message);
      });
  //localStorage.removeItem(localStoragePath);
  wasSave = true;
  router.back();
};

function requestCancel() {
  currentDialog.value = confirmCancelDialog.value;
  currentDialog.value.show = true;
}


onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", beforeWindowUnload);
});

const confirmLeave = () => {
  return window.confirm(i18n.t("exercise.confirm_leave"));
};

const beforeWindowUnload = (e: any) => {
  if (!wasSave && confirmLeave()) {
    // Cancel the event
    e.preventDefault();
    // Chrome requires returnValue to be set
    e.returnValue = "";
  }
};

onBeforeRouteLeave((to, from, next) => {
  if (wasSave || wasDelete || wasCancel || confirmLeave()) {
    next();
  } else {
    next(false);
  }
});

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
*/

function getExerciseTags(): void {
    TagService.getAllTags().then((res) => {
      allTags.value = res.data;
      filteredTags.value = allTags.value
          .sort((a, b) => a.name.localeCompare(b.name))
          .filter(
              (tag) =>
                  !exerciseTags.value.map((et) => et.tag_id).includes(tag.tag_id)
          );
    });
}

function addTagToExercise(tag: Tag): void {
  exerciseTags.value.push(tag);
  addTagsDialog.value.target.name = "";
  updateFilterList();
}

async function removeTag(tag: Tag): Promise<void> {
  exerciseTags.value = exerciseTags.value.filter(t => t !== tag)
  updateFilterList();
}

function updateFilterList() {
  filteredTags.value = allTags.value
      .sort()
      .filter((tag) =>
          tag.name
              .toLowerCase()
              .includes(addTagsDialog.value.target.name.toLowerCase())
      )
      .filter(
          (tag) => !exerciseTags.value.map((et) => et.tag_id).includes(tag.tag_id)
      );
}

function createTag(tag: Tag): any {
  if (!allTags.value
          .map((at) => at.name.toLowerCase())
          .includes(tag.name.toLowerCase()) &&
      tag.name != "") {
    TagService.addTag(tag).then((resTag) => {
      ModuleService.getModule(module.value.toString()).then((resModule) => {
        TagService.addTagToModule(resModule.data, resTag.data);
      })
      addTagToExercise(resTag.data);
      getExerciseTags();
    });
    addTagsDialog.value.target.name = "";
    updateFilterList();
    return 0;
  } else return 1;
}

const addTagsDialog = ref({
  show: false,
  target: getTagTemplate(),
});

function getTagTemplate(): Tag {
  return {
    tag_id: 0,
    name: "",
    icon: {
      icon_id: 5,
      reference: "mdi-laptop"
    }
  };
}
</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
.tag-button {
  margin-right: 1em;
  margin-bottom: 1em;
}

.tag-chips {
  margin-bottom: 1em;
}

.hide-btn-behind-header {
  z-index: 1;
}

.tag-icon {
  margin-right: 0.3em;
}
</style>

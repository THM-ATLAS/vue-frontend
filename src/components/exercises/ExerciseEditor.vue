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
      <div class="flex">
        <v-row>
          <v-col sm="12" md="2" lg="2">
            <v-text-field
              v-model="exercise.exercise_id"
              :label="$t('exercise.id')"
              required
              disabled
            />
          </v-col>
          <v-col sm="12" md="10" lg="10">
            <v-text-field
              v-model="exercise.title"
              :label="$t('exercise.title')"
              required
            />
          </v-col>
        </v-row>
      </div>
      <div>
        <v-textarea
          solo
          rows="1"
          :label="$t('exercise.description')"
          v-model="exercise.description"
        />
      </div>

      <div>
        <MarkdownModal :editor="true" v-model="exercise.content" />
      </div>

      <v-card-actions justify="space-between">
        <v-btn color="primary" @click="save" v-html="$t('buttons.save')" />
        <v-btn
          color="red"
          @click="requestDelete"
          v-html="$t('buttons.delete')"
        />
        <v-btn @click="requestCancel" v-html="$t('buttons.cancel')" />
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
        v-model="addTagsDialog.show"
        :retain-focus="false"
        transition="slide-y-transition"
    >
      <v-card top="20%" class="dialogWidth">
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
          <v-col cols="8">
            <v-text-field
              :label="$t('exercise.tag_search_or_create')"
              v-model="addTagsDialog.target.name"
              @input="updateFilterList"
            >
            </v-text-field>
          </v-col>
          <v-col cols="4">
            <v-btn
                class="addButton"
              width="100%"
              height="58%"
              @click="createTag(addTagsDialog.target)"
            >
              {{ $t("buttons.add") }}
            </v-btn>
            <v-btn
                class="plusButton"
                width="100%"
                height="58%"
                @click="createTag(addTagsDialog.target)"
            >
              +
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

    <!--br/-->

    <!-- Submission Editor -->
    <!--<div v-if="exercise.hasSubmission">
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

              variant="underlined"
              placeholder="Was soll abgegeben werden?"
              :rules="[value => !!value || 'Bitte Titel eingeben']"
          />
          <v-text-field
              v-model="item.body"
              label="Beschreibung"
              placeholder="Optional"
              variant="underlined"

          />
          <v-text-field
              v-if="item.type === 'code'"
              v-model="item.language"
              label="Programmiersprache"
              placeholder="processing, java, c++, c#, python, etc."
              variant="underlined"
              :rules="[value => !!value || 'Bitte Sprache eingeben']"

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
import { Exercise, Tag, Module } from "@/helpers/types";

const route = useRoute();
const router = useRouter();
const i18n = useI18n();

//const module = route.params.module;
const id = Number.parseInt(
  route.params.id instanceof Array ? route.params.id[0] : route.params.id
);
//const localStoragePath = id === undefined ? module + ".newExercise" : module + ".e." + id;

const exercise: Ref<Exercise> = ref({}) as Ref<Exercise>;
const exerciseTags: Ref<Tag[]> = ref([]);
const module: Ref<Module> = ref({}) as Ref<Module>;
const allTags: Ref<Tag[]> = ref([]);
const filteredTags: Ref<Tag[]> = ref([]);

let wasSave: boolean = false;
let wasDelete: boolean = false;
let wasCancel: boolean = false;

const confirmDeleteDialog = ref({
  show: false,
  confirmed: false,
  header: "buttons.delete",
  text: "exercise.confirm_delete",
  confirmText: "buttons.delete",
  cancelText: "buttons.cancel",
  confirmCallback: () => {
    del();
    router.push("/" + exercise.value?.module.module_id || "/404");
    wasDelete = true;
  },
});

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
  exercise.value = (await ExerciseService.getExercise(id)).data;
  module.value = exercise.value.module;
  wasSave = false;
  wasDelete = false;
  window.addEventListener("beforeunload", beforeWindowUnload);
  await getExerciseTags();
  //}
  //store();
});

const save = async () => {
  if (!exercise.value) return;
  await ExerciseService.editExercise(exercise.value)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
  //localStorage.removeItem(localStoragePath);
  wasSave = true;
  router.back();
};

function requestDelete() {
  currentDialog.value = confirmDeleteDialog.value;
  currentDialog.value.show = true;
}

function requestCancel() {
  currentDialog.value = confirmCancelDialog.value;
  currentDialog.value.show = true;
}

const del = async () => {
  await ExerciseService.delExercise(id)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

onBeforeUnmount(() => {
  window.removeEventListener("beforeunload", beforeWindowUnload);
});

/*
const confirmDelete = () => {
  return window.confirm(i18n.t("exercise.confirmDelete"))
}
*/

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

function getExerciseTags(): Promise<void> {
  return TagService.getTagsFromExercise(exercise.value).then((res) => {
    exerciseTags.value = res.data;
    TagService.getAllTags().then((res) => {
      allTags.value = res.data;
      filteredTags.value = allTags.value
        .sort((a, b) => a.name.localeCompare(b.name))
        .filter(
          (tag) =>
            !exerciseTags.value.map((et) => et.tag_id).includes(tag.tag_id)
        );
    });
  });
}

function addTagToExercise(tag: Tag): void {
  TagService.addTagToExercise(tag, exercise.value).then(async () => {
        getExerciseTags().then(() => addTagsDialog.value.target.name = "")
  });
  TagService.addTagToModule(module.value, tag);
}

async function removeTag(tag: Tag): Promise<void> {
  await TagService.delTagFromExercise(tag, exercise.value).then(() =>
    getExerciseTags()
  );
  ExerciseService.getExercisesForModule(module.value.module_id).then(res => {
    const resData = res.data;
    let tagInOtherExercise = false;
    resData.forEach((ex: Exercise) => {
      ex.tags.forEach((exTag: Tag) => {
        if(exTag.tag_id == tag.tag_id) {
          tagInOtherExercise = true;
        }
      })
    });
    if(!tagInOtherExercise) {
      TagService.delTagFromModule(module.value, tag);
    }
  })
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
  if (
    !allTags.value
      .map((at) => at.name.toLowerCase())
      .includes(tag.name.toLowerCase()) &&
    tag.name != ""
  ) {
    TagService.addTag(tag).then(() => {
      TagService.getAllTags().then((res) => {
        TagService.addTagToExercise(
          res.data.filter(
            (t: Tag) => t.name.toLowerCase() == tag.name.toLowerCase()
          )[0],
          exercise.value
        ).then(() => {
          getExerciseTags();
          addTagsDialog.value.target.name = "";
        });
      });
    });
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

.dialogWidth {
  width: 50vw;
}
@media (max-width: 1280px) {
  .dialogWidth {
    width: 80vw;
  }
}

.plusButton {
  display: none;
}

@media (max-width: 550px) {
  .addButton {
    display:none;
  }
  .plusButton {
    display: block;
    font-size: large;
  }
}

</style>

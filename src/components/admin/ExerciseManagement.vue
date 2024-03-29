<template>
  <div>
    <v-text-field
        class="mb-4 mt-1"
        :label="$t('admin.exercises.search_exercise')"
        v-model="search"
        prepend-icon="mdi-magnify"
        single-line
        hide-details
        @input="applySearch"/>
    <v-card elevation="0" rounded="0" role="main">
      <v-table>
        <thead>
        <tr>
          <th>{{ $t('admin.exercises.title') }}</th>
          <th>{{ $t('admin.exercises.module') }}</th>
          <th>{{ $t('admin.exercises.description') }}</th>
          <th>{{ $t('admin.exercises.actions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-if="!exercisesLoaded">
          <td></td>
          <td></td>
          <td>
            <v-progress-circular
                indeterminate
                color="primary"
            ></v-progress-circular>
          </td>
          <td></td>
        </tr>
        <tr v-for="exercise in currentPage" v-bind:key="exercise.id">
          <td>{{ exercise.title }}</td>
          <td>{{ exercise.module.name }}</td>
          <td v-if="exercise.description">{{ exercise.description }}</td>
          <td v-else style="opacity: 70%">{{ $t('admin.exercises.no_description') }}</td>
          <td>
            <v-tooltip right>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                    @click="viewExerciseDialog.show = true; viewExerciseDialog.target = exercise"
                    icon="mdi-file-eye"
                    small
                    elevation="0"
                    color="secondary"
                    class="ma-1"
                    rounded="0"
                    v-bind="tooltip"
                />
              </template>
              <span v-html="$t('buttons.view')"/>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                    @click="goToEditor(exercise)"
                    icon="mdi-file-document-edit"
                    small
                    elevation="0"
                    color="primary"
                    class="ma-1"
                    rounded="0"
                    variant="outlined"
                    v-bind="tooltip"
                />
              </template>
              <span v-html="$t('buttons.edit')"/>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                    @click="deleteExerciseDialog.show = true; deleteExerciseDialog.target = exercise"
                    icon="mdi-file-remove"
                    small
                    elevation="0"
                    color="error"
                    class="ma-1"
                    rounded="0"
                    variant="outlined"
                    v-bind="tooltip"
                />
              </template>
              <span v-html="$t('buttons.delete')"/>
            </v-tooltip>
            <v-tooltip right>
              <template v-slot:activator="{ props: tooltip }">
                <v-btn
                    @click="visitExercise(exercise)"
                    icon="mdi-open-in-new"
                    small
                    elevation="0"
                    color="success"
                    class="ma-1"
                    rounded="0"
                    variant="outlined"
                    v-bind="tooltip"
                />
              </template>
              <span v-html="$t('buttons.visit')"/>
            </v-tooltip>
          </td>
        </tr>
        </tbody>
      </v-table>

      <!-- new exercise -->
      <div>
        <v-btn
            @click="newExerciseDialog.show = true"
            icon="mdi-file-plus"
            small
            elevation="0"
            color="primary"
            class="mr-2"
            rounded="0"
            variant="outlined"
        />
      </div>
    </v-card>
    <v-row>
      <v-col cols="4" sm="3">
        <v-select
            :items="numbers"
            :label="$t('admin.exercises.exercises_per_page')"
            v-model="itemsPerPage">
        </v-select>
      </v-col>
      <v-col cols="12" sm="9">
        <v-pagination
            v-model="currentPageNumber"
            :length="length"
            total-visible="5"
        ></v-pagination>
      </v-col>
    </v-row>
    <!-- view exercise dialog -->
    <v-dialog
        v-model="viewExerciseDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" width="80vw">
        <v-card-title>
          {{ viewExerciseDialog.target.title }}
        </v-card-title>
        <v-card-text>
          <span v-if="viewExerciseDialog.target.description" v-html="viewExerciseDialog.target.description"/>
          <v-container class="my">
            <MarkdownModal
                :model-value="viewExerciseDialog.target.content"
            />
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <!-- new Exercise dialog -->
    <v-dialog
        v-model="newExerciseDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" width="80vw">
        <v-card-title>
          <span class="headline">{{ $t('admin.exercises.new') }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="newExerciseForm"
                  v-model="newExerciseFormValid"
                  style="z-index: 1"
          >
            <v-text-field
                @change="$refs.newExerciseForm.validate()"
                v-model="newExerciseDialog.target.title"
                :label="$t('admin.exercises.title')"
                :rules="[rules.required]"
                required
            />
            <v-text-field
                @change="$refs.newExerciseForm.validate()"
                v-model="newExerciseDialog.target.description"
                :label="$t('admin.exercises.description')"
                :rules="[]"
                :counter="256"
                required
            />
            <v-select
                v-model="newExerciseDialog.target.module_id"
                :items="modules"
                item-title="name"
                item-value="module_id"
                :label="$t('admin.exercises.module')"
                persistent-hint
                single-line
            />
            <MarkdownModal
                v-model="newExerciseDialog.target.content"
                :editor="true"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="newExerciseDialog.show = false" v-html="$t('buttons.cancel')"/>
          <v-btn :disabled="!newExerciseFormValid" color="primary" @click="createExercise" v-html="$t('buttons.save')"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- edit exercise dialog -->
    <!--v-dialog
        v-model="editExerciseDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" width="80vw">
        <v-card-title>
          <span class="headline">{{ $t('admin.exercises.edit') }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="editExerciseForm"
                  v-model="editExerciseFormValid"
          >
            <v-text-field
                @change="$refs.editExerciseForm.validate()"
                v-model="editExerciseDialog.target.title"
                :label="$t('admin.exercises.title')"
                :rules="[rules.required]"
                required
            />
            <v-text-field
                @change="$refs.editExerciseForm.validate()"
                v-model="editExerciseDialog.target.description"
                :label="$t('admin.exercises.description')"
                :rules="[]"
                :counter="256"
                required
            />
            Currently broken, don't change the module
            <v-select
                v-model="editExerciseDialog.target.module"
                :hint="`${editExerciseDialog.target.module.name}`"
                :items="modules"
                item-title="name"
                item-value="model_id"
                :label="$t('admin.exercises.module')"
                persistent-hint
                return-object
                single-line
            />
            <MarkdownModal
                v-model="editExerciseDialog.target.content"
                :editor="true"
            />
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="editExerciseDialog.show = false" v-html="$t('buttons.cancel')"/>
          <v-btn :disabled="!editExerciseFormValid" color="primary"
                 @click="editExercise(editExerciseDialog.target); editExerciseDialog.show = false"
                 v-html="$t('buttons.save')"/>
        </v-card-actions>
      </v-card>
    </v-dialog-->
    <!-- delete exercise dialog -->
    <v-dialog
        v-model="deleteExerciseDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" min-width="20vw">
        <v-card-title>
          <span class="headline">{{ $t('admin.exercises.delete') }}</span>
        </v-card-title>
        <v-card-text>
          <p>{{ $t('admin.exercises.delete_confirm', [deleteExerciseDialog.target.title]) }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="deleteExerciseDialog.show = false" v-html="$t('buttons.cancel')"/>
          <v-btn color="primary" @click="deleteExerciseDialog.show = false; deleteExercise(deleteExerciseDialog.target)"
                 v-html="$t('buttons.delete')"/>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, Ref, ref, watch} from "vue";
import {useI18n} from "vue-i18n";
import MarkdownModal from "@/components/helpers/MarkdownModal.vue";
import ExerciseService from "@/services/ExerciseService";
import ModuleService from "@/services/ModuleService";
import {Exercise, Module, PostExercise} from "@/helpers/types";
import router from "@/router";

const exercises: Ref<Exercise[]> = ref([]) as Ref<Exercise[]>;
const filteredExercises: Ref<Exercise[]> = ref([]) as Ref<Exercise[]>;
const modules: Ref<Module[]> = ref([]) as Ref<Module[]>;

const currentPage: Ref<Exercise[]> = ref([]);
const currentPageNumber = ref(1);
const itemsPerPage = ref(10);
const numbers = [1, 3, 5, 10, 20, 50];
const length = ref(3);
const i18n = useI18n();
const exercisesLoaded = ref(false)
const search = ref('')

async function loadExercises(): Promise<void> {
  filteredExercises.value = exercises.value = ((await ExerciseService.getExercises()).data).sort((a: Exercise, b: Exercise) => a.exercise_id - b.exercise_id);
  // console.log(exercises.value);
}

async function loadModules(): Promise<void> {
  modules.value = ((await ModuleService.getModules()).data).sort((a: Module, b: Module) => a.module_id - b.module_id);
}

function applySearch(): void {
  filteredExercises.value = exercises.value.filter((exercise) => {
    return (exercise.module.name + ' ' + exercise.title + ' ' + exercise.description).toLowerCase().includes(search.value.toLowerCase());
  })
  currentPage.value = filteredExercises.value.slice((currentPageNumber.value - 1) * itemsPerPage.value, currentPageNumber.value * itemsPerPage.value)
  length.value = Math.ceil(filteredExercises.value.length / itemsPerPage.value)
}

onBeforeMount(async () => {
  await loadExercises().then(() => {
    exercisesLoaded.value = true;
  });
  await loadModules().then(() => {
    newExerciseDialog.value.target = getExerciseTemplate();
  });
  applySearch();
});

watch(currentPageNumber, () => applySearch())

watch(itemsPerPage, () => applySearch())

const rules = {
  required: (value: any) => !!value || i18n.t("admin.users.errors.required"),
  username: (value: string) => /^[a-zA-Z\d]{3,32}$/.test(value) || i18n.t("admin.users.errors.username_invalid"),
  email: (value: string) => /^[a-zA-Z\d.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/.test(value) || i18n.t("admin.users.errors.email_invalid"),
  password: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])[a-zA-Z\d]{8,}$/.test(value) || i18n.t("admin.users.errors.password_invalid"), // 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number'
};

function visitExercise(exercise: Exercise) {
  router.push(`/${exercise.module.module_id}/e/${exercise.exercise_id}`);
}

function getExerciseTemplate(): PostExercise {
  return {
    exercise_id: 0,
    module_id: modules.value[0].module_id,
    title: '',
    content: '',
    description: '',
    exercisePublic: true,
    type_id: 1,
  };
}

function goToEditor(exercise: Exercise) {
  router.push(`/${exercise.module.module_id}/e/${exercise.exercise_id}/edit`);
}

/*const editExerciseDialog: Ref<{ show: boolean, target: Exercise | null }> = ref({
  show: false,
  target: null,
});*/

const newExerciseDialog: Ref<{ show: boolean, target: PostExercise | null }> = ref({
  show: false,
  target: null,
});

const viewExerciseDialog: Ref<{ show: boolean, target: Exercise | null }> = ref({
  show: false,
  target: null,
});

const newExerciseFormValid = ref(false);
//const editExerciseFormValid = ref(true);

const deleteExerciseDialog: Ref<{ show: boolean, target: Exercise | null }> = ref({
  show: false,
  target: null,
});

async function createExercise() {
  // Exercises.value.push(newExerciseDialog.value.target);
  console.log(newExerciseDialog.value.target);
  await ExerciseService.addExercise(newExerciseDialog.value.target as PostExercise);
  await loadExercises();
  newExerciseDialog.value.target = getExerciseTemplate();
  newExerciseDialog.value.show = false;
}

// function nextExerciseId() {
//   // Dont know if we need it
//   // return exercises.value.map(u => u.exercise_id).sort().pop() + 1;
// }

/*function editExercise(exercise: Exercise) {
  ExerciseService.editExercise(exercise).then(() => loadExercises());
  // exercises.value.forEach(t => {
  //   if (t.id === exercise.id) {
  //     t.module = exercise.module;
  //     t.title = exercise.title;
  //     t.description = exercise.description;
  //     t.content = exercise.content;
  //   }
  // });
}*/

function deleteExercise(exercise: Exercise) {
  // exercises.value = exercises.value.filter(u => u.id !== exercise.id);
  ExerciseService.delExercise(exercise.exercise_id).then(async () =>
      loadExercises()
  );
}


</script>
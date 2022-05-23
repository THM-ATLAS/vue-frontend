<template>
  <div>
    <v-card elevation="0" rounded="0" role="main">
      <v-table>
        <thead>
        <tr>
          <th>{{ $t('admin.tasks.title') }}</th>
          <th>{{ $t('admin.tasks.module') }}</th>
          <th>{{ $t('admin.tasks.description') }}</th>
          <th>{{ $t('admin.tasks.actions') }}</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="exercise in exercises" v-bind:key="exercise.id">
          <td>{{ exercise.title }}</td>
          <td>{{ exercise.module.name }}</td>
          <td v-if="exercise.description">{{ exercise.description }}</td>
          <td v-else style="opacity: 70%">{{ $t('admin.tasks.no_description') }}</td>
          <td>
            <v-btn
                @click="viewExerciseDialog.show = true; viewExerciseDialog.target = exercise"
                icon="mdi-file-eye"
                small
                elevation="0"
                color="secondary"
                class="mr-2"
                rounded="0"
            />
            <v-btn
                @click="editExerciseDialog.show = true; editExerciseDialog.target = exercise"
                icon="mdi-file-document-edit"
                small
                elevation="0"
                color="primary"
                class="mr-2"
                rounded="0"
                variant="outlined"
            />
            <v-btn
                @click="deleteExerciseDialog.show = true; deleteExerciseDialog.target = exercise"
                icon="mdi-file-remove"
                small
                elevation="0"
                color="error"
                class="mr-2"
                rounded="0"
                variant="outlined"
            />
          </td>
        </tr>
        </tbody>
      </v-table>

      <!-- new task -->
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

    <!-- view task dialog -->
    <v-dialog
        v-model="viewExerciseDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" width="50vw">
        <v-card-title>
          {{ viewExerciseDialog.target.title }}
        </v-card-title>
        <v-card-text>
          <span v-if="viewExerciseDialog.target.description" v-html="viewExerciseDialog.target.description"/>
        </v-card-text>
        <v-container class="my">
          <MarkdownModal
              :model-value="viewExerciseDialog.target.content"
          />
        </v-container>
      </v-card>
    </v-dialog>

    <!-- new Exercise dialog -->
    <v-dialog
        v-model="newExerciseDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" width="50vw">
        <v-card-title>
          <span class="headline">{{ $t('admin.tasks.new') }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="newExerciseForm"
                  v-model="newExerciseFormValid"
          >
            <v-text-field
                @change="$refs.newExerciseForm.validate()"
                v-model="newExerciseDialog.target.title"
                :label="$t('admin.tasks.title')"
                :rules="[rules.required]"
                required
            />
            <v-text-field
                @change="$refs.newExerciseForm.validate()"
                v-model="newExerciseDialog.target.description"
                :label="$t('admin.tasks.description')"
                :rules="[]"
                :counter="256"
                required
            />
            <v-select
                v-model="newExerciseDialog.target.module_id"
                :hint="`${modules.find(m => m.module_id === newExerciseDialog.target.module_id)?.name}`"
                :items="modules.map(m => m.module_id)"
                :item-title="m => `${modules.find(ms => m === ms.module_id)?.name || m}`"
                item-value="module_id"
                :label="$t('admin.tasks.module')"
                persistent-hint
                return-object
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
    <!-- edit task dialog -->
    <v-dialog
        v-model="editExerciseDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" width="50vw">
        <v-card-title>
          <span class="headline">{{ $t('admin.tasks.edit') }}</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="editExerciseForm"
                  v-model="editExerciseFormValid"
          >
            <v-text-field
                @change="$refs.editExerciseForm.validate()"
                v-model="editExerciseDialog.target.title"
                :label="$t('admin.tasks.title')"
                :rules="[rules.required]"
                required
            />
            <v-text-field
                @change="$refs.editExerciseForm.validate()"
                v-model="editExerciseDialog.target.description"
                :label="$t('admin.tasks.description')"
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
                :label="$t('admin.tasks.module')"
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
    </v-dialog>
    <!-- delete task dialog -->
    <v-dialog
        v-model="deleteExerciseDialog.show"
        :scrollable="true"
        :retain-focus="false"
    >
      <v-card top="20%" min-width="20vw">
        <v-card-title>
          <span class="headline">{{ $t('admin.tasks.delete') }}</span>
        </v-card-title>
        <v-card-text>
          <p>{{ $t('admin.tasks.delete_confirm', [deleteExerciseDialog.target.title]) }}</p>
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
import {onBeforeMount, Ref, ref} from "vue";
import {useI18n} from "vue-i18n";

import MarkdownModal from "@/components/helpers/MarkdownModal.vue";
import ExerciseService from "@/services/ExerciseService";
import ModuleService from "@/services/ModuleService";
// import UserService from "@/services/UserService";
import {Exercise, Module, PostExercise} from "@/helpers/types";

const exercises: Ref<Exercise[]> = ref([]) as Ref<Exercise[]>;
const modules: Ref<Module[]> = ref([]) as Ref<Module[]>;

async function loadExercises(): Promise<void> {
  exercises.value = ((await ExerciseService.getExercises()).data).sort((a: Exercise, b: Exercise) => a.exercise_id - b.exercise_id);
  console.log(exercises.value);
}

async function loadModules(): Promise<void> {
  modules.value = ((await ModuleService.getModules()).data).sort((a: Module, b: Module) => a.module_id - b.module_id);
  console.log(modules.value);
}

onBeforeMount(async () => {
  await loadExercises();
  await loadModules();
  newExerciseDialog.value.target = getExerciseTemplate();
  exercises.value = (await ExerciseService.getExercises()).data;
})
// console.log(exercises.value);
const i18n = useI18n();

const rules = {
  required: (value: any) => !!value || i18n.t("admin.users.errors.required"),
  username: (value: string) => /^[a-zA-Z\d]{3,32}$/.test(value) || i18n.t("admin.users.errors.username_invalid"),
  email: (value: string) => /^[a-zA-Z\d.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/.test(value) || i18n.t("admin.users.errors.email_invalid"),
  password: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])[a-zA-Z\d]{8,}$/.test(value) || i18n.t("admin.users.errors.password_invalid"), // 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number'
};

function getExerciseTemplate(): PostExercise {
  return {
    exercise_id: 0,
    module_id: 0,
    title: '',
    content: '',
    description: '',
    exercisePublic: true
  };
}

const editExerciseDialog: Ref<{ show: boolean, target: Exercise | null }> = ref({
  show: false,
  target: null,
});

const newExerciseDialog: Ref<{ show: boolean, target: PostExercise }> = ref({
  show: false,
  target: getExerciseTemplate(),
});

const viewExerciseDialog: Ref<{ show: boolean, target: Exercise | null }> = ref({
  show: false,
  target: null,
});

const newExerciseFormValid = ref(false);
const editExerciseFormValid = ref(true);

const deleteExerciseDialog: Ref<{ show: boolean, target: Exercise | null }> = ref({
  show: false,
  target: null,
});

async function createExercise() {
  // Exercises.value.push(newExerciseDialog.value.target);
  console.log(newExerciseDialog.value.target);
  await ExerciseService.addExercise(newExerciseDialog.value.target);
  await loadExercises();
  newExerciseDialog.value.target = getExerciseTemplate();
  newExerciseDialog.value.show = false;
}

// function nextExerciseId() {
//   // Dont know if we need it
//   // return exercises.value.map(u => u.exercise_id).sort().pop() + 1;
// }

function editExercise(exercise: Exercise) {
  ExerciseService.editExercise(exercise).then(() => loadExercises());
  // tasks.value.forEach(t => {
  //   if (t.id === task.id) {
  //     t.course = task.course;
  //     t.title = task.title;
  //     t.description = task.description;
  //     t.content = task.content;
  //   }
  // });
}

function deleteExercise(exercise: Exercise) {
  // tasks.value = tasks.value.filter(u => u.id !== task.id);
  ExerciseService.delExercise(exercise.exercise_id).then(async () =>
      loadExercises()
  );
}


</script>
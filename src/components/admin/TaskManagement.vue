<template>
  <v-card elevation="0" rounded="0" role="main">
    <v-table>
      <thead>
      <tr>
        <th>{{ $t('admin.tasks.title') }}</th>
        <th>{{ $t('admin.tasks.course') }}</th>
        <th>{{ $t('admin.tasks.description') }}</th>
        <th>{{ $t('admin.tasks.actions') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="task in tasks" v-bind:key="task.id">
        <td>{{ task.title }}</td>
        <td>{{ task.course }}</td>
        <td v-if="task.description">{{ task.description }}</td>
        <td v-else style="opacity: 70%">{{ $t('admin.tasks.no_description') }}</td>
        <td>
          <v-btn
              @click="viewTaskDialog.show = true; viewTaskDialog.target = task"
              icon="mdi-file-eye"
              small
              elevation="0"
              color="secondary"
              class="mr-2"
              rounded="0"
          />
          <v-btn
              @click="editTaskDialog.show = true; editTaskDialog.target = task"
              icon="mdi-file-document-edit"
              small
              elevation="0"
              color="primary"
              class="mr-2"
              rounded="0"
              variant="outlined"
          />
          <v-btn
              @click="deleteTaskDialog.show = true; deleteTaskDialog.target = task"
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
          @click="newTaskDialog.show = true"
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
      v-model="viewTaskDialog.show"
      :scrollable="true"
      :retain-focus="false"
  >
    <v-card top="20%" width="50vw">
      <v-card-title>
        {{ viewTaskDialog.target.title }}
      </v-card-title>
      <v-card-text>
        <v-container>
          <span v-if="viewTaskDialog.target.description">{{ viewTaskDialog.target.description }}</span>
        </v-container>
        <MarkdownModal
            :model-value="viewTaskDialog.target.content"
        />
      </v-card-text>
    </v-card>
  </v-dialog>

  <!-- new task dialog -->
  <v-dialog
      v-model="newTaskDialog.show"
      :scrollable="true"
      :retain-focus="false"
  >
    <v-card top="20%" width="50vw">
      <v-card-title>
        <span class="headline">{{ $t('admin.tasks.new') }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="newTaskForm"
                v-model="newTaskFormValid"
        >
          <v-text-field
              @change="$refs.newTaskForm.validate()"
              v-model="newTaskDialog.target.title"
              :label="$t('admin.tasks.title')"
              :rules="[rules.required]"
              required
          />
          <v-text-field
              @change="$refs.newTaskForm.validate()"
              v-model="newTaskDialog.target.description"
              :label="$t('admin.tasks.description')"
              :rules="[]"
              :counter="256"
              required
          />
          <v-text-field
              @change="$refs.newTaskForm.validate()"
              v-model="newTaskDialog.target.course"
              :label="$t('admin.tasks.course')"
              :rules="[rules.required]"
              required
          />
          <MarkdownModal
              v-model="newTaskDialog.target.content"
              :editor="true"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="newTaskDialog.show = false" v-html="$t('buttons.cancel')"/>
        <v-btn :disabled="!newTaskFormValid" color="primary" @click="createTask" v-html="$t('buttons.save')"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- edit task dialog -->
  <v-dialog
      v-model="editTaskDialog.show"
      :scrollable="true"
      :retain-focus="false"
  >
    <v-card top="20%" width="50vw">
      <v-card-title>
        <span class="headline">{{ $t('admin.tasks.edit') }}</span>
      </v-card-title>
      <v-card-text>
        <v-form ref="editTaskForm"
                v-model="editTaskFormValid"
        >
          <v-text-field
              @change="$refs.editTaskForm.validate()"
              v-model="editTaskDialog.target.title"
              :label="$t('admin.tasks.title')"
              :rules="[rules.required]"
              required
          />
          <v-text-field
              @change="$refs.editTaskForm.validate()"
              v-model="editTaskDialog.target.description"
              :label="$t('admin.tasks.description')"
              :rules="[]"
              :counter="256"
              required
          />
          <v-text-field
              @change="$refs.editTaskForm.validate()"
              v-model="editTaskDialog.target.course"
              :label="$t('admin.tasks.course')"
              :rules="[rules.required]"
              required
          />
          <MarkdownModal
              v-model="editTaskDialog.target.content"
              :editor="true"
          />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="editTaskDialog.show = false" v-html="$t('buttons.cancel')"/>
        <v-btn :disabled="!editTaskFormValid" color="primary" @click="editTask(editTaskDialog.target)"
               v-html="$t('buttons.save')"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <!-- delete task dialog -->
  <v-dialog
      v-model="deleteTaskDialog.show"
      :scrollable="true"
      :retain-focus="false"
  >
    <v-card top="20%" min-width="20vw">
      <v-card-title>
        <span class="headline">{{ $t('admin.tasks.delete') }}</span>
      </v-card-title>
      <v-card-text>
        <p>{{ $t('admin.tasks.delete_confirm', [deleteTaskDialog.target.title]) }}</p>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="deleteTaskDialog.show = false" v-html="$t('buttons.cancel')"/>
        <v-btn color="primary" @click="deleteTaskDialog.show = false; deleteTask(deleteTaskDialog.target)"
               v-html="$t('buttons.delete')"/>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";
import {useI18n} from "vue-i18n";
// import MarkdownModal from "@/components/helpers/MarkdownModal";
import ExerciseService from "@/services/ExerciseService";
// import UserService from "@/services/UserService";
import {Exercise} from "@/helpers/types";


//   {
//     id: 1,
//     course: 'bkp',
//     title: "Task 1",
//     description: "This is a task",
//     content: "Hello World\n$1 + 1 = 2$",
//   },
//   {
//     id: 2,
//     course: 'bkp',
//     title: "Task 2",
//     description: "This is another task",
//     content: "Hello World\n**bold text**",
//   },
// ]);
const exercises: Ref<Exercise[]> = ref([]);

async function loadTasks(): Promise<void> {
  exercises.value = ((await ExerciseService.getExercises()).data).sort((a: Exercise, b: Exercise) => a.exercise_id - b.exercise_id);
}

console.log(exercises.value);
const i18n = useI18n();

const rules = {
  required: (value: any) => !!value || i18n.t("admin.users.errors.required"),
  username: (value: string) => /^[a-zA-Z\d]{3,32}$/.test(value) || i18n.t("admin.users.errors.username_invalid"),
  email: (value: string) => /^[a-zA-Z\d.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/.test(value) || i18n.t("admin.users.errors.email_invalid"),
  password: (value: string) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])[a-zA-Z\d]{8,}$/.test(value) || i18n.t("admin.users.errors.password_invalid"), // 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number'
};

function getTaskTemplate() {
  return {
    id: nextTaskId(),
    course: '',
    title: '',
    description: '',
    content: '',
  };
}

const editTaskDialog = ref({
  show: false,
  target: null,
});

const newTaskDialog = ref({
  show: false,
  target: getTaskTemplate(),
});

const viewTaskDialog = ref({
  show: false,
  target: getTaskTemplate(),
});

const newTaskFormValid = ref(false);
const editTaskFormValid = ref(false);

const deleteTaskDialog = ref({
  show: false,
  target: null,
});

async function createTask() {
  // tasks.value.push(newTaskDialog.value.target);
  await ExerciseService.addExercise(newTaskDialog.value.target);
  await loadTasks();
  newTaskDialog.value.target = getTaskTemplate();
  newTaskDialog.value.show = false;
}

function nextTaskId() {
  // Dont know if we need it
  return exercises.value.map(u => u.).sort().pop() + 1;
}

function editTask(exercise : Exercise) {
  ExerciseService.editExercise(exercise).then(() => loadTasks());
  // tasks.value.forEach(t => {
  //   if (t.id === task.id) {
  //     t.course = task.course;
  //     t.title = task.title;
  //     t.description = task.description;
  //     t.content = task.content;
  //   }
  // });
}

function deleteTask(exercise: Exercise) {
  // tasks.value = tasks.value.filter(u => u.id !== task.id);
  ExerciseService.delExercise(exercise.exercise_id).then(async () =>
      loadTasks()
  );
}


</script>
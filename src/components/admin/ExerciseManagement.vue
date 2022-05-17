<template>
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
      <tr v-for="exercise in exercises" v-bind:key="exercise.id">
        <td>{{ exercise.title }}</td>
        <td>{{ exercise.module }}</td>
        <td v-if="exercise.description">{{ exercise.description }}</td>
        <td v-else style="opacity: 70%">{{ $t('admin.exercises.no_description') }}</td>
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

  <!-- view exercise dialog -->
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
              v-model="newTaskDialog.target.module"
              :label="$t('admin.tasks.module')"
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
              v-model="editTaskDialog.target.module"
              :label="$t('admin.tasks.module')"
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

<script setup>
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import MarkdownModal from "@/components/helpers/MarkdownModal";

const tasks = ref([
  {
    id: 1,
    module: 'bkp',
    title: "Task 1",
    description: "This is a task",
    content: "Hello World\n$1 + 1 = 2$",
  },
  {
    id: 2,
    module: 'bkp',
    title: "Task 2",
    description: "This is another task",
    content: "Hello World\n**bold text**",
  },
]);

const i18n = useI18n();

const rules = {
  required: value => !!value || i18n.t("admin.users.errors.required"),
  username: value => /^[a-zA-Z\d]{3,32}$/.test(value) || i18n.t("admin.users.errors.username_invalid"),
  email: value => /^[a-zA-Z\d.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z\d-]+(?:\.[a-zA-Z\d-]+)*$/.test(value) || i18n.t("admin.users.errors.email_invalid"),
  password: value => /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z])[a-zA-Z\d]{8,}$/.test(value) || i18n.t("admin.users.errors.password_invalid"), // 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter and one number'
};

function getTaskTemplate() {
  return {
    id: nextTaskId(),
    module: '',
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

function createTask() {
  tasks.value.push(newTaskDialog.value.target);
  newTaskDialog.value.target = getTaskTemplate();
  newTaskDialog.value.show = false;
}

function nextTaskId() {
  return tasks.value.map(u => u.id).sort().pop() + 1;
}

function editTask(task) {
  tasks.value.forEach(t => {
    if (t.id === task.id) {
      t.module = task.module;
      t.title = task.title;
      t.description = task.description;
      t.content = task.content;
    }
  });
}

function deleteTask(task) {
  tasks.value = tasks.value.filter(u => u.id !== task.id);
}


</script>
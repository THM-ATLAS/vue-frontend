<template>
  <v-container>
    <v-card>
      <v-row>
        <v-col cols="1" align-self="center">
          <v-btn @click="goBack()" class="back-button" rounded="false">
            <v-icon icon="mdi-arrow-left" />
          </v-btn>
        </v-col>
        <v-col cols="8">
          <v-card-title> {{ module.name }} </v-card-title>
        </v-col>
        <v-col cols="3" align-self="center" class="d-flex justify-end">
          <v-btn @click="manageTagsDialog.show = true">
            {{ $t("module_manager.edit_tag_button") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <br />
    <v-card>
      <v-row>
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th class="text-left">{{ $t("module_manager.name") }}</th>
                <th class="text-left">{{ $t("module_manager.roles") }}</th>
                <th class="text-right"></th>
                <th class="text-right"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in moduleUsers" v-bind:key="user.user_id">
                <td class="text-left">{{ user.name }}</td>
                <td class="text-left">{{ user.module_role.name }}</td>
                <td class="placeholder-td"></td>
                <td class="text-right">
                  <v-btn
                    @click="editPrivilegeDialog.show = true"
                    class="manage-button"
                    color="primary"
                  >
                    <v-icon icon="mdi-cog"></v-icon>
                  </v-btn>
                  <v-btn
                    class="manage-button"
                    @click="deleteModuleUser(user)"
                    color="error"
                  >
                    <v-icon icon="mdi-delete"></v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <v-btn
            class="add-user-btn"
            @click="manageUsersDialog.show = true"
            color="secondary"
            v-html="$t('module_manager.add_user')"
          />
        </v-col>
        <v-col cols="12">
          <v-pagination></v-pagination>
        </v-col>
      </v-row>
    </v-card>

    <!-- Edit tags dialog start -->
    <v-dialog
      v-model="manageTagsDialog.show"
      :retain-focus="false"
      transition="slide-y-transition"
    >
      <v-card top="20%" width="70vw">
        <v-card-title> {{ $t("module_manager.edit_tag") }} </v-card-title>
        <v-card-text>
          <v-table fixed-header height="400px">
            <thead>
              <tr>
                <th>{{ $t("module_manager.tag") }}</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="tag in tagsCurrent" v-bind:key="tag.tag_id">
                <td>
                  <v-container class="test-class">
                    <v-text-field
                    vertical-align="middle"
                    class="centered-input extend"
                    v-model="tag.name"/>
                  </v-container>
                </td>
                <td class="text-right">
                  <v-btn
                    class="manage-button"
                    @click="editTag(tag)"
                    color="primary"
                  >
                    <v-icon icon="mdi-content-save"></v-icon>
                  </v-btn>
                  <v-btn
                    class="manage-button"
                    @click="removeTag(tag)"
                    color="error"
                  >
                    <v-icon icon="mdi-delete"></v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-card-actions>
          <v-btn
            @click="manageTagsDialog.show = false"
            color="error"
            v-html="$t('buttons.close')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Edit tags dialog end -->

    <!-- Edit users dialog start -->
    <v-dialog
      v-model="editPrivilegeDialog.show"
      :retain-focus="false"
      transition="slide-y-transition"
    >
      <v-card top="20%" width="70vw">
        <v-card-title> {{ $t("module_manager.edit_privilege") }} </v-card-title>
        <v-card-text> WIP </v-card-text>
        <v-card-actions>
          <v-btn
            @click="editPrivilegeDialog.show = false"
            color="error"
            v-html="$t('buttons.close')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Edit users dialog end -->

    <!-- Edit users dialog start -->
    <v-dialog
      v-model="manageUsersDialog.show"
      :retain-focus="false"
      transition="slide-y-transition"
    >
      <v-card top="20%" width="70vw">
        <v-card-title> {{ $t("module_manager.add_user") }} </v-card-title>
        <v-table fixed-header height="400px">
          <thead>
            <tr>
              <th>{{ $t("module_manager.name") }}</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in filteredUsers" v-bind:key="user.user_id">
              <td>{{ user.name }}</td>
              <td class="text-right">
                <v-btn @click="addModuleUser(user.user_id)" color="primary">
                  <v-icon icon="mdi-account-plus"></v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </v-table>
        <v-card-actions>
          <v-btn
            @click="manageUsersDialog.show = false"
            color="error"
            v-html="$t('buttons.close')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Edit users dialog end -->
  </v-container>
</template>

<script setup lang="ts">
import { onBeforeMount, Ref, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import UserService from "@/services/UserService";
import ModuleService from "@/services/ModuleService";
import TagService from "@/services/TagService";
import ModuleManagerService from "@/services/ModuleManagerService";
import ExerciseService from "@/services/ExerciseService";
import { ModuleUser, User, Module, Tag, Exercise } from "@/helpers/types";

//Router
const route = useRoute();
const router = useRouter();
const module: Ref<Module> = ref({}) as Ref<Module>;
const moduleUsers: Ref<ModuleUser[]> = ref([]);
const allUsers: Ref<User[]> = ref([]);
const filteredUsers: Ref<User[]> = ref([]);
const tagsCurrent: Ref<Tag[]> = ref([]);
const exercises: Ref<Exercise[]> = ref([]);

async function loadModule(): Promise<void> {
  ModuleService.getModule(route.params.module).then((res) => {
    module.value = res.data;
  });
}

async function loadModuleUsers(): Promise<void> {
  moduleUsers.value = (
    await ModuleManagerService.getModuleUsers(module.value)
  ).data.sort((a, b) => a.user_id - b.user_id);
}

async function loadAllUsers(): Promise<void> {
  allUsers.value = (await UserService.getUsers()).data.sort(
    (a, b) => a.user_id - b.user_id
  );
}

async function loadFilteredUsers(): Promise<void> {
  filteredUsers.value = await allUsers.value
    .map(({ user_id, name }) => ({ user_id, name }))
    .filter(
      (a) => !moduleUsers.value.map((b) => b.user_id).includes(a.user_id)
    );
}

onBeforeMount(async () => {
  await loadModule();
  await loadAllUsers();
  await loadModuleUsers();
  await loadFilteredUsers();
  await getCurrentTags();
});

function addModuleUser(number: Number): void {
  const user = ref({});
  const moduleUser = ref({});
  user.value = allUsers.value.filter((a) => a.user_id == number)[0];
  moduleUser.value = getUserTemplate();
  moduleUser.value.user_id = user.value.user_id;
  moduleUser.value.name = user.value.name;
  moduleUser.value.username = user.value.username;
  moduleUser.value.email = user.value.email;
  ModuleManagerService.addModuleUser(module.value, moduleUser.value)
    .then(() => loadModuleUsers())
    .then(() => loadFilteredUsers());
}

function deleteModuleUser(user: ModuleUser): void {
  ModuleManagerService.delModuleUser(module.value, user)
    .then(() => loadModuleUsers())
    .then(() => loadFilteredUsers());
}

function getUserTemplate(): ModuleUser {
  return {
    user_id: 0,
    module_role: {
      role_id: 5,
      name: "tutor",
    },
    name: "",
    username: "",
    email: "",
  };
}

function goBack(): void {
  router.back();
}

const manageTagsDialog = ref({
  show: false,
});

const manageUsersDialog = ref({
  show: false,
});

const editPrivilegeDialog = ref({
  show: false,
});

function getCurrentTags(): void {
  ExerciseService.getExercisesForModule(module.value.module_id).then((res) => {
    exercises.value = [];
    tagsCurrent.value = [];
    exercises.value = res.data;
    exercises.value.forEach((ex) => {
      ex.tags.forEach((t) => tagsCurrent.value.push(t));
    });
  });
}

function editTag(tag: Tag): void {
  TagService.editTag(tag);
}
function removeTag(tag: Tag): void {
  //No way to delete tags globally
  exercises.value.forEach((ex) => {
    TagService.delTagFromExercise(tag, ex).then(() => getCurrentTags());
  });
}
</script>

<style scoped>
.manage-button {
  margin-right: 1em;
}

.add-user-btn {
  margin-top: 1em;
  margin-bottom: -1em;
}
.centered-input >>> input {
  text-align: center
}

.test-class {
  margin-bottom: -2.5em;
}

.extend {
  width: 15em;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

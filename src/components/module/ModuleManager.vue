<template>
  <v-container>
    <v-card v-if="!embedded">
      <v-row>
        <v-col cols="2" align-self="center">
          <v-tooltip bottom>
            <template v-slot:activator="{ props: tooltip3 }">
              <v-btn v-bind="tooltip3" @click="goBack()" class="back-button" rounded="false">
                <v-icon icon="mdi-arrow-left"/>
              </v-btn>
            </template>
            <span v-html="$t('buttons.back')"/>
          </v-tooltip>
        </v-col>
        <v-col cols="8">
          <v-card-title> {{ module.name }}</v-card-title>
        </v-col>
        <v-col cols="2">
          <v-btn @click="manageTagsDialog.show = true">
            {{ $t("module_manager.edit_tag_button") }}
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
    <br>
    <v-btn @click="manageTagsDialog.show = true" v-if="embedded" class="embeddedEditTagsButton">
      {{ $t("module_manager.edit_tag_button") }}
    </v-btn>
    <br>
    <br/>
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
                <v-tooltip top>
                  <template v-slot:activator="{ props: tooltip }">
                    <v-btn
                        @click="
                      editPrivilegeDialog.show = true;
                      editPrivilegeDialog.userRole = user.module_role.name;
                      editPrivilegeDialog.user = user;
                    "
                        class="manage-button"
                        color="primary"
                        v-bind="tooltip"
                    >
                      <v-icon icon="mdi-cog"></v-icon>
                    </v-btn>
                  </template>
                  <span v-html="$t('module_manager.edit_privilege')"/>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ props: tooltip2 }">
                    <v-btn
                        class="manage-button"
                        @click="deleteModuleUser(user)"
                        color="error"
                        v-bind="tooltip2"
                    >
                      <v-icon icon="mdi-delete"></v-icon>
                    </v-btn>
                  </template>
                  <span v-html="$t('buttons.remove')"/>
                </v-tooltip>

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
      <!-- [Desktop] -->
    <v-dialog
        class="d-none d-md-flex"
        v-model="manageTagsDialog.show"
        :retain-focus="false"
        transition="slide-y-transition"
    >
      <v-card top="20%" width="50vw">
        <v-card-title> {{ $t("module_manager.edit_tag") }}</v-card-title>
        <v-card-text>
          <v-table fixed-header height="400px">
            <thead>
            <tr>
              <th class="hide-btn-behind-header">{{ $t("module_manager.tag") }}</th>
              <th class="hide-btn-behind-header"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="tag in tagsCurrent" v-bind:key="tag.tag_id">
              <td>
                <v-container class="test-class">
                  <v-text-field
                      vertical-align="middle"
                      class="centered-input extend"
                      v-model="tag.name"
                  />
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
      <!-- [Desktop] -->
      <!-- [Mobile] -->
    <v-dialog
        class="d-md-none"
        v-model="manageTagsDialog.show"
        :retain-focus="false"
        transition="slide-y-transition"
    >
      <v-card top="20%" width="80vw">
        <v-card-title> {{ $t("module_manager.edit_tag") }}</v-card-title>
        <v-card-text>
          <v-table fixed-header height="400px">
            <thead>
            <tr>
              <th class="hide-btn-behind-header">{{ $t("module_manager.tag") }}</th>
              <th class="hide-btn-behind-header"></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="tag in tagsCurrent" v-bind:key="tag.tag_id">
              <td>
                <v-container class="test-class">
                  <v-text-field
                      vertical-align="middle"
                      class="centered-input extend"
                      v-model="tag.name"
                  />
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
      <!-- [Mobile] -->
    <!-- Edit tags dialog end -->

    <!-- Edit users dialog start -->
      <!-- [Desktop] -->
    <v-dialog
        class="d-none d-md-flex"
        v-model="editPrivilegeDialog.show"
        :retain-focus="false"
        transition="slide-y-transition"
    >
      <v-card top="15%" width="50vw">
        <v-card-title> {{ $t("module_manager.edit_privilege") }}</v-card-title>
        <v-card-text>
          <v-radio-group v-model="editPrivilegeDialog.userRole">
            <v-radio
                :label="$t('module_manager.student')"
                :key="1"
                value="student"
            />
            <v-radio
                :label="$t('module_manager.tutor')"
                value="tutor"
                :key="2"
            />
            <v-radio
                :label="$t('module_manager.teacher')"
                value="teacher"
                :key="3"
            />
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn
              @click="
              editPrivilegeDialog.show = false;
              editPrivilegeDialog.userRole = null;
              editPrivilegeDialog.user = null;
            "
              color="error"
              v-html="$t('buttons.close')"
          />
          <v-btn
              @click="
              editPrivilegeDialog.show = false;
              setUserRole(editPrivilegeDialog.user, editPrivilegeDialog.userRole);
            "
              color="primary"
              v-html="$t('buttons.save')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
      <!-- [Desktop] -->
      <!-- [Mobile] -->
    <v-dialog
        class="d-md-none"
        v-model="editPrivilegeDialog.show"
        :retain-focus="false"
        transition="slide-y-transition"
    >
      <v-card top="15%" width="80vw">
        <v-card-title> {{ $t("module_manager.edit_privilege") }}</v-card-title>
        <v-card-text>
          <v-radio-group v-model="editPrivilegeDialog.userRole">
            <v-radio
                :label="$t('module_manager.student')"
                :key="1"
                value="student"
            />
            <v-radio
                :label="$t('module_manager.tutor')"
                value="tutor"
                :key="2"
            />
            <v-radio
                :label="$t('module_manager.teacher')"
                value="teacher"
                :key="3"
            />
          </v-radio-group>
        </v-card-text>
        <v-card-actions>
          <v-btn
              @click="
              editPrivilegeDialog.show = false;
              editPrivilegeDialog.userRole = null;
              editPrivilegeDialog.user = null;
            "
              color="error"
              v-html="$t('buttons.close')"
          />
          <v-btn
              @click="
              editPrivilegeDialog.show = false;
              setUserRole(editPrivilegeDialog.user, editPrivilegeDialog.userRole);
            "
              color="primary"
              v-html="$t('buttons.save')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
      <!-- [Mobile] -->
    <!-- Edit users dialog end -->

    <!-- Edit users dialog start -->
      <!-- [Desktop] -->
    <v-dialog
        class="d-none d-md-flex"
        v-model="manageUsersDialog.show"
        :retain-focus="false"
        transition="slide-y-transition"
    >
      <v-card top="20%" width="50vw">
        <v-card-title> {{ $t("module_manager.add_user") }}</v-card-title>
        <v-table fixed-header height="400px">
          <thead>
          <tr>
            <th>{{ $t("module_manager.name") }}</th>
            <th class="hide-btn-behind-header"></th>
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
      <!-- [Desktop] -->
      <!-- [Mobile] -->
    <v-dialog
        class="d-md-none"
        v-model="manageUsersDialog.show"
        :retain-focus="false"
        transition="slide-y-transition"
    >
      <v-card top="20%" width="80vw">
        <v-card-title> {{ $t("module_manager.add_user") }}</v-card-title>
        <v-table fixed-header height="400px">
          <thead>
          <tr>
            <th>{{ $t("module_manager.name") }}</th>
            <th class="hide-btn-behind-header"></th>
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
      <!-- [Mobile] -->
    <!-- Edit users dialog end -->
  </v-container>
</template>

<script setup lang="ts">
import {onBeforeMount, Ref, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import UserService from "@/services/UserService";
import ModuleService from "@/services/ModuleService";
import TagService from "@/services/TagService";
import ExerciseService from "@/services/ExerciseService";
import {Exercise, Module, ModuleUser, Role, Tag, User} from "@/helpers/types";
import {defineProps} from "vue";

//Router
const route = useRoute();
const router = useRouter();
const module: Ref<Module> = ref({}) as Ref<Module>;
const moduleUsers: Ref<ModuleUser[]> = ref([]);
const allUsers: Ref<ModuleUser[]> = ref([]);
const filteredUsers: Ref<User[]> = ref([]);
const tagsCurrent: Ref<Tag[]> = ref([]);
const exercises: Ref<Exercise[]> = ref([]);

defineProps<{
  embedded?: boolean
}>()

async function loadModule(): Promise<void> {
  ModuleService.getModule(route.params.module instanceof Array ? route.params.module[0] : route.params.module).then((res) => {
    module.value = res.data;
  }).then(() => {
    loadAllUsers().then(() => {
      loadFilteredUsers();
    });
    loadModuleUsers();
    getCurrentTags();
  });
}

async function loadModuleUsers(): Promise<void> {
  moduleUsers.value = (
      await ModuleService.getModuleUsers(module.value)
  ).data.sort((a: ModuleUser, b: ModuleUser) => a.user_id - b.user_id);
}

async function loadAllUsers(): Promise<void> {
  allUsers.value = (await UserService.getUsers())
      .data.sort(
          (a: ModuleUser, b: ModuleUser) => a.user_id - b.user_id
      );
}

async function loadFilteredUsers(): Promise<void> {
  filteredUsers.value = allUsers.value
      .map(({user_id, name}) => ({user_id, name}))
      .filter(
          (a) => !moduleUsers.value.map((b) => b.user_id).includes(a.user_id)
      ) as User[];
}

onBeforeMount(async () => {
  await loadModule();
});

function addModuleUser(number: number): void {
  const user = ref({}) as Ref<ModuleUser>;
  const moduleUser = ref({}) as Ref<ModuleUser>;
  user.value = allUsers.value.filter((a) => a.user_id == number)[0];
  moduleUser.value = getUserTemplate();
  moduleUser.value.user_id = user.value.user_id;
  moduleUser.value.name = user.value.name;
  moduleUser.value.username = user.value.username;
  moduleUser.value.email = user.value.email;
  ModuleService.addModuleUser(module.value, moduleUser.value)
      .then(() => loadModuleUsers())
      .then(() => loadFilteredUsers());
}

function deleteModuleUser(user: ModuleUser): void {
  ModuleService.delModuleUser(module.value, user)
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
  userRole: "",
  user: undefined,
}) as Ref<{
  show: boolean;
  userRole: string;
  user: ModuleUser | undefined;
}>;

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

function setUserRole(user: ModuleUser, role: string): void {
  UserService.getRoles().then((res) => {
    user.module_role = res.data.find((a: Role) => a.name == role)
    ModuleService.editModuleUser(module.value, user); // intentionally not awaited, api does not update user role}
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
  text-align: center;
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

.hide-btn-behind-header {
  z-index: 1;
}

.embeddedEditTagsButton{
  margin-right: auto;
  margin-left: auto;
  display: block;
}
</style>

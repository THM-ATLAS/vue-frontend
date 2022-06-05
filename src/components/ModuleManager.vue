<template>
  <v-container>
    <v-card>
      <!-- TEST BUTTON -->
      <v-btn @click="addMaxim()">Add me</v-btn>
      <v-btn @click="removeMaxim()">Remove me</v-btn>
      <v-btn @click="logButton()">Log</v-btn>
      <!-- TEST BUTTON -->
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
            {{ $t("module_manager.edit_tag") }}
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
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in moduleUsers" v-bind:key="user.user_id">
                <td>{{ user.name }}</td>
                <td>{{ user.module_role.name }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
        <v-btn @click="manageUsersDialog.show = true">User hinzufügen</v-btn>
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
      <v-card top="20%" width="50vw">
        <v-card-title> Tags für Modulname </v-card-title>
        <v-card-text> TABELLE MIT TAGS ZUM SELECTEN </v-card-text>
        <v-card-actions>
          <v-btn
            @click="manageTagsDialog.show = false"
            color="error"
            v-html="$t('buttons.cancel')"
          />
          <v-btn
            @click="manageTagsDialog.show = false"
            color="primary"
            v-html="$t('buttons.save')"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
    <!-- Edit tags dialog end -->

    <!-- Edit users dialog start -->
    <v-dialog
      v-model="manageUsersDialog.show"
      :retain-focus="false"
      transition="slide-y-transition"
    >
      <v-card top="20%" width="50vw">
        <v-card-title> User hinzufügen </v-card-title>
        <v-table>
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
              <tr v-for="user in users" v-bind:key="user.user_id">
                <td>{{ user.name }}</td>
                <td class="text-right">
                  <v-btn
                  @click="logger(user.user_id)">
                    Hinzufügen
                  </v-btn>
                </td>
              </tr>
          </tbody>
        </v-table>
        <v-card-actions>
          <v-btn
            @click="manageUsersDialog.show = false"
            color="error"
          >Schließen</v-btn>
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
import ModuleManagerService from "@/services/ModuleManagerService";
import { ModuleUser, User, Module } from "@/helpers/types";

const route = useRoute();

const router = useRouter();
const users: Ref<User[]> = ref([]);
const moduleUsers: Ref<ModuleUser[]> = ref([]);
const module: Ref<Module> = ref({}) as Ref<Module>;
const user = {
  user_id: 5,
  module_role: {
    role_id: 3,
    name: "student",
  },
  name: "Maxim Odenweller",
  username: "modn04",
  email: "maxim.odenweller@mni.thm.de",
};

async function loadUsers(): Promise<void> {
  users.value = (await UserService.getUsers()).data.sort(
    (a, b) => a.user_id - b.user_id
  );
}

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

onBeforeMount(async () => {
  await loadModule();
  await loadUsers();
  await loadModuleUsers();
});

function goBack(): void {
  router.back();
}

const manageTagsDialog = ref({
  show: false,
});

const manageUsersDialog = ref({
  show: false,
});

/**
 * Test stuff
 */

function addMaxim(): void {
  ModuleManagerService.addModuleUser(module.value, user).then(() => loadModuleUsers());
}

function removeMaxim(): void {
  ModuleManagerService.delModuleUser(module.value, user).then(() => loadModuleUsers());
}

function logButton(): void {
  console.log(users.value.map(({user_id, name}) => ({user_id, name})));
  console.log(moduleUsers.value.map(({user_id, name}) => ({user_id, name})));
  //console.log(users.value.map(({user_id, name}) => ({user_id, name})).filter((user) => !moduleUsers.value.map(({user_id, name}) => ({user_id, name})).includes(user)));
}

function logger(number: Number): void {
  console.log(number);
}
</script>

<style scoped>
.text-right {
  text-align: right;
}
</style>

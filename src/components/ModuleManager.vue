<template>
  <v-container>
    <v-card>
      <!-- TEST BUTTON -->
      <!-- <v-btn @click="test()">Test</v-btn> -->
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
          <v-btn @click="manageTagsDialog.show = true">  {{ $t('module_manager.edit_tag') }}  </v-btn>
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
                <th class="text-left"> {{ $t('module_manager.name') }} </th>
                <th class="text-left"> {{ $t('module_manager.roles') }} </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="user in users" v-bind:key="user.user_id">
                <td>{{ user.name }}</td>
                <td>PLACEHOLDER</td>
              </tr>
            </tbody>
          </v-table>
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
  </v-container>
</template>

<script setup lang="ts">
import { onBeforeMount, Ref, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import UserService from "@/services/UserService";
import ModuleService from "@/services/ModuleService";
import { User, Module } from "@/helpers/types";

const route = useRoute();

const router = useRouter();
const users: Ref<User[]> = ref([]);
const module: Ref<Module> = ref({}) as Ref<Module>;

async function loadUsers(): Promise<void> {
  users.value = (await UserService.getUsers()).data.sort(
    (a, b) => a.user_id - b.user_id
  );
}

async function loadModule(): Promise<void> {
  ModuleService.getModule(route.params.module).then(res => {
    module.value = res.data;
  });
}

onBeforeMount(async () => {
  await loadModule();
  await loadUsers();
});

function goBack(): void {
  router.back();
}

const manageTagsDialog = ref({
  show: false,
});

// function test(): void {
// }
</script>

<style scoped></style>

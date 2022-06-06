<template>
  <div class="main">
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <div class="pt-0 pl-0 backButton">
          <v-btn
            @click="goBack"
            icon="mdi-menu-left"
            class="mx-3"
            variant="outlined"
          />
        </div>
        <v-card color="highlight" rounded="0" class="pb-0 mt-3">
          <v-row>
            <v-col cols="10" align-self="center">
            <h1>
              {{ module.name }}
            </h1>
            </v-col>
            <v-col cols="2" align-self="center" class="d-flex justify-end">
              <v-btn
              disabled>
                Einschreiben
              </v-btn>
            </v-col>
          </v-row>
          <v-tabs v-model="tab" class="pb-0 mt-2">
            <v-tab value="home">
              {{ $t("module_page.module") }}
            </v-tab>
            <v-tab value="about">
              {{ $t("module_page.about") }}
            </v-tab>
            <v-tab @click="goToManage()" value="manage">
              {{ $t("module_page.manage") }}
            </v-tab>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>

    <v-window v-model="tab">
      <v-window-item value="home">
        <div>
          <v-row align="center" justify="center" class="exerciseTextRow">
            <h2 class="exerciseText">{{ $t("module_page.exercises") }}</h2>
          </v-row>
          <v-row
            v-for="exercise in exercises"
            v-bind:key="exercise.exercise_id"
            class="exerciseListEntry"
            justify="center"
          >
            <v-card
              class="exerciseListBox"
              elevation="2"
              @click="goToExercise(exercise)"
            >
              <h1>
                <v-card-title>
                  {{ exercise.title }}
                </v-card-title>
              </h1>
              <v-card-text>
                {{ exercise.description }}
              </v-card-text>
            </v-card>
          </v-row>
        </div>
      </v-window-item>

      <v-window-item value="about">
        <div>
          <v-container class="aboutBox">
            <v-card>
              <v-row>
                <div>
                  <h3>{{ module.name }}</h3>
                  <p>{{ module.description }}</p>
                </div>
              </v-row>
            </v-card>
          </v-container>
          <v-container class="aboutBox">
            <v-row align="start" justify="center">
              <v-card style="width: 45%" class="mx-4">
                <div>
                  <h3>{{ $t("module_page.teachers") }}</h3>
                  <v-list>
                    <v-list-item
                      v-for="teacher in teachers"
                      :key="teacher.user_id"
                    >
                      <v-list-item-title>
                        {{ teacher.name }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </div>
              </v-card>
              <v-card style="width: 45%" class="mx-4">
                <div>
                  <h3>{{ $t("module_page.tutors") }}</h3>
                  <v-list>
                    <v-list-item v-for="tutor in tutors" :key="tutor.user_id">
                      <v-list-item-title>
                        {{ tutor.name }}
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </div>
              </v-card>
            </v-row>
          </v-container>
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import ModuleService from "@/services/ModuleService";
import ExerciseService from "@/services/ExerciseService";
import UserService from "@/services/UserService";
import { Exercise, Module, User  } from "@/helpers/types";

const route = useRoute();

const module: Ref<Module> = ref({}) as Ref<Module>;
const exercises: Ref<Array<Exercise>> = ref([]);
const tab = ref(0);
const teachers: Ref<Array<User>> = ref([]);
const tutors: Ref<Array<User>> = ref([]);

async function loadModule(): Promise<void> {
  ModuleService.getModule(route.params.module).then((res) => {
      module.value = res.data;
      document.title = module.value.name;
      ExerciseService.getExercisesForModule(module.value.module_id).then(
        (e) => {
          exercises.value = e.data;
        }
      );
    })
    .catch(() => {
      router.replace("/404");
    });
}

async function loadUsers(): Promise<void> {
  UserService.getUsers().then((res) => {
    teachers.value = res.data.filter((user: User) =>
      user.roles.some((role) => role.name === "teacher")
    );
  });
  UserService.getUsers().then((res) => {
    tutors.value = res.data.filter((user: User) =>
      user.roles.some((role) => role.name === "tutor")
    );
  });
}

onBeforeMount(async () => {
  await loadModule();
  await loadUsers();
  //await router.replace(`/${encodeURIComponent(module.moduleName)}`)
});
const router = useRouter();

function goBack(): void {
  router.back();
}

function goToExercise(exercise: Exercise): void {
  router.push("/" + module.value.module_id + "/e/" + exercise.exercise_id);
}

function goToManage(): void {
  router.push("/" + module.value.module_id + "/manage");
}
</script>

<style scoped lang="scss">
.main {
  margin-block: 6em;
  justify-content: center;
}

.exerciseListBox {
  width: 70%;
  justify-self: center;
  margin-top: 16px;
}

.aboutBox {
  width: 70%;
  justify-self: center;
  margin-top: 16px;
}
</style>

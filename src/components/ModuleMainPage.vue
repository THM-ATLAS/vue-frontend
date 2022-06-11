<template>
  <!-- desktop version -->
  <div class="desktopView d-none d-md-block">
    <!-- todo: Image loaded from backend -->
    <div>
      <v-img
          lazy-src="@/assets/product-5.jpg"
          max-height="240px"
          width="100%"
          src="@/assets/product-4.jpg"
          cover
      >
        <div class="moduleNameContainer"> <!-- todo: specify linebreaks to occur when h1 reaches 50% of its parent's width -->
          <h1>{{ module.name }} Sample Module</h1>
        </div>
      </v-img>
    </div>
    <!-- todo: find better back button placement -->
    <div class="pt-0 pl-0 backButton">
      <v-btn
          @click="goBack"
          icon="mdi-menu-left"
          class="mx-3 desktopBackButton"
          variant="outlined"/>
    </div>
    <!-- info card -> module description -->
    <!-- grid, left side contains exercises by category (use vuetify expansion panels), right side contains info cards for lecturers and tutors -->
    <v-card class="moduleInfoBox rounded-0" style="margin-top: 30px;">
      <v-card-text>{{module.description}}
        Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.
      </v-card-text>
    </v-card>
    <v-container fluid>
      <v-row>
        <v-col cols="9">
          <!-- todo: Aufgaben Dropdown erstellen -->
          <v-expansion-panels style="z-index: 0;">
            <v-expansion-panel rounded="0">
              <v-expansion-panel-title
                  expand-icon="mdi-plus"
                  collapse-icon="mdi-minus"
              >
                <b>{{$t('module_page.exercises')}}</b>
              </v-expansion-panel-title>
              <v-expansion-panel-text style="text-align: center">
                <v-card class="exerciseCard">
                  <v-card-title class="exerciseCardTitle">Aufgabe 1</v-card-title>
                  <v-img src="@/assets/product-4.jpg" class="exerciseCardImage" contain></v-img>
                  <v-card-text class="exerciseCardText">Aufgabe 1 ist einfach, probiere es!</v-card-text>
                </v-card>
                <v-card class="exerciseCard">
                  <v-card-title class="exerciseCardTitle">Aufgabe 2</v-card-title>
                  <v-img src="@/assets/product-2.jpg" class="exerciseCardImage" contain></v-img>
                  <v-card-text class="exerciseCardText">Aufgabe 2 kann etwas länger dauern.</v-card-text>
                </v-card>
                <v-card class="exerciseCard">
                  <v-card-title class="exerciseCardTitle">Aufgabe 3</v-card-title>
                  <v-img src="@/assets/product-1.jpg" class="exerciseCardImage" contain></v-img>
                  <v-card-text class="exerciseCardText">Aufgabe 3 ist die schwerste.</v-card-text>
                </v-card>
                <v-card class="exerciseCard">
                  <v-card-title class="exerciseCardTitle">Aufgabe 2</v-card-title>
                  <v-img src="@/assets/product-2.jpg" class="exerciseCardImage" contain></v-img>
                  <v-card-text class="exerciseCardText">Aufgabe 2 kann etwas länger dauern.</v-card-text>
                </v-card>                <v-card class="exerciseCard">
                <v-card-title class="exerciseCardTitle">Aufgabe 2</v-card-title>
                <v-img src="@/assets/product-2.jpg" class="exerciseCardImage" contain></v-img>
                <v-card-text class="exerciseCardText">Aufgabe 2 kann etwas länger dauern.</v-card-text>
              </v-card>                <v-card class="exerciseCard">
                <v-card-title class="exerciseCardTitle">Aufgabe 2</v-card-title>
                <v-img src="@/assets/product-2.jpg" class="exerciseCardImage" contain></v-img>
                <v-card-text class="exerciseCardText">Aufgabe 2 kann etwas länger dauern.</v-card-text>
              </v-card>                <v-card class="exerciseCard">
                <v-card-title class="exerciseCardTitle">Aufgabe 2</v-card-title>
                <v-img src="@/assets/product-2.jpg" class="exerciseCardImage" contain></v-img>
                <v-card-text class="exerciseCardText">Aufgabe 2 kann etwas länger dauern.</v-card-text>
              </v-card>                <v-card class="exerciseCard">
                <v-card-title class="exerciseCardTitle">Aufgabe 2</v-card-title>
                <v-img src="@/assets/product-2.jpg" class="exerciseCardImage" contain></v-img>
                <v-card-text class="exerciseCardText">Aufgabe 2 kann etwas länger dauern.</v-card-text>
              </v-card>                <v-card class="exerciseCard">
                <v-card-title class="exerciseCardTitle">Aufgabe 2</v-card-title>
                <v-img src="@/assets/product-2.jpg" class="exerciseCardImage" contain></v-img>
                <v-card-text class="exerciseCardText">Aufgabe 2 kann etwas länger dauern.</v-card-text>
              </v-card>
              </v-expansion-panel-text>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
        <v-col cols="3">
          <!-- todo: API Anbindung -->
          <v-card class="moduleInfoBox rounded-0">
            <v-card-title>{{$t('module_page.teachers')}}</v-card-title>
            <v-card-text>
              <v-list class="moduleInfoBoxList">
                <v-list-item>Max</v-list-item>
                <v-list-item>Manuela</v-list-item>
                <v-list-item>Alice</v-list-item>
                <v-list-item>Bob</v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          <v-card class="moduleInfoBox rounded-0">
            <v-card-title>{{$t('module_page.tutors')}}</v-card-title>
            <v-card-text>
              <v-list class="moduleInfoBoxList">
                <v-list-item>Max</v-list-item>
                <v-list-item>Manuela</v-list-item>
                <v-list-item>Alice</v-list-item>
                <v-list-item>Bob</v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          <v-card class="moduleInfoBox rounded-0">
            <v-card-title>{{$t('module_page.materials')}}</v-card-title>
            <v-card-text>
              <v-list class="moduleInfoBoxList">
                <v-list-item>Buch 1</v-list-item>
                <v-list-item>Video 1</v-list-item>
                <v-list-item>Video 2e</v-list-item>
                <v-list-item>Buch 2</v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>

  <!-- mobile version-->
  <div class="mobileView d-xs-block d-sm-block d-md-none">
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <div class="pt-0 pl-0 backButton">
          <v-btn
              @click="goBack"
              icon="mdi-menu-left"
              class="mx-3"
              variant="outlined"/>
        </div>
        <v-card color="highlight" rounded="0" class="pb-0 mt-3">

          <h1>
            {{ module.name }}
          </h1>

          <v-tabs v-model="tab" class="pb-0 mt-2">
            <v-tab value="home">
              {{ $t('module_page.module') }}
            </v-tab>
            <v-tab value="about">
              {{ $t('module_page.about') }}
            </v-tab>
          </v-tabs>
        </v-card>
      </v-col>
    </v-row>

    <v-window v-model="tab">
      <v-window-item value="home">
        <div>
          <v-row align="center" justify="center" class="exerciseTextRow">
            <h2 class="exerciseText">{{ $t('module_page.exercises') }}</h2>
          </v-row>
          <v-row
              v-for="exercise in exercises"
              v-bind:key="exercise.exercise_id"
              class="exerciseListEntry"
              justify="center"
          >
            <v-card class="exerciseListBox"
                    elevation="2"
                    @click="goToExercise(exercise)">
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
              <v-card class="mx-4 infoCardMobile">
                <div>
                  <h3>{{ $t('module_page.teachers') }}</h3>
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
              <v-card class="mx-4 infoCardMobile">
                <div>
                  <h3>{{ $t('module_page.tutors') }}</h3>
                  <v-list>
                    <v-list-item
                        v-for="tutor in tutors"
                        :key="tutor.user_id"
                    >
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
import {onBeforeMount, ref, Ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import ModuleService from "@/services/ModuleService";
import ExerciseService from "@/services/ExerciseService";
import UserService from "@/services/UserService";
import {Exercise, Module, User} from "@/helpers/types";

const route = useRoute();

const module: Ref<Module> = ref({}) as Ref<Module>;
const exercises: Ref<Array<Exercise>> = ref([])
const tab = ref(0)
const teachers: Ref<Array<User>> = ref([])
const tutors: Ref<Array<User>> = ref([])

onBeforeMount(async () => {
  ModuleService.getModule(route.params.module).then(res => {
    module.value = res.data
    document.title = module.value.name
    ExerciseService.getExercisesForModule(module.value.module_id).then(e => {
      exercises.value = e.data
    })
  }).catch(() => {
    //router.replace("/404")
    //todo: uncomment this and rollback index.ts before pushing
  })
  UserService.getUsers().then(res => {
    teachers.value = res.data.filter((user: User) => user.roles.some(role => role.name === "teacher"))
  })
  UserService.getUsers().then(res => {
    tutors.value = res.data.filter((user: User) => user.roles.some(role => role.name === "tutor"))
  })
  //await router.replace(`/${encodeURIComponent(module.moduleName)}`)
})
const router = useRouter();

function goBack(): void {
  router.back()
}


function goToExercise(exercise: Exercise): void {
  router.push("/" + module.value.module_id + "/e/" + exercise.exercise_id);
}
</script>

<style scoped lang="scss">
//CSS classes for the desktop version of the component
.desktopView {
  background-color: rgb(var(--v-theme-surface));
  width: 90%;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6em;
}

.desktopBackButton{
  margin-top: 10px;
}

.moduleNameContainer{
  background-color: rgb(var(--v-theme-surface));
  align-self: center;
  position: relative;
  top: 25%;
  padding: 2em;
  padding-left: 0.8em;
  display: inline-block;
  h1 {
    text-align: left;
  }
}

.moduleInfoBox{
  background-color: rgb(var(--v-theme-background)) !important;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
}
//can't apply css to v-lists using tags in the moduleInfoBox class - not specific enough to override vuetify styling
.moduleInfoBoxList{
  background-color: rgb(var(--v-theme-background)) !important;
}

.exerciseCard{
  display: inline-block;
  margin: 10px;
  width: 250px;
  height: 340px;
  .exerciseCardTitle {
    text-align: center;
    display: block;
  }
  .exerciseCardText {
    text-align: center;
  }
  .exerciseCardImage {
    //use of min and max to stop resizing of v-img - fixed width and height don't work
    min-height: 160px;
    max-height: 160px;
    min-width: 200px;
    max-width: 200px;
    margin-left: auto;
    margin-right: auto;
  }
}

//CSS classes for the mobile version of the component
.mobileView {
  margin-block: 6em;
  justify-content: center;
  background-color: rgb(var(--v-theme-surface));
  padding-bottom: 6px;
}

.exerciseListBox {
  width: 70%;
  justify-self: center;
  margin-top: 16px;
  margin-bottom: 6px;
}

.aboutBox {
  width: 95%;
  justify-self: center;
  margin-top: 16px;
}

.infoCardMobile {
  width: 100%;
  margin-top: 20px;
}
</style>
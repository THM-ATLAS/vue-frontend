<template>
  <div>
    <!-- desktop version -->
    <div class="desktopView d-none d-md-block">
      <!-- todo: Image loaded from backend -->
      <div>
        <v-img
            src="@/assets/ModuleMainPage/pexels-hitarth-jadhav.jpg"
            max-height="240px"
            width="100%"
            :cover="true"
        >
          <div class="moduleNameContainer">
            <v-row align="center">
              <v-icon size="large" style="margin-right: 0.3em;" :icon="moduleIcon"></v-icon>
              <h1>{{ module.name }}</h1>
            </v-row>
          </div>
        </v-img>
      </div>
      <!-- todo: edit button and menu for lecturers and admins-->
      <div class="pt-0 pl-0 desktopBackButton">
        <v-tooltip bottom>
          <template v-slot:activator="{ props: tooltip3 }">
            <v-btn
                v-bind="tooltip3"
                @click="goBack"
                icon="mdi-menu-left"
                class="ma-2"
                variant="outlined"/>
          </template>
          <span v-html="$t('buttons.back')"/>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ props: tooltip3 }">
            <v-btn
                v-if="canSeeManage()"
                v-bind="tooltip3"
                @click="goToManage()"
                icon="mdi-cog"
                class="mx-3"
                variant="outlined"
            />
          </template>
          <span v-html="$t('buttons.edit')"/>
        </v-tooltip>
      </div>
      <v-card
          class="moduleInfoBox rounded-0"
          style="margin-top: 30px"
          id="content"
      >
        <v-card-text>
          <v-row>
            <v-col cols="8">
              {{ module.description }}
            </v-col>
            <v-spacer/>
            <v-col cols="auto">
              <v-tooltip top>
                <template v-slot:activator="{ props }">
                  <v-btn v-if="canSeeAttend()" @click="reassign" color="secondary" v-bind="props">
                    {{ label.value }}
                  </v-btn>
                </template>
                <span v-if="assignedStatus">{{ $t("module_page.disenroll") }}</span>
                <span v-else>{{ $t("module_page.enrollment") }}</span>
              </v-tooltip>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-container fluid>
        <v-row>
          <v-col cols="9">
            <v-chip
                class="ma-1 mb-3"
                v-for="tag in moduleTags" :key="tag.tag_id"
                @click="filter(tag)"
                :color="selectedTag.value === tag.name ? 'info' : ''">
              <v-icon class="tag-icon" size="small" :icon="tag.icon.reference"/>
              {{ tag.name }}
            </v-chip>
            <v-text-field
                class="mb-4 mt-1"
                :label="$t('module_page.search_exercise')"
                v-model="search"
                prepend-icon="mdi-magnify"
                single-line
                hide-details
                @input="applySearch"/>
            <v-expansion-panels style="z-index: 0" v-model="panel">
              <v-expansion-panel rounded="0" key="0">
                <v-expansion-panel-title
                    expand-icon="mdi-plus"
                    collapse-icon="mdi-minus"
                >
                  <b>{{ $t("module_page.exercises") }}</b>
                </v-expansion-panel-title>
                <v-expansion-panel-text class="exercisePanelText">
                  <div style="display: inline-flex; text-align: center">
                    <v-card
                        v-if="canSeeManage()"
                        class="exerciseCard"
                        tabindex="0"
                        @keyup.enter.prevent.stop="goToCreator"
                        @click.prevent.stop="goToCreator"
                    >
                      <v-card-title class="exerciseCardTitle">{{ $t('exercise.add_exercise') }}</v-card-title>
                      <v-icon
                          class="exercise-icon"
                          size="180px"
                          icon="mdi-plus"
                      ></v-icon>
                    </v-card>
                  </div>
                  <div style="display: inline-flex; text-align: center">
                    <v-card
                        v-if="filteredExercises.filter((e) => setExercise(e)).length === 0"
                        class="exerciseCard"
                        tabindex="0"
                    >
                      <v-card-title class="exerciseCardTitle">{{ $t('module_search.no_results') }}</v-card-title>
                      <v-icon
                          class="exercise-icon"
                          size="180px"
                          icon="mdi-magnify-close"
                      ></v-icon>
                    </v-card>
                  </div>
                  <div
                      v-for="exercise in filteredExercises"
                      v-bind:key="exercise.exercise_id"
                      style="display: inline-flex; text-align: center"
                  >
                    <v-card
                        v-if="setExercise(exercise)"
                        class="exerciseCard"
                        tabindex="0"
                        @keyup.enter.prevent.stop="goToExercise(exercise)"
                        @click.prevent.stop="goToExercise(exercise)"
                    >
                      <v-card-title class="exerciseCardTitle">{{
                          exercise.title
                        }}
                      </v-card-title>
                      <!-- <v-chip
                    class="tag-chip"
                    v-for="tag in exercise.tags" :key="tag.tag_id">
                      {{ tag.name }}
                    </v-chip> -->
                      <v-icon
                          class="exercise-icon"
                          size="180px"
                          icon="mdi-book-open-blank-variant"
                      ></v-icon>
                      <v-card-text class="exerciseCardText">{{
                          exercise.description
                        }}
                      </v-card-text>
                    </v-card>
                  </div>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
          <v-col cols="3">
            <v-card class="moduleInfoBox rounded-0">
              <v-card-title>{{ $t("module_page.teachers") }}</v-card-title>
              <v-card-text>
                <v-list
                    class="moduleInfoBoxList"
                    v-for="teacher in teachers"
                    :key="teacher.user_id"
                >
                  <v-list-item class="moduleInfoListItem"
                               @click="visitProfile(teacher)">
                    <v-tooltip right>
                      <template v-slot:activator="{ props: tooltip }">
                        <span v-bind="tooltip">
                        <v-icon
                            class="ml-3"
                            icon="mdi-account"
                            style="margin-right: 8px"
                        />
                        {{ teacher.name }}
                          </span>
                      </template>
                      <span v-html="$t('buttons.visit_profile')"/>
                    </v-tooltip>

                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
            <v-card class="moduleInfoBox rounded-0">
              <v-card-title>{{ $t("module_page.tutors") }}</v-card-title>
              <v-card-text>
                <v-list
                    class="moduleInfoBoxList"
                    v-for="tutor in tutors"
                    :key="tutor.user_id"
                >
                  <v-list-item class="moduleInfoListItem"
                               @click="visitProfile(tutor)">
                    <v-tooltip right>
                      <template v-slot:activator="{ props: tooltip }">
                        <span v-bind="tooltip">
                          <v-icon
                              class="ml-3"
                              icon="mdi-account"
                              style="margin-right: 8px"
                          />
                          {{ tutor.name }}
                          </span>
                      </template>
                      <span v-html="$t('buttons.visit_profile')"/>
                    </v-tooltip>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          <v-card class="moduleInfoBox rounded-0">
            <v-card-title>{{$t('module_page.materials')}}</v-card-title>
            <v-card-text>
              <v-list class="moduleInfoBoxList" v-for="link in referralLinks" :key="link.module_link_id">
                <!-- backend doesn't provide replacement text for a URL -->
                <v-list-item><v-icon style="padding-right: 1em">mdi-link</v-icon>
                  <a :href="link.link" target="_blank" rel="noopener noreferrer">{{link.link}}</a></v-list-item>
              </v-list>

              <v-list class="moduleInfoBoxList" v-for="asset in referralAssets" :key="asset.asset_id">
                <v-list-item
                @click="AssetService.downloadAssetPrompt(asset.asset_id, asset.filename)">
                  <v-icon style="padding-right: 1em">mdi-file</v-icon>{{asset.filename}}</v-list-item>
              </v-list>
            </v-card-text>
          </v-card>
          </v-col>
        </v-row>
      </v-container>
    </div>

    <!-- mobile version-->
    <div class="mobileView d-xs-block d-sm-block d-md-none">
      <v-img
          src="@/assets/ModuleMainPage/pexels-hitarth-jadhav.jpg"
          max-height="70px"
          width="100%"
          :cover="true"
      />
      <v-card color="highlight" rounded="0" class="pb-0">
        <h1 class="mobileModuleTitle">
          {{ module.name }}
        </h1>
        <v-btn @click="reassign" color="secondary" class="mobileEnrollButton">
          {{ label.value }}
        </v-btn>

        <v-tabs v-model="tab" class="pb-0 mt-2">
          <v-tab value="home">
            {{ $t("module_page.module") }}
          </v-tab>
          <v-tab value="about">
            {{ $t("module_page.about") }}
          </v-tab>
          <v-tab value="settings">
            {{ $t("module_page.manage") }}
          </v-tab>
        </v-tabs>
      </v-card>

      <v-window v-model="tab">
        <v-window-item value="home">
          <div class="mt-3">
            <v-row align="center" justify="center" class="exerciseTextRow">
              <h2 class="exerciseText">{{ $t("module_page.exercises") }}</h2>
            </v-row>
            <v-chip
                class="ma-1 mb-3"
                v-for="tag in moduleTags" :key="tag.tag_id"
                @click="filter(tag)"
                :color="selectedTag.value === tag.name ? 'info' : ''">
              <v-icon class="tag-icon" size="small" :icon="tag.icon.reference"/>
              {{ tag.name }}
            </v-chip>
            <v-text-field
                class="mb-4 mt-1"
                :label="$t('module_page.search_exercise')"
                v-model="search"
                prepend-icon="mdi-magnify"
                single-line
                hide-details
                @input="applySearch"/>
            <v-row
                v-if="canSeeManage()"
                class="exerciseListEntry"
                justify="center">
              <v-card
                  class="exerciseListBox"
                  elevation="2"
                  @click="goToCreator"
              >
                <h1 class="ex-title">
                  <v-row>
                    <v-col cols="2">
                      <v-icon>mdi-plus</v-icon>
                    </v-col>
                    <v-col>
                      <v-card-title>
                        {{ $t('exercise.add_exercise') }}
                      </v-card-title>
                    </v-col>
                  </v-row>
                </h1>
              </v-card>
            </v-row>
            <v-row
                v-if="filteredExercises.filter((e) => setExercise(e)).length === 0"
                class="exerciseListEntry"
                justify="center">
              <v-card
                  class="exerciseListBox"
                  elevation="2"
              >
                <h1 class="ex-title">
                  <v-row>
                    <v-col cols="2">
                      <v-icon>mdi-magnify-close</v-icon>
                    </v-col>
                    <v-col>
                      <v-card-title>
                        {{ $t('module_search.no_results') }}
                      </v-card-title>
                    </v-col>
                  </v-row>
                </h1>
              </v-card>
            </v-row>
            <v-row
                v-for="exercise in filteredExercises"
                v-bind:key="exercise.exercise_id"
                class="exerciseListEntry"
                justify="center"
            >
              <v-card
                  v-if="setExercise(exercise)"
                  class="exerciseListBox"
                  elevation="2"
                  @click="goToExercise(exercise)"
              >
                <h1 class="ex-title">
                  <v-card-title>
                    {{ exercise.title }}
                  </v-card-title>
                </h1>
                <v-card-text>
                  {{ exercise.description }}
                </v-card-text>
                <v-chip v-for="tag in exercise.tags" :key="tag.tag_id">
                  {{ tag.name }}
                </v-chip>
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
                    <h3>{{ $t("module_page.teachers") }}</h3>
                    <v-list>
                      <v-list-item
                          v-for="teacher in teachers"
                          :key="teacher.user_id"
                          @click="visitProfile(teacher)"
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
                    <h3>{{ $t("module_page.tutors") }}</h3>
                    <v-list>
                      <v-list-item v-for="tutor in tutors"
                                   :key="tutor.user_id"
                                   @click="visitProfile(tutor)">
                        <v-list-item-title>
                          {{ tutor.name }}
                        </v-list-item-title>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-card>
                <v-card class="mx-4 infoCardMobile">
                  <v-card-title>{{$t('module_page.materials')}}</v-card-title>
                  <v-card-text>
                    <v-list v-for="link in referralLinks" :key="link.module_link_id">
                      <!-- backend doesn't provide replacement text for a URL -->
                      <v-list-item><v-icon style="padding-right: 1em">mdi-link</v-icon>
                        <a ref="{{link.link}}">{{link.link}}</a></v-list-item>
                    </v-list>

                    <v-list v-for="asset in referralAssets" :key="asset.asset_id">
                      <v-list-item
                          @click="AssetService.downloadAssetPrompt(asset.asset_id, asset.filename)">
                        <v-icon style="padding-right: 1em">mdi-file</v-icon>{{asset.filename}}</v-list-item>
                    </v-list>
                  </v-card-text>
                </v-card>
              </v-row>
            </v-container>
          </div>
        </v-window-item>

        <v-window-item value="settings">
          <ModuleManager embedded="true"/>
        </v-window-item>
      </v-window>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onBeforeMount, ref, Ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import ModuleService from "@/services/ModuleService";
import ExerciseService from "@/services/ExerciseService";
import UserService from "@/services/UserService";
import {Exercise, Module, User, ModuleUser, Tag} from "@/helpers/types";
import {useI18n} from "vue-i18n";
import ModuleManager from "@/components/module/ModuleManager.vue";
import TagService from "@/services/TagService";
import hasPermission, {Action, hasPermissionModule} from "@/helpers/permissions";
import {AxiosResponse} from "axios";
import {isLoggedIn} from "@/services/LoginService";
import ReferralService from "@/services/ReferralService";
import AssetService from "@/services/AssetService";

const route = useRoute();
const i18n = useI18n();

const module: Ref<Module> = ref({}) as Ref<Module>;
const moduleUsers: Ref<ModuleUser[]> = ref([]);
const exercises: Ref<Array<Exercise>> = ref([]);
const filteredExercises: Ref<Array<Exercise>> = ref([]);
const moduleTags: Ref<Tag[]> = ref([]);
const tab = ref(0);
const teachers: Ref<Array<User>> = ref([]);
const tutors: Ref<Array<User>> = ref([]);
const assignedStatus = ref();
const user: Ref<User> = ref({}) as Ref<User>;
const panel: Ref<Array<Number>> = ref([0]); // 0 = panel shown, 1 = panel hidden
const search = ref("");
const userMe: Ref<User | undefined> = ref(undefined);
const loggedIn: Ref<boolean> = ref(false);

const label = ref({
  value: "",
  user: user.value,
  assigned: false,
});
const selectedTag = ref({
  value: ''
})

const referralLinks = ref();
const referralAssets = ref<any>([]);
function fetchAssets(){
  ReferralService.getModuleReferralLinks(module.value).then((response: AxiosResponse) => {
    referralLinks.value = response.data
  });
  ReferralService.getModuleReferralAssets(module.value).then((response: AxiosResponse) => {
    //module assets as returned are asset ids, the asset needs to be fetched to be usable
    response.data.forEach((module_asset) => {
      AssetService.getAsset(module_asset.asset_id).then((res) => {
        referralAssets.value.push(res.data);
      })
    })
  })
}

const moduleIcon = ref("mdi-application")
async function loadModule(): Promise<void> {
  ModuleService.getModule(route.params.module instanceof Array ? route.params.module[0] : route.params.module)
      .then((res) => {
        module.value = res.data;
        moduleIcon.value = res.data.icon.reference;
        //icon.value.value = module.value.icon.reference;
        loadUsers();
        fetchAssets();
        document.title = module.value.name;
        ExerciseService.getExercisesForModule(module.value.module_id).then(
            (e) => {
              filteredExercises.value = exercises.value = e.data;
              getAssignStatus();
              getAllModuleTags();
            }
        );
      })
      .catch(() => {
        router.replace("/page-not-found");
      });
}

function applySearch(): void {
  filteredExercises.value = exercises.value.filter((exercise) => {
    return (exercise.title + ' ' + exercise.description).toLowerCase().includes(search.value.toLowerCase());
  })
}

async function loadUsers(): Promise<void> {
  ModuleService.getModuleUsers(module.value).then((res) => {
    teachers.value = res.data.filter((user: ModuleUser) =>
        user.module_role.name === "teacher"
    );
    tutors.value = res.data.filter((user: ModuleUser) =>
        user.module_role.name === "tutor"
    );
  });
}

function canSeeManage(): boolean {
  return !!userMe.value && moduleUsers.value && hasPermissionModule(Action.MODULE_MANAGER, userMe.value, moduleUsers.value.find((user) => user.user_id === userMe.value?.user_id));
}

function canSeeAttend(): boolean {
  return hasPermission(Action.MODULE_ATTEND, userMe.value);
}

onBeforeMount(async () => {
  await UserService.getMe().then((r: AxiosResponse) => {
    if (isLoggedIn(r)) {
      userMe.value = r.data
      loggedIn.value = true;
      window.localStorage.setItem('loggedIn', 'true')
    } else {
      window.localStorage.removeItem('loggedIn')
    }
  })
  await loadModule();
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

function goToCreator(): void {
  router.push("/" + module.value.module_id + "/e/new");
}

function visitProfile(user: User): void {
  router.push("/u/" + user.user_id);
}

function getAssignStatus(): void {
  ModuleService.getModuleUsers(module.value).then((res) => {
    moduleUsers.value = res.data;
    UserService.getMe().then((res) => {
      if (moduleUsers.value.map((a) => a.user_id).includes(res.data.user_id)) {
        assignedStatus.value = true;
        label.value.value = i18n.t('module_page.leave');
        label.value.user = res.data;
        label.value.assigned = true;
      } else {
        assignedStatus.value = false;
        label.value.value = i18n.t('module_page.attend');
        label.value.user = res.data;
        label.value.assigned = false;
      }
    });
  });
}

function reassign(): void {
  const moduleUser = ref({}) as Ref<ModuleUser>;
  moduleUser.value = getUserTemplate();
  moduleUser.value.user_id = label.value.user.user_id;
  moduleUser.value.name = label.value.user.name;
  moduleUser.value.username = label.value.user.username;
  moduleUser.value.email = label.value.user.email;
  label.value.assigned
      ? ModuleService.delModuleUser(module.value, moduleUser.value).then(
          () => getAssignStatus()
      )
      : ModuleService.addModuleUser(module.value, moduleUser.value).then(
          () => getAssignStatus()
      );
}

function getUserTemplate(): ModuleUser {
  return {
    user_id: 0,
    module_role: {
      role_id: 5,
      name: "student",
    },
    name: "",
    username: "",
    email: "",
  };
}

function filter(tag: Tag): void {
  selectedTag.value.value == tag.name ? selectedTag.value.value = '' : selectedTag.value.value = tag.name;
}

function setExercise(exercise: Exercise): boolean {
  if (selectedTag.value.value == '') {
    return true;
  } else {
    for (let tag of exercise.tags) {
      if (tag.name.toLowerCase() == selectedTag.value.value.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
}

function getAllModuleTags(): void {
  TagService.getModuleTags(module.value).then(res => {
    const filteredTags: Ref<Tag[]> = ref([]);
    res.data.forEach((tag: Tag) => filteredTags.value.map(t => t.tag_id).includes(tag.tag_id) ? 'nothing' : filteredTags.value.push(tag));
    moduleTags.value = filteredTags.value;
  })
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
  margin-bottom: 3em;
}

.desktopBackButton {
  margin: 10px;
}

.moduleNameContainer {
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

.moduleInfoBox {
  background-color: rgb(var(--v-theme-background)) !important;
  margin-left: 30px;
  margin-right: 30px;
  margin-bottom: 30px;
  overflow-x: hidden;
}

//can't apply css to v-lists using tags in the moduleInfoBox class - not specific enough to override vuetify styling
.moduleInfoBoxList {
  background-color: rgb(var(--v-theme-background)) !important;
}

.moduleInfoListItem {
  max-width: 100%;
  overflow-x: hidden;
  padding-inline-start: 0;
}

.exerciseCard {
  display: inline-block;
  margin: 10px;
  width: 250px;
  height: 340px;

  &:target {
    filter: brightness(150%);
  }

  .exerciseCardTitle {
    text-align: center;
    align-items: center;
    display: block;
    font-size: 1.1rem !important;
    height: 64px;
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

.exercisePanelText {
  background-color: rgb(var(--v-theme-background)) !important;
  text-align: center;
}

//CSS classes for the mobile version of the component
.mobileView {
  margin-block: 4.5em;
  justify-content: center;
  background-color: rgb(var(--v-theme-surface));
  padding-bottom: 6px;
}

.mobileModuleTitle {
  font-size: 1.5em;
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

.ex-title {
  margin-top: 0.5em;
}

.infoCardMobile {
  width: 100%;
  margin-top: 20px;
}

.tag-chip {
  margin-top: -2em;
}

.mobileEnrollButton {
  margin-left: auto;
  margin-right: 8px;
  display: block;
}

.tag-container {
  margin-left: 2em;
}

.tag-icon {
  margin-right: 0.2em;
}
</style>

<template>
  <v-app id="navbar">
    <v-app-bar elevation="3" justify="left" height="100px" role="navigation">
      <v-app-bar-title>
        <v-img v-if="theme === 'light'" @click="goToHome()" @keyup.enter.prevent.stop="goToHome"
               src="@/assets/ATLAS_Logo.svg" max-height="70px"/>
        <v-img v-else @click="goToHome()" @keyup.enter.prevent.stop="goToHome" src="@/assets/ATLAS_Logo_Dark.svg"
               max-height="70px"/>
      </v-app-bar-title>
      <CourseButton/>
      <v-spacer/>
      <v-spacer/>
      <v-spacer/>

      <!--nur sichtbar auf Bildschirmen, die groß genug sind, auf mobile findet man das alles im hamburger menu -->

      <!-- // disabled until search exists // <v-col>
        -<v-text-field
             class="d-none d-md-block"
             label="Suchen"
             prepend-inner-icon="mdi-magnify"
             variant="plain"
             bg-color="#eeeeee"
             role="search"
         />
      </v-col>-->


      <!--dropdown menu für desktop -->

      <!--<v-btn @click="goToSubmission()" class="d-none d-md-flex" text>Testabgabe</v-btn>-->

      <v-menu width="10em" origin="top" transition="scale-transition">
        <template v-if="loggedIn" v-slot:activator="{ props }">
          <!-- // disabled until notifications exist // v-badge :content="messages" color="primary" offset-x="18" offset-y="10" class="d-none d-md-flex"-->
          <v-btn v-if="loggedIn" id="profile-button" class="d-none d-md-flex mr-4 ml-5" rounded v-bind="props"
                 variant="outlined">
            {{ username }}
            <v-icon class="ml-3" icon="mdi-account"/>
          </v-btn>
          <v-btn v-else id="profile-button" @click="goToLogin" class="d-none d-md-flex mr-4 ml-5" rounded
                 v-bind="props" variant="outlined">
            Login
            <v-icon class="ml-3" icon="mdi-account"/>
          </v-btn>
          <!--/v-badge-->
        </template>
        <template v-else v-slot:activator="{ props }">
          <v-btn v-if="loggedIn" id="profile-button" class="d-none d-md-flex mr-4 ml-5" rounded v-bind="props"
                 variant="outlined">
            {{ username }}
            <v-icon class="ml-3" icon="mdi-account"/>
          </v-btn>
          <v-btn v-else id="profile-button" @click="goToLogin" class="d-none d-md-flex mr-4 ml-5" rounded v-bind="props"
                 variant="outlined">
            Login
            <v-icon class="ml-3" icon="mdi-account"/>
          </v-btn>
        </template>
        <Dropdown v-if="loggedIn" :messages='messages'/>
      </v-menu>

      <!---------------------------------->

      <!--<template v-if="!getMobile()" v-slot:extension>
        <v-spacer></v-spacer>
        <v-menu class="dropdown_menu" v-for="button in buttons" v-bind:key="button.id" width="10em">
          <template v-slot:activator="{ props }">
            <v-btn class="d-none d-md-flex" text v-bind="props" v-html="button.title"/>
          </template>
          <NavigationDropdown :data="button"/>
        </v-menu>
        <v-spacer/>
        <v-spacer/>
        <v-spacer/>
        <v-spacer/>
        <v-spacer/>
      </template>-->

      <!--hamburger icon nur sichtbar auf mobile -->
      <v-app-bar-nav-icon
          class="d-md-none"
          @click="drawer = !drawer"
      />
    </v-app-bar>
  </v-app>

  <!--Navigation für mobile -->
  <v-navigation-drawer
      v-model="drawer"
      position="right"
      :temporary="true"
      color="white"
      class="d-md-none"
  >
    <v-spacer/>
    <v-list nav>
      <v-list-item prepend-icon="mdi-book-open-page-variant" @click="goToCourses">
        Zu den Kursen
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item v-if="loggedIn" prepend-icon="mdi-message" @click="goToMessages">
        <span> Nachrichten </span>
      </v-list-item>
      <v-list-item v-if="loggedIn" prepend-icon="mdi-account" @click="goToUser">
        <span> Profil </span>
      </v-list-item>
      <v-list-item v-if="loggedIn" prepend-icon="mdi-cog" @click="goToSettings">
        <span> Einstellungen </span>
      </v-list-item>
      <v-list-item prepend-icon="mdi-help" @click="goToHelp">
        <span> Hilfe </span>
      </v-list-item>
      <v-list-item>
        <v-btn block variant="outlined" rounded="0">
          <v-icon icon="mdi-logout"/>
          <span @click='router.push("/");' v-if="loggedIn"> Logout </span>
          <span @click="goToLogin" v-else> Login </span>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import Dropdown from "./DropdownCard.vue";
//import NavigationDropdown from "./NavigationDropdown.vue"
import CourseButton from "./CourseButton.vue"
import {useRoute, useRouter} from 'vue-router';
import {Ref, ref} from 'vue';
import {theme} from "@/helpers/theme";

const course = useRoute().params.course;
const drawer: Ref<boolean> = ref(false);
const messages: Ref<string> = ref("3");

const router = useRouter();

const username = "Marianne Musterfrau"; //must be either the logged in user's name or empty
let loggedIn: Ref<boolean> = ref(!!username); //equals: username ? true : false

function goToHome(): void {
  if (typeof course === "string")
    router.push(`/${course}`);
  else
    router.push(`/c/Brueckenkurs Programmieren`);
}

function goToLogin(): void {
  router.push("/");
}

/*function getMobile(): boolean {
  return window.innerWidth < 960;
}*/

/*function goToSubmission(): void {
  router.push("/mpt/s/1235");
}*/

function goToHelp(): void {
  router.push("/help");
}

function goToCourses(): void {
  router.push("/courses")
}

function goToMessages(): void {
  router.push("/notifications");
}

function goToSettings(): void {
  router.push("/settings");
}

function goToUser() {
  router.push("/u/");
}

</script>

<style scoped>

.drawer-text {
  margin-top: 2em;
  margin-left: 1em;
  margin-right: 1em;
}

.textfieldDrawer {
  margin-top: 4em;
}

#navbar {
  height: 0;
}

hr {
  margin: 10px
}

.v-btn {
  margin-top: 3px;
  margin-bottom: 3px;
  margin-left: 5px;
}

#profile-button {
  min-width: 100px;
}


</style>
<template>
  <SkipToContent />
  <v-app-bar id="header" elevation="3"  height="100px" role="navigation">
    <v-app-bar-title style="max-width: 200px !important; min-width: 200px !important;">
      <a @click="goToHome()">
        <v-img v-if="theme === 'light'" @keyup.enter.prevent.stop="goToHome"
               src="@/assets/ATLAS_Logo.svg" height="70px" alt="ATLAS Logo"/>
        <v-img v-else @keyup.enter.prevent.stop="goToHome" src="@/assets/ATLAS_Logo_Dark.svg"
               height="70px" alt="ATLAS Logo"/>
      </a>
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

  <!--Navigation für mobile -->
  <v-navigation-drawer
      v-model="drawer"
      position="right"
      :temporary="true"
      class="d-md-none"
  >
    <v-spacer/>
    <v-list nav>
      <v-list-item prepend-icon="mdi-book-open-page-variant" @click="goToCourses">
        {{ $t('header.courses') }}
      </v-list-item>
      <v-divider></v-divider>
      <!--v-list-item v-if="loggedIn" prepend-icon="mdi-message" @click="goToMessages">
        <span> {{ $t('header.dropdown.messages') }} </span>
      </v-list-item-->
      <!--v-list-item v-if="loggedIn" prepend-icon="mdi-account" @click="goToUser">
        <span> {{ $t('header.dropdown.profile') }} </span>
      </v-list-item-->
      <v-list-item v-if="loggedIn" prepend-icon="mdi-cog" @click="goToSettings">
        <span> {{ $t('header.dropdown.settings') }} </span>
      </v-list-item>
      <v-list-item prepend-icon="mdi-help" @click="goToHelp">
        <span> {{ $t('header.dropdown.help') }} </span>
      </v-list-item>
      <v-list-item prepend-icon="mdi-account-tie" @click="goToAdmin">
        <span>{{ $t('header.dropdown.admin') }}</span>
      </v-list-item>
      <v-list-item>
        <v-btn block variant="outlined" rounded="0">
          <v-icon icon="mdi-logout"/>
          <span v-if="loggedIn" @click='router.push("/");'> Logout </span>
          <span v-else @click="goToLogin"> Login </span>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import Dropdown from "./DropdownCard.vue";
import CourseButton from "./CourseButton.vue"
import {useRouter} from 'vue-router';
import {Ref, ref} from 'vue';
import {theme} from "@/helpers/theme";
import SkipToContent from "@/components/helpers/SkipToContent.vue";

const drawer: Ref<boolean> = ref(false);
const messages: Ref<string> = ref("3");

const router = useRouter();

const username = "Marianne Mustermann"; //must be either the logged in user's name or empty
let loggedIn: Ref<boolean> = ref(!!username); //equals: username ? true : false

function goToHome(): void {
  router.push(`/`);
}

function goToLogin(): void {
  router.push("/login");
}

function goToAdmin() {
  router.push("/admin/");
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

/*function goToMessages(): void {
  router.push("/notifications");
}*/

function goToSettings(): void {
  router.push("/settings");
}

/*function goToUser() {
  router.push("/u/");
}*/

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

#header {
  z-index: 1 !important;
}

#profile-button {
  min-width: 100px;
}

</style>
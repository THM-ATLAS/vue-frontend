<template>
  <SkipToContent/>
  <v-app-bar id="header" elevation="3" height="100px" role="navigation">
    <v-app-bar-title style="max-width: 200px !important; min-width: 200px !important;">
      <a @click="goToHome()">
        <v-img v-if="theme === 'light'" @keyup.enter.prevent.stop="goToHome"
               src="@/assets/ATLAS_Logo.svg" height="70px" alt="ATLAS Logo"/>
        <v-img v-else @keyup.enter.prevent.stop="goToHome" src="@/assets/ATLAS_Logo_Dark.svg"
               height="70px" alt="ATLAS Logo"/>
      </a>
    </v-app-bar-title>
    <ModuleButton v-if="loggedIn"/>
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
      <template v-if="loggedIn && notificationCount > 0" v-slot:activator="{ props }">
        <v-badge :content="notificationCount" color="primary" offset-x="18" offset-y="10" class="d-none d-md-flex">
        <v-btn v-if="loggedIn" id="profile-button" class="d-none d-md-flex mr-4 ml-5" rounded v-bind="props"
               variant="outlined">
          {{ user.name }}
          <v-icon class="ml-3" icon="mdi-account"/>
        </v-btn>
        <v-btn v-else id="profile-button" @click="goToLogin" class="d-none d-md-flex mr-4 ml-5" rounded
               v-bind="props" variant="outlined">
          {{ $t('login_page.login') }}
          <v-icon class="ml-3" icon="mdi-account"/>
        </v-btn>
        </v-badge>
      </template>
      <template v-else v-slot:activator="{ props }">
        <v-btn v-if="loggedIn" id="profile-button" class="d-none d-md-flex mr-4 ml-5" rounded v-bind="props"
               variant="outlined">
          {{ user.name }}
          <v-icon class="ml-3" icon="mdi-account"/>
        </v-btn>
        <v-btn v-else id="profile-button" @click="goToLogin" class="d-none d-md-flex mr-4 ml-5" rounded v-bind="props"
               variant="outlined">
          {{ $t('login_page.login') }}
          <v-icon class="ml-3" icon="mdi-account"/>
        </v-btn>
      </template>
      <Dropdown v-if="loggedIn" :notificationCount='notificationCount'/>
    </v-menu>

    <div v-else class="mr-4 ml-2 d-none d-md-flex">
      <v-btn @click="goToLogin" rounded="0"
             variant="outlined" v-html="$t('buttons.login')"/>
      <v-btn @click="goToRegister" rounded="0"
             variant="outlined" v-html="$t('buttons.register')"/>
    </div>

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

    <v-badge
        v-if="notificationCount > 0 && !drawer"
        class="d-md-none"
        overlap
        dot
        color="primary"
        offset-x="8"
        offset-y="16">
        <v-app-bar-nav-icon
            class="d-md-none"
            @click="drawer = !drawer"
        />
    </v-badge>
    <v-app-bar-nav-icon
        v-else
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
    <v-list :nav="true">
      <v-list-item prepend-icon="mdi-book-open-page-variant" @click="goToModules">
        {{ $t('header.modules') }}
      </v-list-item>
      <v-divider/>
      <v-list-item
          v-if="loggedIn"
          @click="goToNotifications()"
          prepend-icon="mdi-bell">
        <v-badge v-if="notificationCount > 0" :content="notificationCount" color="primary" offset-x="28" offset-y="-10" >
        </v-badge>
        <span>{{ $t('header.dropdown.messages') }}</span>
      </v-list-item>
      <v-list-item v-if="loggedIn" prepend-icon="mdi-account" @click="goToUser">
        <span> {{ $t('header.dropdown.profile') }} </span>
      </v-list-item>
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
        <v-btn :block="true" variant="outlined" rounded="0">
          <v-icon icon="mdi-logout"/>
          <span v-if="loggedIn" @click='logout'> {{ $t('header.dropdown.logout') }} </span>
          <span v-else @click="goToLogin"> {{ $t('header.dropdown.login') }} </span>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import Dropdown from "./DropdownCard.vue";
import ModuleButton from "./ModuleButton.vue"
import {useRouter} from 'vue-router';
import {onBeforeMount, onBeforeUnmount, onMounted, Ref, ref} from 'vue';
import {theme} from "@/helpers/theme";
import SkipToContent from "@/components/helpers/SkipToContent.vue";
import {User} from "@/helpers/types";
import UserService from "@/services/UserService";
import LoginService, {isLoggedIn} from "@/services/LoginService";
import {AxiosResponse} from "axios";
import NotificationService from "@/services/NotificationService";

const drawer: Ref<boolean> = ref(false);
const notificationCount: Ref<number> = ref(0);
const user: Ref<User | undefined> = ref(undefined);
const loggedIn : Ref<boolean> = ref(false);
const interval = ref(0);

onBeforeMount(async () => {
  await UserService.getMe().then(async (r: AxiosResponse) => {
    if (isLoggedIn(r)) {
      user.value = r.data
      loggedIn.value = true;
      window.localStorage.setItem('loggedIn', 'true')
      await NotificationService.getNotificationsForUser(user.value).then(r =>{
        notificationCount.value = r.data.filter(e => !e.read).length
      })
      interval.value = window.setInterval(async () => {
        await NotificationService.getNotificationsForUser(user.value).then(r =>{
          notificationCount.value = r.data.filter(e => !e.read).length
        })
      }, 30000)
    } else {
      window.localStorage.removeItem('loggedIn')
    }
  })
})

onBeforeUnmount(() => {
  window.clearInterval(interval.value)
})

const router = useRouter();

async function goToHome(): Promise<void> {
  await router.push(`/`);
}

function goToLogin(): void {
  router.push("/login");
}

function goToRegister(): void {
  router.push("/register");
}

async function logout(): Promise<void> {
  await LoginService.logout();
  window.localStorage.removeItem('loggedIn');
  await goToHome();
  window.location.reload();
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

function goToModules(): void {
  router.push("/modules")
}

function goToNotifications(): void {
  router.push("/notifications")
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

#header {
  z-index: 1 !important;
}

#profile-button {
  min-width: 100px;
}

</style>
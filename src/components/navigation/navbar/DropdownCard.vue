<template>
  <v-card elevation="3" rounded="0">
    <v-list>
      <!-- if messages not zero, show little number icon -->
      <v-list-item
          @click="goToNotifications()"
          prepend-icon="mdi-bell">
        <v-badge v-if="notificationCount > 0" :content="notificationCount" color="primary" offset-x="28" offset-y="-10" class="d-none d-md-flex">
        </v-badge>
        <v-list-item-title>{{ $t('header.dropdown.messages') }}</v-list-item-title>
      </v-list-item>
      <!-- // disabled until leaderboard exists // v-list-item
          @click="goToLeaderboard()">
        <v-list-item-title>Leaderboard</v-list-item-title>
      </v-list-item-->
      <!-- settings -->
      <v-list-item prepend-icon="mdi-cog" @click="goToSettings()">
        <v-list-item-title>{{ $t('header.dropdown.settings') }}</v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-account" @click="goToUser">
        <v-list-item-title>{{ $t('header.dropdown.profile') }}</v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-help" @click="goToHelp()">
        <v-list-item-title>{{ $t('header.dropdown.help') }}</v-list-item-title>
      </v-list-item>
      <v-list-item v-if="canSeeAdmin()" prepend-icon="mdi-account-tie" @click="goToAdmin()">
        <v-list-item-title>{{ $t('header.dropdown.admin') }}</v-list-item-title>
      </v-list-item>
      <v-list-item>
        <v-btn prepend-icon="mdi-logout" @click="logout()" variant="outlined" rounded="0">
          <span>{{ $t('header.dropdown.logout') }}</span>
        </v-btn>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import {onBeforeMount, Ref, ref} from 'vue';
import LoginService, {isLoggedIn} from "@/services/LoginService";
import hasPermission, {Action} from "@/helpers/permissions";
import {AxiosResponse} from "axios";
import UserService from "@/services/UserService";
import {User} from "@/helpers/types";
//import {Ref, ref} from 'vue';

const props = defineProps({
  notificationCount: Number,
})

const router = useRouter();
const user: Ref<User | undefined> = ref(undefined);
const loggedIn: Ref<boolean> = ref(false);

function canSeeAdmin(): boolean {
  return hasPermission(Action.ADMIN_AREA, user.value);
}

onBeforeMount(async () => {
  await UserService.getMe().then((r: AxiosResponse) => {
    if (isLoggedIn(r)) {
      user.value = r.data
      loggedIn.value = true;
      window.localStorage.setItem('loggedIn', 'true')
    } else {
      window.localStorage.removeItem('loggedIn')
    }
  })
})

async function logout(): Promise<void> {
  await LoginService.logout();
  window.localStorage.removeItem('loggedIn');
  await goToHome();
  window.location.reload();
}

async function goToHome(): Promise<void> {
  await router.push(`/`);
}

function goToNotifications(): void {
 router.push("/notifications");
}

function goToHelp() {
  router.push("/help");
}

function goToUser() {
  router.push("/u/");
}

function goToSettings() {
  router.push("/settings");
}

function goToAdmin() {
  router.push("/admin/");
}
</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>

</style>
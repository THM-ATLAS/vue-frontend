<template>
  <v-card elevation="3" rounded="0">
    <v-list>
      <!-- if messages not zero, show notifications title -->
      <!-- // disabled until notifications exist // v-list-item
          v-if="messages > 0"
          @click="goToNotifications()">
        <v-icon class="ma-1" icon="mdi-bell"/>
        <v-list-item-subtitle>{{ messages }} ungelesene Nachrichten</v-list-item-subtitle>
      </v-list-item-->
      <!-- else, show standard message button -->
      <!--v-list-item
          v-else
          @click="goToNotifications()">
        <v-list-item-title>Nachrichten</v-list-item-title>
      </v-list-item-->
      <!-- // disabled until leaderboard exists // v-list-item
          @click="goToLeaderboard()">
        <v-list-item-title>Leaderboard</v-list-item-title>
      </v-list-item-->
      <!-- settings -->
      <v-list-item prepend-icon="mdi-cog" @click="goToSettings()">
        <v-list-item-title>{{ $t('header.dropdown.settings') }}</v-list-item-title>
      </v-list-item>
      <!--v-list-item
          @click="goToUser">
        <v-list-item-title>Profil</v-list-item-title>
      </v-list-item-->
      <v-list-item prepend-icon="mdi-help" @click="goToHelp()">
        <v-list-item-title>{{ $t('header.dropdown.help') }}</v-list-item-title>
      </v-list-item>
      <v-list-item prepend-icon="mdi-account-tie" @click="goToAdmin">
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
//import {Ref, ref} from 'vue';

//const messages: Ref<number> = ref(3);

const router = useRouter();

function logout(): void {
  localStorage.removeItem('user');
  router.push("/login");
}

//function goToNotifications(): void {
//  router.push("/notifications");
//}

function goToHelp() {
  router.push("/help");
}
/*
function goToLeaderboard() {
  router.push("/leaderboard");
}

function goToUser() {
  router.push("/u/");
}
*/
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
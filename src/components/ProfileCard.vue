<template>
  <v-card class="profile-card" rounded="0" elevation="0">
    <v-container>
      <v-row class="profile-header" align="center" :no-gutters="true">
        <v-col cols="12" md="3">
          <v-avatar :image="image" size="160"/>
        </v-col>
        <v-col cols="12" md="5">
          <h2>{{ profile.name }}</h2>
          <v-row>
            <div id="username" class="ma-1">{{ profile.username }}</div>
            <div>
              <v-chip v-for="role in profile.roles" v-bind:key="role.role_id"
                      class="mx-1" :label="role.name" :elevation="1" rounded
                      v-html="role.name"/>
            </div>
          </v-row>
        </v-col>
        <v-col cols="12" md="3">
          <!-- HIER SPÄTER BADGES? -->
        </v-col>
        <v-col cols="12" md="1">
          <v-btn class="edit-button" icon="mdi-cog" variant="outlined" @click="goToSettings"/>
        </v-col>
      </v-row>

      <!--v-row class="profile-stats text-center">
        <v-col>
          <v-card variant="outlined">
            <div><b>Gelöste Aufgaben</b></div>
            <div>{{ profile.stats.finished }}</div>
          </v-card>
        </v-col>
        <v-col>
          <v-card variant="outlined">
            <div><b>In ATLAS verbrachte Zeit</b></div>
            <div>{{ profile.stats.time }}</div>
          </v-card>
        </v-col>
        <v-col>
          <v-card variant="outlined">
            <div><b>Beigetreten am</b></div>
            <div>{{ profile.stats.joined }}</div>
          </v-card>
        </v-col>
      </v-row-->

      <!--v-row>
        <v-col cols="12" class="center-text">
          <div class="header-exercises">Deine favorisierten Aufgaben</div>
        </v-col>
        <v-col cols="12" md="4">
          <v-card border="false">
            <v-img src="../assets/product-1.jpg" height="150px" cover/>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-img src="../assets/product-2.jpg" height="150px" cover/>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-img src="../assets/product-4.jpg" height="150px" cover/>
          </v-card>
        </v-col>
      </v-row-->
    </v-container>
  </v-card>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onBeforeMount, ref, Ref} from "vue";
import UserService from "@/services/UserService";
import {User} from "@/helpers/types";

const router = useRouter();
const route = useRoute();
const profile: Ref<User> = ref({}) as Ref<User>;
const getID = ref("0");

onBeforeMount(async () => {
    if (route.params.id) {
      getID.value = route.params.id instanceof Array
          ? route.params.id[0]
          : route.params.id;
      profile.value = (await UserService.getUser(getID.value)).data;
    } else {
      profile.value = (await UserService.getMe()).data;
      getID.value = profile?.value.user_id || "-1";
      await router.replace(`/u/${getID.value}`);
    }
});

console.log(getID.value);

const image = require("../assets/marianneMuster.png");

function goToSettings() {
  router.push("/settings");
}

//Profildaten kommen auf lange Sicht aus der Datenbank und nicht hier aus den Daten, hier nur Platzhalter weil kein Backend
/*const profile_old = {
  username: id,
  fullName: "Marianne Musterfrau",
  image: require("../assets/marianneMuster.png"),
  marked: ["Aufgabe 1", "Aufgabe 2", "Aufgabe 3"],
  level: 5,
  xp: 25,
  stats: {
    finished: 9,
    time: "20:42",
    rating: 3.9,
    joined: "01.01.2022",
  },
};*/
</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped lang="scss">
.profile-card {
  margin-top: 2em;
  margin-bottom: 2em;
}

.profile-header {
  margin-bottom: 2em;
}

h2 {
  font-size: 30px;
}

.profile-stats {
  margin-top: 2em;
  margin-bottom: 2em;
}

.header-exercises {
  font-size: 25px;
}
</style>

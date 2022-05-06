<template>
  <br />
  <v-card class="profile-card" rounded="0" elevation="0">
    <v-container>
      <v-row class="profile-header" align="center" no-gutters>
        <v-col cols="12" md="3">
          <v-avatar :image="profile.image" size="160"></v-avatar
        ></v-col>
        <v-col cols="12" md="5">
          <h2>{{ profile.fullName }}</h2>
          <div class="profile-username">{{ profile.username }}</div></v-col
        >
        <v-col cols="12" md="3">
          <!-- HIER SPÄTER BADGES? -->
        </v-col>
        <v-col cols="12" md="1">
          <v-btn class="edit-button" icon variant="outlined">
            <v-icon icon="mdi-brush" />
          </v-btn>
        </v-col>
      </v-row>

      <v-row class="profile-stats text-center">
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
      </v-row>

      <v-row>
        <v-col cols="12" class="center-text">
          <div class="header-tasks">Deine favorisierten Aufgaben</div></v-col
        >
        <v-col cols="12" md="4">
          <v-card border="false">
            <v-img src="../assets/product-1.jpg" height="150px" cover> </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-img src="../assets/product-2.jpg" height="150px" cover> </v-img>
          </v-card>
        </v-col>
        <v-col cols="12" md="4">
          <v-card>
            <v-img src="../assets/product-4.jpg" height="150px" cover> </v-img>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
  <br />
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import { computed } from "vue";

const router = useRouter();

const getID = computed(() => {
  if (!useRoute().params.id) {
    return undefined;
  }
  return useRoute().params.id instanceof Array
    ? useRoute().params.id[0]
    : useRoute().params.id;
});

const id = getID.value === undefined ? "abcd66" : getID.value; // at 1 would be a call to get own profile id

console.log(id);

if (getID.value === undefined) {
  router.replace(`/u/${id}`);
}

//Profildaten kommen auf lange Sicht aus der Datenbank und nicht hier aus den Daten, hier nur Platzhalter weil kein Backend
const profile = {
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
};
</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
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

.profile-username {
  color: gray;
}

.header-tasks {
  font-size: 25px;
}
</style>

<template>
  <v-card rounded="0" elevation="0">
    <v-container>
      <v-row justify="center">
        <v-col>
          <v-avatar :image="profile.image" size="160"></v-avatar>
        </v-col>
        <v-col>
          <div class="text-h4">
            <v-progress-circular :model-value="profile.xp" color="primary" :width="2" :size="40">
              {{ profile.level }}
            </v-progress-circular>
            {{ profile.fullName }}
            <v-card-subtitle>{{ profile.username }}</v-card-subtitle>
          </div>

          <!--<v-progress-linear :model-value="profile.xp" rounded-bar color="primary"/> -->
          <p>hier werden die badges abgebildet</p>
        </v-col>
      </v-row>
      <v-row justify="space-between">
        <v-col cols="12" md="5">
          <div class="text-h5 justify-center">Statistiken</div>
          <v-table>
            <tbody>
            <tr>
              <td>
                gelöste Aufgaben:
              </td>
              <td>
                {{ profile.stats.finished }}
              </td>
            </tr>
            <tr>
              <td>
                in ATLAS verbrachte Zeit:
              </td>
              <td>
                {{ profile.stats.time }}
              </td>
            </tr>
            <tr>
              <td>
                durchschnittlich vergebene Bewertung:
              </td>
              <td>
                {{ profile.stats.rating }}
              </td>
            </tr>
            </tbody>
          </v-table>
        </v-col>
        <v-col cols="12" md="5">
          <div class="text-h5">gemerkte Aufgaben</div>
          <p>in Zukunft: Vorschau auf Aufgabe (evtl. Bild)</p>
          <v-list density="compact">
            <v-list-item v-for="task in profile.marked" v-bind:key="task">
              {{ task }}
            </v-list-item>
          </v-list>
        </v-col>
      </v-row>
    </v-container>
  </v-card>
</template>

<script>
import {useRoute, useRouter} from "vue-router";
import {computed} from "vue";

export default {
  name: "ProfileCard",
  components: {},
  setup() {
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
      },
    };

    return {
      profile,
    };
  },
};
</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
</style>
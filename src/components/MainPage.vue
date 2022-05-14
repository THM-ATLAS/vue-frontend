<template>
  <v-container role="main">
    <v-row id="course-title" class="justify-center">
      <h2 id="course"> {{ course }} </h2>
    </v-row>
    <v-row class="justify-center mainpage-row">
      <v-col
          v-for="exercise in exercises"
          v-bind:key="exercise.id"
          class="mainpage-col"
          sm="6" md="4" lg="4"
      >
        <MainpageCardModal
            :exercise="exercise"
            :course="course"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang='ts'>
import MainpageCardModal from '@/components/MainpageCardModal.vue'
import {useRoute} from "vue-router";
import {useI18n} from "vue-i18n";

const exercise = useI18n().t('main_page.exercise');

const route = useRoute();
const course = route.params.course;
const exercises = [
  {
    title: exercise+' 1: Zielscheibe',
    image: require("../assets/product-1.jpg"),
    content: 'Kreis 1, **Kreis2**, Kreis3, Kreis4, Kreis5, Kreis6, Kreis7, Kreise kreisekreisekreiskreikrrrr...',
    rating: 2.9,
    id: 1,
    like: false,
  },
  {
    title: exercise+' 2: Konfetti',
    image: require("../assets/product-2.jpg"),
    content: 'Blatt Papier in den Locher jagen und ab gehts. Blatt Papier in den Locher jagen und ab gehts. Blatt Papier in den Locher jagen und ab gehts. Blatt Papier in den Locher jagen und ab gehts. ',
    rating: 4.1,
    id: 2,
    like: true,
  },
  {
    title: exercise+' 3: Minesweeper',
    image: require("../assets/product-4.jpg"),
    content: 'Minesweeper, kennste oder? Minesweeper, kennste oder? Minesweeper, kennste oder? Minesweeper, kennste oder? Minesweeper, kennste oder?',
    description: 'Ich bin eine Beschreibung!',
    rating: 3.7,
    id: 3,
    like: false,
  },
  {
    title: exercise+' 4: Game of Life',
    image: require("../assets/product-5.jpg"),
    content: 'Frag Conway. Frag Conway. Frag Conway. Frag Conway. Frag Conway. Frag Conway. Frag Conway. ',
    rating: 4.8,
    id: 4,
    like: true,
  },
  {
    title: exercise+' 5: Lorem ipsum',
    image: require("../assets/product-6.jpg"),
    content: '#Lorem ipsum dolor sit amet!\n Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    rating: 1.1,
    id: 5,
    like: false,
  },
  {
    title: exercise+' 6: Eine sehr lange Aufgabe mit tollem Titel',
    image: require("../assets/product-2.jpg"),
    content: 'Minesweeper, kennste oder?',
    rating: 3.7,
    id: 6,
    like: false,
  },
  {
    title: exercise+' 7: Minesweeper',
    image: require("../assets/product-2.jpg"),
    content: 'Minesweeper, kennste oder?',
    rating: 3.7,
    id: 7,
    like: false,
  },
  {
    title: exercise+' 8: Minesweeper',
    image: require("../assets/product-2.jpg"),
    content: '# Header only, dont render',
    rating: 2.0,
    id: 9,
    like: false,
  },
  {
    title: exercise+' 9: Minesweeper',
    image: require("../assets/product-2.jpg"),
    content: 'Minesweeper, kennste oder?',
    rating: 3.7,
    id: 10,
    like: false,
  },
  {
    title: exercise+' 10: Minesweeper',
    image: require("../assets/product-2.jpg"),
    content: 'Minesweeper, kennste oder?',
    rating: 3.7,
    id: 11,
    like: false,
  },
  {
    title: exercise+' 11: Minesweeper',
    image: require("../assets/product-2.jpg"),
    content: 'Minesweeper, kennste oder?',
    rating: 3.7,
    id: 12,
    like: false,
  },
  {
    title: exercise+' 12: Minesweeper',
    image: require("../assets/product-2.jpg"),
    content: 'Minesweeper, kennste oder?',
    rating: 3.7,
    id: 13,
    like: false,
  }
]

</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
.mainpage-col {
  padding: 2%;
  position: relative;
}

.mainpage-row {
  padding-left: 4%;
  padding-right: 4%;
}

#course-title {
  margin-top: 100px;
  margin-bottom: 20px;
}

#course {
  border-bottom: 2px solid black;
}
</style>


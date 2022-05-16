<template>
  <v-card elevation="0" rounded="0">
    <v-card-header>
      <v-btn
          v-bind="props"
          @click="this.$router.back()"
          icon="mdi-menu-left"
          class="ma-2"
          variant="outlined"/>
      <v-icon class="ma-1" icon="mdi-bell"/>
      <v-card-header-text class="text-left fontszTi">
        Feedback zur Aufgabe ...
      </v-card-header-text>
    </v-card-header>

    <v-container>
      <v-list three-line>
        <template v-for="(feedback) in feedbacks" v-bind:key="feedback.id">
          <v-list-item>
            <v-list-item-header>
              {{ feedback.title }}
              <br/>
              <v-list-item-subtitle>{{ formatDate(feedback.date) }} von <a @click="this.$router.push(`/user/${feedback.author}/`)">{{ feedback.author }}</a></v-list-item-subtitle>
            </v-list-item-header>
            <v-container v-html="feedback.text"/>
            <div>
              <v-list-item-title>
                <v-icon class="ma-1">mdi-star</v-icon>
                {{ feedback.rating }}
              </v-list-item-title>
            </div>
            <div>
            </div>
          </v-list-item>
        </template>
      </v-list>
    </v-container>
  </v-card>
</template>

<script lang="ts">
import moment from "moment";
import {defineComponent} from "vue";

export default defineComponent( {
  name: "FeedbackList",
  methods: {
    formatDate(date: string): string {
      return moment(date).format('DD.MM.YYYY');
    },
  },
  data() {
    return {
      feedbacks: [
        {
          id: 1,
          title: "Awesome!",
          date: "2019-01-01",
          rating: "5",
          text: "I really like this product. I would recommend it to everyone.",
          author: "oeba29",
        },
        {
          id: 2,
          title: "Great!",
          date: "2019-01-01",
          rating: "4",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
          author: "nbea02",
        },
        {
          id: 3,
          title: "Good!",
          date: "2022-07-01",
          rating: "3",
          text: "I really like this product. I would recommend it to everyone.",
          author: "pema01",
        },
        {
          id: 4,
          title: "Okay!",
          date: "2019-01-01",
          rating: "2",
          text: "I really like this product. I would recommend it to everyone.",
          author: "qmra40",
        },
        {
          id: 5,
          title: "Bad!",
          date: "2019-01-01",
          rating: "1",
          text: "I really like this product. I would recommend it to everyone.",
          author: "qmra40",
        }
      ]
    };
  }
})
</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>

</style>
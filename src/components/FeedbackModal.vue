<template>
  <v-card elevation="0" rounded="0" role="form">
    <v-card-title> Feedback zur Aufgabe</v-card-title>
    <v-alert
        v-if="error"
        density="compact"
        color="testColor"
        type="error"
        border="start"
        class="ma-2"
        v-text="error"
    />
    <form>
      <v-container class="justify-center align-content-center">
        <v-textarea rounded="0" v-model="feedback" @input="error = null"/>
        <v-row>
          <v-col>
            <!--vue-star-rating
                :increment="0.5"
                @update:rating="setRating"
                :show-rating="false"
                :star-size="25"
            /-->
          </v-col>
        </v-row>
      </v-container>
      <v-card-actions>
        <v-btn
            rounded="0"
            elevation="0"
            color="primary"
            @click="submitFeedback() ? $emit('close') : null">
          Absenden
        </v-btn>
        <v-btn rounded="0" elevation="0" @click="$emit('close')">
          Abbrechen
        </v-btn>
      </v-card-actions>
    </form>
  </v-card>
</template>

<script>

export default {
  name: "FeedbackModal",
  methods: {
    setRating(chosen) {
      this.rating = chosen;
      this.error = null;
    },
    close() {
      this.$emit("close");
    },
    submitFeedback() {
      if (!this.rating) {
        this.error = "Bitte eine Bewertung eingeben";
        return false;
      }
      if (!this.feedback) {
        this.error = "Bitte Feedback eingeben";
        return false;
      }
      console.log(this.feedback, this.rating);
      this.error = null;
      return true;
    },
  },
  data: () => ({
    id: 0,
    feedback: null,
    rating: null,
    error: null,
    testColor: "#6fcaa8",
  }),
};
</script>

<!-- Bitte möglichst keine Styles hier verwenden. Das Meiste lässt sich mit Vuetify lösen-->
<style scoped>
</style>

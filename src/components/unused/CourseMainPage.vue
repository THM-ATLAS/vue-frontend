<template>
  <v-card class="mainCard">
    <div class="pt-0 pl-0 backButton">
      <v-tooltip bottom>
        <template v-slot:activator="{ props: tooltip3 }">
          <v-btn
              v-bind="tooltip3"
              @click="goBack"
              icon="mdi-menu-left"
              class="ma-2"
              variant="outlined"/>
        </template>
        <span v-html="$t('buttons.back')"/>
      </v-tooltip>
      <v-btn @click="goManage" title="Test" />
    </div>
    <v-card color="highlight" rounded="0">
      <div class="mx-2 my-2">
        <h1>
          <v-card-title class="text-left text-h4 moduleTitle" tabindex="0">{{
            props.module.name
          }}</v-card-title>
        </h1>
      </div>
    </v-card>
    <v-row align="center" justify="center" class="exerciseTextRow">
      <h2 class="exerciseText">{{ $t("module_page.exercises") }}</h2>
    </v-row>
    <v-container class="exerciseListBox">
      <v-row
        v-for="exercise in props.exercises"
        v-bind:key="exercise.id"
        class="exerciseListEntry"
        @keyup.enter.prevent.stop="goToExercise(exercise)"
        @click.prevent.stop="goToExercise(exercise)"
        tabindex="0"
      >
        <div>
          <h3 class="exerciseTitle">{{ exercise.title }}</h3>
          <p>{{ exercise.description }}</p>
        </div>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import { defineProps, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const props = defineProps({
  module: Object,
  exercises: Object,
});

watch(() => {
  document.title = props.module.name;
});
function goBack() {
  router.back();
}

function goManage() {
  router.push("/" + props.module?.name + "/e/modman");
}

function goToExercise(exercise) {
  router.push("/" + props.module?.name + "/e/" + exercise.exercise_id);
}
</script>

<style scoped lang="scss">
.exerciseListEntry {
  padding: 1rem;
  margin-bottom: 25px;
  background-color: rgb(var(--v-theme-highlight));
  border: 1px solid transparent;
  &:hover {
    border: 1px solid black;
    cursor: pointer;
    filter: brightness(110%);
  }
  &:focus {
    border: 1px solid black;
    cursor: pointer;
    filter: brightness(110%);
  }
  div.exerciseTitle {
    text-decoration-line: underline;
    font-size: 1.2rem;
  }
  div p {
  }
}

.moduleTitle {
  padding-left: 0;
}

.mainCard {
  margin-top: 10%;
}

.backButton {
  margin-bottom: 3%;
}

.exerciseTextRow {
  margin-top: 30px;
  .exerciseText {
    font-size: 2rem;
  }
}

.exerciseListBox {
  width: 70%;
  justify-self: center;
  margin-top: 16px;
}
</style>

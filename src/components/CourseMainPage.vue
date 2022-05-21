<template>
  <v-card style="margin-top: 10%;">
    <v-card color="highlight">
      <div class="mx-2 my-2">
        <div class="pt-0 pl-0">
          <v-btn
              @click="goBack"
              icon="mdi-menu-left"
              class="ma-2"
              variant="outlined"/>
        </div>
        <div>
          <v-card-title class="text-left text-h4" style="padding-left: 0;"> {{ props.module.name }}</v-card-title>
        </div>
      </div>
    </v-card>

    <v-container>
      <v-row justify="center">
        <div style="display: inline-block"
             v-for="exercise in props.exercises"
             v-bind:key="exercise.id"

        >
          <MainpageCardModal class="exercisePanel"
                             :exercise="exercise"
                             :module="props.module"
          />
        </div>
      </v-row>
    </v-container>
  </v-card>
</template>

<script setup>
import MainpageCardModal from "@/components/MainpageCardModal";
import {defineProps, watch} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();
const props = defineProps({
  module: Object,
  exercises: Object,
});

watch(() => {
  document.title = props.module.name;
})
function goBack() {
  router.back()
}

</script>

<style scoped>

.exercisePanel {
  width: 28rem;
  height: 30rem;
  padding: 1rem;
}
</style>
<template>
  <div>
    <v-card
        id="card"
        tabindex="0"
        class="card-mainpage mx-auto"
        rounded="0"
        v-bind:style="{backgroundColor: exercise.color }"
        elevation="0"
        max-width="450"
        color="green"
        @keyup.enter.prevent.stop="goToExercise"
        @click.prevent.stop="goToExercise"
    >
      <v-card-header>
        <v-card-header-text>
          <v-card-title class="justify-center" v-html="exercise.title"/>
        </v-card-header-text>
      </v-card-header>
      <v-img
          :src="exercise.image"
          lazy-src="../assets/600x400.png"
          max-height="250px">
        <template v-slot:placeholder>
          <v-row
              class="fill-height ma-10"
              align="center"
              justify="center">
            <v-progress-circular
                indeterminate="true"
                color="grey lighten-5"
            />
          </v-row>
        </template>
      </v-img>
      <v-card-text>
        <div class="text-truncate" v-html="getBody()"/>
      </v-card-text>

      <v-card-actions>
        <v-btn outlined rounded="0" disabled>
          <!--vue-star-rating active-color="#444444" :increment="0.01" :read-only="true" :rating="exercise.rating"
           !--                :star-size="20"/-->
          <v-icon>star</v-icon>
          {{ exercise.rating }}
        </v-btn>
        <v-spacer/>
        <v-btn v-if="!likex" icon="mdi-heart" variant="outlined" @click.prevent.stop="likex = !likex"/>
        <v-btn v-else icon="mdi-heart" class="btn-like" @click.prevent.stop="likex = !likex"/>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script lang='ts'>
import {defineComponent} from "@vue/runtime-core"
//import VueStarRating from "vue-star-rating";
import {useRouter} from "vue-router";
import {ref, Ref} from "vue";

export default defineComponent({
  props: {
    course: String,
    exercise: Object,
    noRedirect: Boolean,
  },
  setup(props) {
    const router = useRouter();

    let likex: Ref<boolean> = ref(props.exercise?.like);

    function goToExercise(): void {
      if (props.noRedirect !== true) router.push("/" + props.course + "/e/" + props.exercise?.id);
    }

    function liked(): void {
      likex = ref(!likex.value);
      console.log('like: ' + likex.value);
    }

    function getFirstSanitisedNonHeadingLine(text: string): string {
      const lines = text.split("\n");
      for (let i = 0; i < lines.length; i++) {
        if (lines[i].trim().length > 0 && lines[i].trim()[0] !== "#") {
          return sanitise(lines[i]);
        }
      }
      return "";
    }

    function sanitise(text: string): string {
      return text
          ?.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>") // bold
          .replace(/\*(.*?)\*/g, "<i>$1</i>") // italic
          .replace(/_(.*?)_/g, "<i>$1</i>") // italic underscore
          .replace(/\[(.*?)]\((.*?)\)/g, "$1"); // links
    }

    function getBody() {
      if (!props || !props.exercise) {
        return "";
      } else if (props.exercise.description && props.exercise.description.length > 0) {
        return props.exercise.description;
      } else {
        return sanitise(props.exercise.content);
      }
    }

    return {
      liked, likex, getFirstSanitisedNonHeadingLine, goToExercise, sanitise, getBody
    }
  }
})
</script>

<style scoped lang="scss">
.btn-like {
  color: #cf6679;
}

.v-card {
  padding: 7% !important;
}

.v-card {
  margin-top: 0;
  margin-bottom: 0;
  position: relative;
  left: 0;
}

.v-btn {
  margin: 0;
}
</style>

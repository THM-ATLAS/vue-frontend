<template>
  <a @click="router.push(`/${id}`)">
    <v-container fill-height>
      <v-row align="center"
             justify="start">
        <!--v-col>
          <v-img :src=module.moduleThumbnail max-height="150" width="200" class="moduleImage"></v-img>
        </v-col-->
        <v-col>
          <v-container class="moduleInfo">
            <v-col>
              <v-row class="moduleName">{{ moduleName }}</v-row>
              <v-row class="moduleDescription"><!--{{ module.moduleDescription }} --> Hier müsste eine Beschreibung für das Modul <pre> {{moduleName}} </pre>stehen.</v-row>
            </v-col>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </a>
</template>

<script setup lang="ts">
import {defineProps} from "vue";
import {useRouter} from "vue-router";

const router = useRouter();

// @ts-ignore
const props = defineProps({
    id: {
      required: true,
      type: Number,
    },
    moduleName: {
      required: true,
      type: String
    }
    // moduleDescription: String,
    // moduleThumbnail: Image,
  })
console.log("Props in ModuleSearchResult: " + props.id)
</script>

<style scoped>
.moduleName {
  font-size: 2rem;
  text-decoration: underline;
  padding-left: 1rem;
}

.moduleDescription {
  padding: 1rem;
}

.moduleImage {
  margin-left: auto;
  margin-right: auto;
}

.moduleInfo {
  margin-left: auto;
  margin-right: auto;
}
</style>
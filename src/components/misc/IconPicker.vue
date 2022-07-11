<template>
<v-card>
  <v-autocomplete v-model="icon">
    
  </v-autocomplete>
  <p>{{icon}}</p>
</v-card>
</template>

<script setup lang="ts">
import {ref} from "vue";
const iconNames =
    ["android","apple","apple-ios",
      "angular", "angularjs", "ansible", "application", "application-braces", "application-array",
      "antenna", "artstation", "atom", "bacteria", "beaker", "blender-software",
      "book", "bootstrap", "briefcase", "calculator", "calendar",
      "camera", "cellphone", "chart-line", "cloud", "compass"]
const icon = ref();
</script>

<style scoped lang="scss">

</style>
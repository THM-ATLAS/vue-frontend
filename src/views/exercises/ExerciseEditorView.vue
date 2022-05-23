<template>
  <Navbar/>
  <v-main>
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <ExerciseEditor id="content"/>
      </v-col>
    </v-row>
  </v-main>
  <Footer/>
</template>

<style scoped>
.v-card {
  margin-top: 15px !important;
  margin-bottom: 30px !important;
}

.v-row {
  padding-block: 10em;
}
</style>

<script lang='ts' setup>
import Navbar from "@/components/navigation/navbar/NavbarBase.vue";
import ExerciseEditor from "@/components/exercises/ExerciseEditor.vue";
import Footer from "@/components/navigation/FooterCard.vue";
import {useI18n} from "vue-i18n";

useI18n().t('titles.exerciseeditor_view')
</script>
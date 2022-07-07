<template>
  <Navbar/>
  <v-main>
    <v-row justify="center" align-content="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <Submission id="content"/>
      </v-col>
    </v-row>
  </v-main>
  <Footer/>
</template>

<style scoped>

.v-row {
  padding-block: 10em;
  padding-left: 4%;
  padding-right: 4%;
}
</style>

<script lang='ts' setup>
import Navbar from "@/components/navigation/navbar/NavbarBase.vue";
import Submission from "@/components/exercises/submissions/SubmissionCard.vue";
import Footer from "@/components/navigation/FooterCard.vue"
import {useI18n} from "vue-i18n";

document.title = useI18n().t('titles.submission_view');
</script>

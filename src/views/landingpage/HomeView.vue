<template>
  <NavbarBase/>
  <v-main>
    <v-row justify="center" align-content="center">
      <v-col>
        <HomeContent id="content"/>
      </v-col>
    </v-row>
  </v-main>
  <Footer/>
</template>


<script setup lang="ts">
import HomeContent from "@/components/landingpage/HomeContent.vue";
import Footer from "@/components/navigation/FooterCard.vue";
import NavbarBase from "@/components/navigation/navbar/NavbarBase.vue";
import {useI18n} from "vue-i18n";

document.title = useI18n().t('titles.home_view');
</script>

<style scoped>
.v-row {
  padding: 10em 0 5em 0;
}
</style>
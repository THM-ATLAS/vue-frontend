<template>
  <Navbar/>
  <v-main>
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <PrivatePageNotice/>
      </v-col>
    </v-row>
  </v-main>
  <Footer/>
</template>

<style scoped>
</style>

<script lang='ts' setup>
import Navbar from "@/components/navigation/navbar/NavbarBase.vue";
import Footer from "@/components/navigation/FooterCard.vue";
import {useI18n} from "vue-i18n";
import PrivatePageNotice from "@/components/navigation/PrivatePageNotice.vue";

document.title = useI18n().t('titles.pagenotfound_view')
</script>
<template>
  <Navbar/>
  <v-main>
    <v-row justify="center">
      <v-col sm="10" md="10" lg="10" xl="10">
        <PageNotFound id="content"/>
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
import PageNotFound from "@/components/navigation/PageNotFound.vue";
import Footer from "@/components/navigation/FooterCard.vue";
import {useI18n} from "vue-i18n";

document.title = useI18n().t('titles.pagenotfound_view')
</script>
<template>
  <Navbar/>
  <v-main>
    <v-row justify="center">
      <v-col sm="10" md="10" lg="8" xl="6">
        <ModuleManager id="content"/>
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
import ModuleManager from "@/components/ModuleManager.vue";
import Footer from "@/components/navigation/FooterCard.vue";
import {useI18n} from "vue-i18n";
import {watch} from "vue";

const i18n = useI18n()

watch(i18n.locale, () => {
  document.title = i18n.t('titles.modulemanager_view');
})
document.title = i18n.t('titles.modulemanager_view');
</script>
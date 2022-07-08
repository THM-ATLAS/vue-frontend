<template>
  <v-main>
    <v-row class="text-center align-self-center justify-center pa-2">
      <v-col sm="9" md="9" lg="6" xl="6">
        <RegisterModal/>
      </v-col>
    </v-row>
  </v-main>
  <Footer/>
</template>

<script lang='ts' setup>
import RegisterModal from "@/components/misc/RegisterModal.vue";
import Footer from "@/components/navigation/FooterCard.vue";
import {useI18n} from "vue-i18n";
document.title = useI18n().t('titles.login_view');
</script>
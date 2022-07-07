<template>
  <v-main>
    <v-row class="text-center align-self-center justify-center pa-2">
      <v-col sm="6" md="6" lg="4" xl="3">
        <LoginModal/>
      </v-col>
    </v-row>
  </v-main>
  <Footer/>
</template>

<script lang='ts' setup>
import LoginModal from "@/components/misc/LoginModal.vue";
import Footer from "@/components/navigation/FooterCard.vue";
import {useI18n} from "vue-i18n";
document.title = useI18n().t('titles.login_view');
</script>